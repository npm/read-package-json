var tap = require('tap')
var readJson = require('../')
var path = require('path')
var p = path.resolve(__dirname, 'fixtures/badmainnonstring.json')

tap.test('non-string main entries', function (t) {
  var logmsgs = []
  const warn = (...msg) => logmsgs.push(msg)
  readJson(p, warn, function (er) {
    t.comment(logmsgs.map(msg => 'Warning: ' + msg.join(' ')).join('\n'))
    t.match(er, new TypeError('The "main" attribute must be of type string.'))
    t.end()
  })
})
