const t = require('tap')
const read = require('../')
const { resolve } = require('path')

t.test('bundle-true', t => {
  const fixture = resolve(__dirname, 'fixtures/bundle-true.json')
  read(fixture, (er, data) => {
    if (er) {
      throw er
    }
    t.match(data, {
      name: 'bundletrue',
      version: '1.2.3',
      dependencies: { a: '', b: '' },
      optionalDependencies: { b: '' },
      devDependencies: { c: '' },
      bundleDependencies: ['a'],
      readme: 'ERROR: No README data found!',
      _id: 'bundletrue@1.2.3'
    })
    t.end()
  })
})

t.test('bundle-null', t => {
  const fixture = resolve(__dirname, 'fixtures/bundle-null.json')
  read(fixture, (er, data) => {
    if (er) {
      throw er
    }
    t.notOk(data.bundleDependencies, 'no bundleDependencies')
    t.notOk(data.bundledDependencies, 'no bundledDependencies')
    t.end()
  })
})

t.test('bundle-array', t => {
  const fixture = resolve(__dirname, 'fixtures/bundle-array.json')
  read(fixture, (er, data) => {
    t.match(data, {
      name: 'bundlearray',
      version: '1.2.3',
      dependencies: { a: '', b: '', c: '*' },
      optionalDependencies: { b: '' },
      devDependencies: { c: '' },
      bundleDependencies: ['a', 'b', 'c'],
      readme: 'ERROR: No README data found!',
      _id: 'bundlearray@1.2.3'
    })
    t.end()
  })
})

t.test('bundle-false', t => {
  const fixture = resolve(__dirname, 'fixtures/bundle-false.json')
  read(fixture, (er, data) => {
    t.match(data, {
      name: 'bundlefalse',
      version: '1.2.3',
      dependencies: { a: '', b: '' },
      optionalDependencies: { b: '' },
      devDependencies: { c: '' },
      readme: 'ERROR: No README data found!',
      _id: 'bundlefalse@1.2.3'
    })
    t.end()
  })
})
