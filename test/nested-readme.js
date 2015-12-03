var path = require('path')

var tap = require('tap')
var p = path.resolve(__dirname, 'fixtures/nested-readme/package.json')

var readJson = require('../')

var expect = {
  'name': 'nested-readme',
  'version': '99.999.999999999',
  'readme': '*markdown*\n',
  'readmeFilename': 'foo/README.md',
  'description': '*markdown*',
  '_id': 'nested-readme@99.999.999999999'
}

tap.test('readme test', function (t) {
  readJson(p, function (er, data) {
    t.ifError(er, 'read README without error')
    test(t, data)
  })
})

function test (t, data) {
  t.deepEqual(data, expect)
  t.end()
}
