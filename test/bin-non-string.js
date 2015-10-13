var tap = require('tap')
var readJson = require('../')
var path = require('path')
var p = path.resolve(__dirname, 'fixtures/badbinnonstring.json')

tap.test('non-string bin entries', function (t) {
  readJson(p, function (er, data) {
    t.end()
  })
})
