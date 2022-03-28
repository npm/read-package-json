var tap = require('tap')
var readJson = require('../')
var path = require('path')

tap.test('BOM test', function (t) {
  var p = path.resolve(__dirname, 'fixtures/bom.json')
  readJson(p, function (er, data) {
    if (er) {
      throw er
    }
    p = path.resolve(__dirname, 'fixtures/nobom.json')
    readJson(p, function (jsonErr, data2) {
      if (jsonErr) {
        throw jsonErr
      }
      t.same(data, data2)
      t.end()
    })
  })
})
