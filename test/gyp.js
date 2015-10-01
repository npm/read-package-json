var path = require('path')

var tap = require('tap')
var binding = path.resolve(__dirname, 'fixtures/binding-gyp/binding.json')
var bogus = path.resolve(__dirname, 'fixtures/bogus-gyp/bogus.json')

var readJson = require('../')

var bindingExpect = {
  name: '',
  version: '',
  readme: 'ERROR: No README data found!',
  _id: '@',
  scripts: {
    install: 'node-gyp rebuild'
  },
  gypfile: true
}

var bogusExpect = {
  name: '',
  version: '',
  readme: 'ERROR: No README data found!',
  _id: '@'
}

tap.test('binding.gyp test', function (t) {
  readJson(binding, function (er, data) {
    t.ifError(er)
    t.deepEqual(data, bindingExpect)
    t.end()
  })
})

tap.test('bogus.gyp test', function (t) {
  readJson(bogus, function (er, data) {
    t.ifError(er)
    t.deepEqual(data, bogusExpect)
    t.end()
  })
})
