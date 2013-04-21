var Module = require("module")
var Should = require("chai").should()

describe("Guard", function() {
  function requireGuard() { return require("..") }
  resetModuleCache(require)

  function itShouldLeaveParentConfigurable(name) {
    it("should leave the parent (this) module configurable", function() {
      requireGuard()(name)
      var prop = Object.getOwnPropertyDescriptor(require.cache, module.id)
      prop.configurable.should.be.true
    })
  }

  function shouldSetNonConfigurable(name) {
    var path = require.resolve(name)
    var prop = Object.getOwnPropertyDescriptor(require.cache, path)
    prop.configurable.should.be.false
  }

  //
  it("should, with irony, remove itself from cache after loading", function() {
    requireGuard()
    require.cache.should.not.have.key(require.resolve(".."))
  })

  //
  describe("given nothing", function() {
    it("should set the parent (this) module non-configurable", function() {
      requireGuard()()
      var prop = Object.getOwnPropertyDescriptor(require.cache, module.id)
      prop.configurable.should.be.false
    })
  })

  //
  describe("given a module name", function() {
    var name = "chai"
    itShouldLeaveParentConfigurable(name)

    it("should set the given module non-configurable", function() {
      requireGuard()(name)
      shouldSetNonConfigurable(name)
    })

    it("should throw when passing a non-existent module", function() {
      Should.throw(function() { require("..")("mescalaro") })
    })
  })

  //
  describe("given a relative module path", function() {
    var name = "../node_modules/chai/lib/chai.js"
    itShouldLeaveParentConfigurable(name)

    it("should set the given module non-configurable", function() {
      requireGuard()(name)
      shouldSetNonConfigurable(name)
    })

    it("should throw when passing a non-existent path", function() {
      Should.throw(function() { require("..")("./breakaway") })
    })
  })

  //
  describe("given an array of module names", function() {
    var names = ["chai", "../node_modules/mocha/lib/utils.js"]
    itShouldLeaveParentConfigurable(names)

    it("should set the given modules non-configurable", function() {
      requireGuard()(names)
      names.forEach(shouldSetNonConfigurable)
    })
  })

  //
  describe("after guarding", function() {
    it("should set the modules undeletable", function() {
      requireGuard()("chai")
      var path = require.resolve("chai")
      delete require.cache[path]
      Should.exist(require.cache[path])
    })

    it("should leave the modules enumerable", function() {
      requireGuard()("chai")
      var path = require.resolve("chai")
      var prop = Object.getOwnPropertyDescriptor(require.cache, path)
      prop.enumerable.should.be.true
    })

    it("should leave the modules writable", function() {
      requireGuard()("chai")
      var path = require.resolve("chai")
      var prop = Object.getOwnPropertyDescriptor(require.cache, path)
      prop.writable.should.be.true
    })

    it("should leave the modules with a working setter", function() {
      requireGuard()("chai")
      var path = require.resolve("chai")
      require.cache[path] = "Breakaway: Chemical Attraction"
      require.cache[path].should.equal("Breakaway: Chemical Attraction")
    })
  })
})

function resetModuleCache(require) {
  beforeEach(function() {
    this.cache = require.cache
    Module._cache = require.cache = {}
    for (var path in this.cache) require.cache[path] = this.cache[path]
  })

  afterEach(function() {
    Module._cache = require.cache = this.cache
  })
}
