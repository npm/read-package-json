const t = require('tap')
const read = require('../')
const { resolve } = require('path')
t.test('read from an index.js file', t => {
  const fixture = resolve(__dirname, 'fixtures/indexjs/package.json')
  read(fixture, (er, data) => {
    if (er) {
      throw er
    }
    t.match(data, {
      name: 'indexjs-test',
      version: '1.2.3',
      description: 'Did you know npm could do this, even?',
      main: 'index.js',
      readme: 'ERROR: No README data found!',
      _id: 'indexjs-test@1.2.3'
    })
    t.end()
  })
})

t.test('read broken json', t => {
  const fixture = resolve(__dirname, 'fixtures/indexjs-bad/package.json')
  read(fixture, (er, data) => {
    t.match(er, {
      code: 'ENOENT',
      path: fixture
    })
    t.notOk(data)
    t.end()
  })
})
