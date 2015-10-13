var tap = require('tap')
var readJson = require('../')
var path = require('path')
var p = path.resolve(__dirname, 'fixtures/badbinnonstring.json')

tap.test('non-string bin entries', function (t) {
  var logmsgs = []
  readJson(p, function (msg) { logmsgs.push([].slice.call(arguments)) }, function (er, data) {
    t.comment(logmsgs.map(function (msg) { return 'Warning: ' + msg.join(' ') }).join('\n'))
    t.like(er, null, 'no error from readJson')
    t.end()
  })
})
