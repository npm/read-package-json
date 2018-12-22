var childProcess = require('child_process')
var fs = require('fs')
var path = require('path')

var tap = require('tap')

var readJson = require('../')

var isGit
try {
  fs.readFileSync(path.resolve(__dirname, '../.git/HEAD'))
  isGit = true
} catch (e) {
  isGit = false
}

if (isGit) {
  tap.test('gitHead tests', function (t) {
    t.plan(4)

    const repoProjectName = 'read-package-json'
    const repo = 'https://github.com/npm/' + repoProjectName + '.git'
    var repoDirs = []

    t.test('detached case', function (tt) {
      var p = path.resolve(__dirname, '..', 'package.json')
      readJson(p, function (er, data) {
        if (er) throw er
        tt.ok(data)
        tt.similar(data.gitHead, /^[a-f0-9]{40}$/)
        tt.end()
      })
    })

    function testGitRepo (kind, file, extraRepoCommand, t) {
      var repoDirName = repoProjectName + '-' + kind
      var cmd = `cd ${__dirname} && git clone ${repo} ${repoDirName} && cd ${repoDirName}`
      if (extraRepoCommand) cmd += ` && ${extraRepoCommand}`
      childProcess.execSync(cmd)
      repoDirs.push(repoDirName)
      var p = path.resolve(__dirname, repoDirName, file)
      readJson(p, function (er, data) {
        if (er) throw er
        t.ok(data)
        t.similar(data.gitHead, /^[a-f0-9]{40}$/)
        t.end()
      })
    }

    t.test('basic case', function (tt) {
      testGitRepo('basic', 'package.json', '', tt)
    })

    t.test('subdirectory', function (tt) {
      testGitRepo('subdir', 'test/fixtures/bin.json', '', tt)
    })

    t.test('git-pack-refs vs gitHead', function (tt) {
      testGitRepo('git-pack-refs', 'package.json', 'git pack-refs --all', tt)
    })

    t.tearDown(function () {
      repoDirs.forEach(function (d) {
        childProcess.execSync(`rm -rf ${path.resolve(__dirname, d)}`)
      })
    })
  })
}
