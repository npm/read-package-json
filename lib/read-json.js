const fs = require('fs')

const path = require('path')

const { glob } = require('glob')
const normalizeData = require('normalize-package-data')
const safeJSON = require('json-parse-even-better-errors')
const util = require('util')
const normalizePackageBin = require('npm-normalize-package-bin')

module.exports = readJson

// put more stuff on here to customize.
readJson.extraSet = [
  bundleDependencies,
  gypfile,
  serverjs,
  scriptpath,
  authors,
  readme,
  mans,
  bins,
  githead,
  fillTypes,
]

const typoWarned = {}
const cache = {}

function readJson (file, log_, strict_, cb_) {
  let log
  let strict
  for (let i = 1; i < arguments.length - 1; i++) {
    if (typeof arguments[i] === 'boolean') {
      strict = arguments[i]
    } else if (typeof arguments[i] === 'function') {
      log = arguments[i]
    }
  }

  if (!log) {
    log = function () {}
  }
  const cb = arguments[arguments.length - 1]

  fs.readFile(file, 'utf8', function (er, content) {
    if (er && er.code === 'ENOENT') {
      if (path.basename(file) === 'index.js') {
        return cb(er)
      }
      const index = path.resolve(path.dirname(file), 'index.js')
      return fs.readFile(index, 'utf8', function (er2, indexData) {
        if (er2) {
          return cb(er)
        }

        if (cache[indexData]) {
          return cb(null, cache[indexData])
        }

        const data = parseIndex(indexData)
        if (!data) {
          return cb(er)
        }

        extrasCached(file, indexData, data, log, strict, cb)
      })
    }
    if (er) {
      return cb(er)
    }

    if (cache[content]) {
      return cb(null, jsonClone(cache[content]))
    }

    let data

    try {
      if (content.charCodeAt(0) === 0xFEFF) {
        // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
        // because the buffer-to-string conversion in `fs.readFileSync()`
        // translates it to FEFF, the UTF-16 BOM.
        content = content.slice(1)
      }
      data = safeJSON(content)
      for (const key in data) {
        if (/^_/.test(key)) {
          delete data[key]
        }
      }
    } catch (jsonErr) {
      data = parseIndex(content)
      if (!data) {
        const e = new Error('Failed to parse json\n' + jsonErr.message)
        e.code = 'EJSONPARSE'
        e.path = file
        return cb(e)
      }
    }
    extrasCached(file, content, data, log, strict, cb)
  })
}

function jsonClone (obj) {
  if (obj == null) {
    return obj
  } else if (Array.isArray(obj)) {
    const newarr = new Array(obj.length)
    for (const ii in obj) {
      newarr[ii] = jsonClone(obj[ii])
    }
    return newarr
  } else if (typeof obj === 'object') {
    const newobj = {}
    for (const kk in obj) {
      newobj[kk] = jsonClone(obj[kk])
    }
    return newobj
  } else {
    return obj
  }
}

function extrasCached (file, d, data, log, strict, cb) {
  extras(file, data, log, strict, function (err, extrasData) {
    if (!err) {
      cache[d] = jsonClone(extrasData)
    }
    cb(err, extrasData)
  })
}

readJson.extras = extras
function extras (file, data, log_, strict_, cb_) {
  let log
  let strict
  for (let i = 2; i < arguments.length - 1; i++) {
    if (typeof arguments[i] === 'boolean') {
      strict = arguments[i]
    } else if (typeof arguments[i] === 'function') {
      log = arguments[i]
    }
  }

  if (!log) {
    log = function () {}
  }
  const cb = arguments[arguments.length - 1]

  const set = readJson.extraSet
  let n = set.length
  let errState = null
  set.forEach(function (fn) {
    fn(file, data, then)
  })

  function then (er) {
    if (errState) {
      return
    }
    if (er) {
      return cb(errState = er)
    }
    if (--n > 0) {
      return
    }
    const pId = `${cleanString(data.name)}@${cleanString(data.version)}`

    function warn (msg) {
      if (typoWarned[pId]) {
        return
      }
      if (log) {
        log('package.json', pId, msg)
      }
    }

    try {
      normalizeData(data, warn, strict)
    } catch (error) {
      return cb(error)
    }

    checkBinReferences_(file, data, warn, function () {
      typoWarned[pId] = true
      cb(null, data)
    })
  }
}

function scriptpath (file, data, cb) {
  if (!data.scripts) {
    return cb(null, data)
  }
  const k = Object.keys(data.scripts)
  for (const key of k) {
    const s = data.scripts[key]
    // This is never allowed, and only causes problems
    if (typeof s !== 'string') {
      delete data.scripts[key]
      continue
    }

    const spre = /^(\.[/\\])?node_modules[/\\].bin[\\/]/
    if (s.match(spre)) {
      data.scripts[key] = data.scripts[key].replace(spre, '')
    }
  }
  cb(null, data)
}

function gypfile (file, data, cb) {
  const dir = path.dirname(file)
  const s = data.scripts || {}
  if (s.install || s.preinstall) {
    return cb(null, data)
  }

  if (data.gypfile === false) {
    return cb(null, data)
  }

  glob('*.gyp', { cwd: dir })
    .then(files => {
      if (!files.length) {
        return cb(null, data)
      }
      s.install = 'node-gyp rebuild'
      data.scripts = s
      data.gypfile = true
      return cb(null, data)
    })
    .catch(er => cb(er))
}

function serverjs (file, data, cb) {
  const dir = path.dirname(file)
  const s = data.scripts || {}
  if (s.start) {
    return cb(null, data)
  }
  fs.access(path.join(dir, 'server.js'), (err) => {
    if (!err) {
      s.start = 'node server.js'
      data.scripts = s
    }
    return cb(null, data)
  })
}

function authors (file, data, cb) {
  if (data.contributors) {
    return cb(null, data)
  }
  const af = path.resolve(path.dirname(file), 'AUTHORS')
  fs.readFile(af, 'utf8', function (er, ad) {
    // ignore error.  just checking it.
    if (er) {
      return cb(null, data)
    }
    ad = ad.split(/\r?\n/g).map(function (line) {
      return line.replace(/^\s*#.*$/, '').trim()
    }).filter(function (line) {
      return line
    })
    data.contributors = ad
    return cb(null, data)
  })
}

function readme (file, data, cb) {
  if (data.readme) {
    return cb(null, data)
  }
  const dir = path.dirname(file)
  const globOpts = { cwd: dir, nocase: true, mark: true }
  glob('{README,README.*}', globOpts)
    .then(files => {
      // don't accept directories.
      files = files.filter(function (filtered) {
        return !filtered.match(/\/$/)
      })
      if (!files.length) {
        return cb()
      }
      let fallback = 0
      const re = /\.m?a?r?k?d?o?w?n?$/i
      let rm
      for (let i = 0; i < files.length; i++) {
        if (files[i].match(re)) {
          rm = path.resolve(dir, files[i])
        } else if (files[i].match(/README$/)) {
          fallback = i
        }
      }
      // prefer README.md, followed by README; otherwise, return
      // the first filename (which could be README)
      rm = rm || path.resolve(dir, files[fallback])
      const rmfn = path.basename(rm)
      return fs.readFile(rm, 'utf8', function (er, rmData) {
        // maybe not readable, or something.
        if (er) {
          return cb()
        }
        data.readme = rmData
        data.readmeFilename = rmfn
        return cb(er, data)
      })
    })
    .catch(er => cb(er))
}

function mans (file, data, cb) {
  let cwd = data.directories && data.directories.man
  if (data.man || !cwd) {
    return cb(null, data)
  }
  const dirname = path.dirname(file)
  cwd = path.resolve(path.dirname(file), cwd)
  glob('**/*.[0-9]', { cwd })
    .then(mansGlob => {
      data.man = mansGlob.map(man =>
        path.relative(dirname, path.join(cwd, man)).split(path.sep).join('/')
      )
      return cb(null, data)
    })
    .catch(er => cb(er))
}

function bins (file, data, cb) {
  data = normalizePackageBin(data)

  const bin = data.directories && data.directories.bin
  if (data.bin || !bin) {
    return cb(null, data)
  }

  const m = path.resolve(path.dirname(file), path.join('.', path.join('/', bin)))
  glob('**', { cwd: m })
    .then(binsGlob => {
      data.bin = binsGlob.reduce(function (acc, mf) {
        if (mf && mf.charAt(0) !== '.') {
          const f = path.basename(mf)
          acc[f] = path.join(bin || '.', mf)
        }
        return acc
      }, {})
      return cb(null, normalizePackageBin(data))
    })
    .catch(er => cb(er))
}

function bundleDependencies (file, data, cb) {
  const bd = 'bundleDependencies'
  const bdd = 'bundledDependencies'
  // normalize key name
  if (data[bdd] !== undefined) {
    if (data[bd] === undefined) {
      data[bd] = data[bdd]
    }
    delete data[bdd]
  }
  if (data[bd] === false) {
    delete data[bd]
  } else if (data[bd] === true) {
    data[bd] = Object.keys(data.dependencies || {})
  } else if (data[bd] !== undefined && !Array.isArray(data[bd])) {
    delete data[bd]
  }
  return cb(null, data)
}

function githead (file, data, cb) {
  if (data.gitHead) {
    return cb(null, data)
  }
  const dir = path.dirname(file)
  const headFile = path.resolve(dir, '.git/HEAD')
  fs.readFile(headFile, 'utf8', function (headFileErr, headData) {
    if (headFileErr) {
      const parent = path.dirname(dir)
      if (parent === dir) {
        return cb(null, data)
      }
      return githead(dir, data, cb)
    }
    if (!headData.match(/^ref: /)) {
      data.gitHead = headData.trim()
      return cb(null, data)
    }
    const headRef = headData.replace(/^ref: /, '').trim()
    const headRefFile = path.resolve(dir, '.git', headRef)
    fs.readFile(headRefFile, 'utf8', function (headRefFileErr, headRefData) {
      if (headRefFileErr || !headRefData) {
        const packFile = path.resolve(dir, '.git/packed-refs')
        return fs.readFile(packFile, 'utf8', function (readFileErr, refs) {
          if (readFileErr || !refs) {
            return cb(null, data)
          }
          refs = refs.split('\n')
          for (let i = 0; i < refs.length; i++) {
            const match = refs[i].match(/^([0-9a-f]{40}) (.+)$/)
            if (match && match[2].trim() === headRef) {
              data.gitHead = match[1]
              break
            }
          }
          return cb(null, data)
        })
      }
      headRefData = headRefData.replace(/^ref: /, '').trim()
      data.gitHead = headRefData
      return cb(null, data)
    })
  })
}

/**
 * Warn if the bin references don't point to anything.  This might be better in
 * normalize-package-data if it had access to the file path.
 */
function checkBinReferences_ (file, data, warn, cb) {
  if (!(data.bin instanceof Object)) {
    return cb()
  }

  const keys = Object.keys(data.bin)
  let keysLeft = keys.length
  if (!keysLeft) {
    return cb()
  }

  function handleExists (relName, result) {
    keysLeft--
    if (!result) {
      warn('No bin file found at ' + relName)
    }
    if (!keysLeft) {
      cb()
    }
  }

  keys.forEach(function (key) {
    const dirName = path.dirname(file)
    const relName = data.bin[key]
    /* istanbul ignore if - impossible, bins have been normalized */
    if (typeof relName !== 'string') {
      const msg = 'Bin filename for ' + key +
        ' is not a string: ' + util.inspect(relName)
      warn(msg)
      delete data.bin[key]
      handleExists(relName, true)
      return
    }
    const binPath = path.resolve(dirName, relName)
    fs.stat(binPath, (err) => handleExists(relName, !err))
  })
}

function fillTypes (file, data, cb) {
  const index = data.main || 'index.js'

  if (typeof index !== 'string') {
    return cb(new TypeError('The "main" attribute must be of type string.'))
  }

  // TODO exports is much more complicated than this in verbose format
  // We need to support for instance

  // "exports": {
  //   ".": [
  //     {
  //       "default": "./lib/npm.js"
  //     },
  //     "./lib/npm.js"
  //   ],
  //   "./package.json": "./package.json"
  // },
  // as well as conditional exports

  // if (data.exports && typeof data.exports === 'string') {
  //   index = data.exports
  // }

  // if (data.exports && data.exports['.']) {
  //   index = data.exports['.']
  //   if (typeof index !== 'string') {
  //   }
  // }

  const extless =
    path.join(path.dirname(index), path.basename(index, path.extname(index)))
  const dts = `./${extless}.d.ts`
  const dtsPath = path.join(path.dirname(file), dts)
  const hasDTSFields = 'types' in data || 'typings' in data
  if (!hasDTSFields && fs.existsSync(dtsPath)) {
    data.types = dts.split(path.sep).join('/')
  }

  cb(null, data)
}

function cleanString (str) {
  return (!str || typeof (str) !== 'string') ? '' : str.trim()
}

// /**package { "name": "foo", "version": "1.2.3", ... } **/
function parseIndex (data) {
  data = data.split(/^\/\*\*package(?:\s|$)/m)

  if (data.length < 2) {
    return null
  }
  data = data[1]
  data = data.split(/\*\*\/$/m)

  if (data.length < 2) {
    return null
  }
  data = data[0]
  data = data.replace(/^\s*\*/mg, '')

  try {
    return safeJSON(data)
  } catch (er) {
    return null
  }
}
