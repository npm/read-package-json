var path = require('path')

var tap = require('tap')

var readJson = require('../')
var file = path.resolve(__dirname, 'fixtures/deepnested.json')

tap.test('cache test', function (t) {
  var count = 0
  var spy = function (file_, data_, then) {
    count++
    then()
  }

  readJson.extraSet.push(spy)
  t.teardown(function () {
    readJson.extraSet.pop()
  })

  readJson(file, function (er, data) {
    if (er) {
      throw er
    }
    var expectedProp = [
      {
        prop: {
          prop: [
            {
              prop: 'prop',
            },
          ],
        },
      },
    ]
    t.ok(data)
    t.equal(data.name, 'deep-nested')
    t.equal(data.version, '1.2.3')
    t.equal(data._id, data.name + '@' + data.version)
    t.same(data.prop, expectedProp)

    data.prop = null

    readJson(file, function (er2, data2) {
      if (er2) {
        throw er2
      }
      t.same(data2.prop, expectedProp)
      t.not(data2.prop, data.prop)
      t.equal(count, 1)
      t.end()
    })
  })
})
