// 浅拷贝： 
// 1. 只能拷贝一层对象，如果对象有嵌套那么浅拷贝无能为力 
// 2. 若拷贝属性是引用类型，拷贝就是内存地址，修改内容会相互影响
const clone = target => {
  if(typeof target === 'object' && target !== null){
    const cloneTarget = Array.isArray(target) ? [] : {}
    for (let prop in target) {
      cloneTarget[prop] = target[prop]
    }
    return cloneTarget
  }

  return target
}
