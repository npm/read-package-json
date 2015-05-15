var tap = require('tap')
var readJson = require('../')
var path = require('path')

tap.test('Comments test', function (t) {
  var p = path.resolve(__dirname, 'fixtures/withcomments.json')
  readJson(p, function (er, data) {
    if (er) throw er
    p = path.resolve(__dirname, 'fixtures/strippedcomments.json')
    readJson(p, function (er, data2) {
      if (er) throw er
      t.deepEqual(data, data2)
      t.end()
    })
  })
})
