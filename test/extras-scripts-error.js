// vim: set softtabstop=16 shiftwidth=16:
var tap = require("tap")
var readJson = require("../")
var path = require("path")
var fs = require("fs")

console.error("extras-scripts-error test")
tap.test("extras-scripts-error test", function (t) {
                var p = path.resolve(__dirname, "fixtures/extras-scripts-error.json")
                readJson(p, function (er, data) {
                                if (er) throw er;
                                t.deepEqual(data.scripts, {})
                                t.end()
                })
})
