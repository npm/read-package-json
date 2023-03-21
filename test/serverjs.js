const t = require('tap')
const read = require('../')
const { resolve } = require('path')
t.test('server.js file present', t => {
  const fixture = resolve(__dirname, 'fixtures/serverjs/package.json')
  read(fixture, (er, data) => {
    if (er) {
      throw er
    }
    t.match(data, {
      scripts: {
        start: 'node server.js',
      },
    })
    t.end()
  })
})
