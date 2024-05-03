var tap = require('tap')
var readJson = require('../')
var path = require('path')
var p = path.resolve(__dirname, 'fixtures/erroneous.json')

tap.test('erroneous package data', function (t) {
  readJson(p, function (er) {
    t.ok(er instanceof Error)
    t.equal(er.code, 'EJSONPARSE')
    t.end()
  })
})

tap.test('ENOTDIR for non-directory packages', function (t) {
  readJson(path.resolve(__filename, 'package.json'), function (er) {
    t.ok(er)
    t.equal(er.code, 'ENOTDIR')
    t.end()
  })
})
