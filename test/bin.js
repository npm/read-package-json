var path = require('path')

var tap = require('tap')

var readJson = require('../')

var createWarningCollector = function () {
  var warn = function (msg) {
    warn.warnings.push(arguments)
  }
  warn.warnings = []
  return warn
}

tap.test('Bin test', function (t) {
  var p = path.resolve(__dirname, 'fixtures/bin.json')
  var warn = createWarningCollector()
  readJson(p, warn, function (er, data) {
    t.equal(warn.warnings.length, 0)
    t.strictSame(data.bin, { 'bin-test': 'bin/echo' })
    t.end()
  })
})

tap.test('Bad bin test', function (t) {
  var p = path.resolve(__dirname, 'fixtures/badbin.json')
  var warn = createWarningCollector()
  readJson(p, warn, function (er, data) {
    t.equal(warn.warnings.length, 1)
    t.equal(warn.warnings[0][2], 'No bin file found at bin/typo')
    t.end()
  })
})

tap.test('Empty bin test', function (t) {
  var p = path.resolve(__dirname, 'fixtures/emptybin.json')
  var warn = createWarningCollector()
  readJson(p, warn, function (er, data) {
    t.equal(warn.warnings.length, 0)
    t.equal(data.bin, undefined, 'no mapping to bin because object was empty')
    t.end()
  })
})
