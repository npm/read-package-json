const t = require('tap')
const readJson = require('../')
const path = require('path')
const file = path.resolve(__dirname, 'fixtures/invalid-version/package.json')
const logs = []
const warn = (...msg) => logs.push(msg)
readJson(file, warn, false, (er, data) => {
  t.match(er, {
    message: 'Invalid version: "a live bobcat"'
  })
  t.notOk(data)
  t.end()
})
