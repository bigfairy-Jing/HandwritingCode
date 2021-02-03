// 1. 乞丐版 ： 无法解决循环引用 2. 无法拷贝特殊的对象，比如 函数，RegExp,Date,Set，Map

const deepCopy = O => JSON.parse(JSON.stringify(O))

// 2. 几乎覆盖所有版本

function cloneDeep(obj, map = new WeakMap()) {
  if (!obj instanceof Object) return obj; // 基本数据
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags)

  if (map.get(obj)) return map.get(obj) // 解决循环引用

  if (obj instanceof Function) { //解决函数
    return function () {
      return obj.call(this, ...arguments)
    }
  }

  const res = new obj.constructor() // 数组 普通对象 Set Map处理
  obj instanceof Object && map.set(obj, res)
  if (obj instanceof Map) {
    obj.forEach((item, index) => {
      res.set(cloneDeep(index, map), cloneDeep(item, map))
    })
  }
  if (obj instanceof Set) {
    obj.forEach(item => {
      res.add(cloneDeep(item, map))
    })
  }
  Object.keys(obj).forEach(key => {
    if (obj[key] instanceof Object) {
      res[key] = cloneDeep(obj[key], map)
    } else {
      res[key] = obj[key]
    }
  })
  return res
}


// 测试
const map = new Map()
map.set({
  a: 1
}, '1')
const source = {
  name: '12',
  meta: {
    age: 12,
    birth: new Date("2008-10-10"),
    ary: [1, 2, {
      a: 1
    }],
    say() {
      console.log("啊吧啊吧");
    },
    map
  }
}
source.source = source

const newO = cloneDeep(source)
console.log(newO)