var tap = require('tap')
var readJson = require('../')
var path = require('path')
var p = path.resolve(__dirname, 'fixtures/badbinnonstring.json')

tap.test('non-string bin entries', function (t) {
  var logmsgs = []
  const warn = (...msg) => logmsgs.push(msg)
  readJson(p, warn, function (er, data) {
    t.comment(logmsgs.map(msg => 'Warning: ' + msg.join(' ')).join('\n'))
    t.equal(er, null, 'no error from readJson')
    t.equal(data.bin, undefined)
    t.end()
  })
})
