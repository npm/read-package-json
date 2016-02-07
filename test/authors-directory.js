var path = require('path')

var tap = require('tap')
var p = path.resolve(__dirname, 'fixtures/authors-directory/package.json')

var readJson = require('../')

var expect = {
  'name': 'authors-directory',
  'version': '1.0.0',
  'contributors': [
    {
      'name': 'Bill Author',
      'email': 'bill@author.com'
    },
    {
      'name': 'Jane Author',
      'email': 'jane@author.com'
    }
  ],
  'description': 'Some README',
  'readme': 'Some README\n',
  'readmeFilename': 'README',
  '_id': 'authors-directory@1.0.0'
}

tap.test('AUTHORS directory test', function (t) {
  readJson(p, function (er, data) {
    t.ifError(er, 'read AUTHORS without error')
    test(t, data)
  })
})

function test (t, data) {
  t.deepEqual(data, expect)
  t.end()
}
