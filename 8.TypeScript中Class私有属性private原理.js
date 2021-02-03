// 私有属性满足
// 1. 能被class内部不同方法访问,但不能在类外部被访问
// 2. 子类不能继承父类的私有属性

const _Class = (function() {
  const _x = new WeakMap()
  class InnerClass {
    constructor(x){
      _x.set(this, x)
    }
    getX() {
      return _x.get(this)
    }
  }
  return InnerClass
})()

const myClass = new _Class(10)
console.log(myClass.getX())
console.log(myClass.x)