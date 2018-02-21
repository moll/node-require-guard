var Module = require("module")

describe("Guard", function() {
  function requireGuard() { return require("..") }
  resetModuleCache(require)

  function itMustLeaveParentConfigurable(name) {
    it("must leave the parent (this) module configurable", function() {
      requireGuard()(name)
      var prop = Object.getOwnPropertyDescriptor(require.cache, module.id)
      prop.configurable.must.be.true()
    })
  }

  function mustSetNonConfigurable(name) {
    var path = require.resolve(name)
    var prop = Object.getOwnPropertyDescriptor(require.cache, path)
    prop.configurable.must.be.false()
  }

  it("must, with irony, remove itself from cache after loading", function() {
    requireGuard()
    require.cache.must.not.have.property(require.resolve(".."))
  })

  describe("given nothing", function() {
    it("must set the parent (this) module non-configurable", function() {
      requireGuard()()
      var prop = Object.getOwnPropertyDescriptor(require.cache, module.id)
      prop.configurable.must.be.false()
    })
  })

  describe("given a module name", function() {
    var name = "mocha"
    itMustLeaveParentConfigurable(name)

    it("must set the given module non-configurable", function() {
      requireGuard()(name)
      mustSetNonConfigurable(name)
    })

    it("must throw when passing a non-existent module", function() {
			var err
			try { requireGuard()("mescalaro") } catch (ex) { err = ex }
			err.must.be.an.error()
    })
  })

  describe("given a relative module path", function() {
    var name = "../node_modules/mocha/lib/utils.js"
    itMustLeaveParentConfigurable(name)

    it("must set the given module non-configurable", function() {
      requireGuard()(name)
      mustSetNonConfigurable(name)
    })

    it("must throw when passing a non-existent path", function() {
			var err
			try { requireGuard()("./breakaway") } catch (ex) { err = ex }
			err.must.be.an.error()
    })
  })

  describe("given an array of module names", function() {
    var names = ["mocha", "../node_modules/mocha/lib/utils.js"]
    itMustLeaveParentConfigurable(names)

    it("must set the given modules non-configurable", function() {
      requireGuard()(names)
      names.forEach(mustSetNonConfigurable)
    })
  })

  describe("after guarding", function() {
    it("must set the modules undeletable", function() {
      requireGuard()("mocha")
      var path = require.resolve("mocha")
      delete require.cache[path]
      require.cache[path].must.exist()
    })

    it("must leave the modules enumerable", function() {
      requireGuard()("mocha")
      var path = require.resolve("mocha")
      var prop = Object.getOwnPropertyDescriptor(require.cache, path)
      prop.enumerable.must.be.true()
    })

    it("must leave the modules writable", function() {
      requireGuard()("mocha")
      var path = require.resolve("mocha")
      var prop = Object.getOwnPropertyDescriptor(require.cache, path)
      prop.writable.must.be.true()
    })

    it("must leave the modules with a working setter", function() {
      requireGuard()("mocha")
      var path = require.resolve("mocha")
      require.cache[path] = "Breakaway: Chemical Attraction"
      require.cache[path].must.equal("Breakaway: Chemical Attraction")
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
