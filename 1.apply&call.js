Function.prototype.HCallAndApply = function() {
  if(typeof this !== 'function') {
    throw new Error('caller must be a function')
  }
  const self = arguments[0] || window
  self._fn = this
  const args = Array.from(arguments).flat().slice(1)
  const res = self._fn(...args)
  delete self._fn
  return res
}