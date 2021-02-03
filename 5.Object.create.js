// 方法创建一个新对象，使用现有的对象来提供新创建的对象的proto。

export const HCreate = obj => {
  function Fn() {}
  Fn.prototype = obj
  return new Fn()
}