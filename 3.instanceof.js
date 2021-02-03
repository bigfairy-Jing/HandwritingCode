// instanceof 判断左边的原型是否存在于右边的原型链中

export const hInstanceof = (left, right)=>{
  if(typeof left !== 'object' || left === null) return false
  let proto = Object.getPrototypeOf(left) // 获取对象原型
  while (true) {
    if(proto === null) return false
    if(proto === right.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}