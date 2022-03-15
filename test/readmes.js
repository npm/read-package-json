var path = require('path')

var tap = require('tap')
var p = path.resolve(__dirname, 'fixtures/readmes/package.json')

var readJson = require('../')

var expect = {
  name: 'readmes',
  version: '99.999.999999999',
  readme: '*markdown*\n',
  readmeFilename: 'README.md',
  description: '*markdown*',
  _id: 'readmes@99.999.999999999',
}

if (process.platform === 'win32') {
  expect.readme = '*markdown*\r\n'
}

tap.test('readme test', function (t) {
  readJson(p, function (er, data) {
    t.error(er, 'read README without error')
    test(t, data)
  })
})

function test (t, data) {
  delete data.gitHead
  t.same(data, expect)
  t.end()
}
