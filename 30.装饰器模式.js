// 装饰器模式 定义：在不改变对象自身的基础上，
// 在程序运行期间给对象动态地添加方法。
// 简而言之就是对对象进行包装，返回一个新的对象描述（descriptor）。
// 这个概念其实和 React 中的高阶组件、ES6 装饰器、TypeScript 
// 装饰器-依赖注入 @Injectable 等类似。

const log = (target, name, descriptor) => {
  let oldValue = descriptor.value
  descriptor.value = function() {
    console.log(`Calling ${name} with`, arguments)
    return oldValue.apply(this, arguments)
  }
  return descriptor
}

class Math {
  @log // Decorator
  add(a, b) {
    return a + b
  }
}

const math = new Math()
console.log(3)
math.add(1,2) 




// target 被装饰器的类的原型
// name 被装饰的类，属性， 方法 的名字
// descriptor 被装饰的类， 属性， 方法的descriptor

function Decorator(target, name, descriptor) {
  const v = descriptor.initializer && descriptor.initializer.call(this)

  return {
    enumerable: true,
    configurable: true,
    get() {
      return v
    },
    set(c) {
      v = c
    }
  }
}







