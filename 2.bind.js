Function.prototype.HBind = function(params) {
  if(typeof this !== 'function'){
    throw new Error('caller must be a function')
  }
  const self = this
  const context = arguments[0]
  const args = Array.prototype.slice.call(arguments, 1)
  let fn = function() {
    const fnArgs = Array.prototype.slice.call(arguments)
    self.apply(this instanceof self ? this: context, args.concat(fnArgs))
  }
  fn.prototype = Object.create(self.prototype)
  return fn
}