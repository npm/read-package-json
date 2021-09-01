var path = require('path')

var tap = require('tap')

var readJson = require('../')

tap.test('Mans test', function (t) {
  var p = path.resolve(__dirname, 'fixtures/man.json')
  readJson(p, function (er, data) {
    t.same(data.man, ['man/man1/test.1'], 'man directory is translated but not resolved')
    t.end()
  })
})
