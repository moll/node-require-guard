var Module = require("module")

module.exports = function(name) {
  guard(!name ? [module.parent.id] : Array.isArray(name) ? name : [name])
}

function guard(paths) {
  var props = {}

  for (var i = 0, l = paths.length; i < l; ++i) {
    var path = Module._resolveFilename(paths[i], module.parent)
    props[path] = Object.getOwnPropertyDescriptor(require.cache, path)
    props[path].configurable = false
  }

  Object.defineProperties(require.cache, props)
}

// And ironically, remove ourselves to be reloaded when required again.
delete require.cache[module.id]
