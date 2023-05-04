const fs = require('fs')
const path = require('path')
const tap = require('tap')

const readJson = require('..')

tap.test('basic test', function (t) {
  const readme = fs.readFileSync(path.resolve(__dirname, './fixtures/basic/README.md'), 'utf8')
  const p = path.resolve(__dirname, './fixtures/basic/package.json')
  const pkg = require(p)
  readJson(p, function (er, data) {
    if (er) {
      throw er
    }
    t.ok(data)
    t.equal(data.version, pkg.version)
    t.equal(data._id, data.name + '@' + data.version)
    t.equal(data.name, pkg.name)
    t.type(data.author, 'object')
    t.equal(data.readme, readme)
    t.same(data.scripts, pkg.scripts)
    t.equal(data.main, pkg.main)
    t.equal(data.readmeFilename, 'README.md')

    // optional deps are folded in.
    t.same(data.optionalDependencies, pkg.optionalDependencies)
    t.has(data.dependencies, pkg.dependencies)

    t.same(data.devDependencies, pkg.devDependencies)
    t.end()
  })
})
