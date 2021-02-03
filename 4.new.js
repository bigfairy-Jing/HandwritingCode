// new 实际做了三件事情
// 1. 让实例的对象可以访问私有属性
// 2. 让实例对象可以访问构造函数原型(constructor.prototype)所在的原型链的属性
// 3. 考虑构造函数有返回值的情况

export const HNew = (ctor, ...args) => {

  if (typeof ctor !== 'function') {
    throw new Error(`${ctor} is not a constructor`)
  }

  const obj = Object.create(ctor.prototype)

  const res = ctor.apply(obj, args)

  const isObj = typeof res === 'object' && res !== null

  const isFunction = typeof res === 'function'

  return isObj || isFunction ? res : obj
}