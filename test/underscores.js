const t = require('tap')
const rpj = require('../')
const { resolve } = require('path')
const fixture = resolve(__dirname, 'fixtures/underscores.json')
t.test('strip underscores', t => {
  rpj(fixture, (er, data) => {
    if (er) { throw er }
    t.strictSame(data, {
      _id: 'underscore@1.2.3',
      name: 'underscore',
      version: '1.2.3',
      readme: 'ERROR: No README data found!'
    })
    t.end()
  })
})
