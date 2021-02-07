// 单例模式：它保证一个类仅有一个实例，并提供一个访问它的全局访问点。

// 比如数据库：我们在访问网站，请求数据时，不管建立多少连接对数据读写，
// 都是指向同一个数据库（这里不考虑数据库的集群、备份、缓存镜像等...）。

// 1. 饿汉式单例
const ShopCar = (function () {
  function init() {
    return {
      buy(good) {
        this.goods.push(good)
      },
      goods: []
    }
  }
  const instance = init()
  return {
    getInstance() {
      return instance
    }
  }
})()

const car1 = ShopCar.getInstance()
const car2 = ShopCar.getInstance()

car1.buy('苹果')
car1.buy('橘子')

console.log(car1.goods)
console.log(car2.goods)

console.log(car1 === car2)

// 2.懒汉式单例模式 , 正常情况下建议使用懒汉式单例

const ShopGoods = (function () {
  let instance

  function init() {
    return {
      buy(good) {
        this.goods.push(good)
      },
      goods: []
    }
  }
  return {
    getInstance() {
      if (!instance) instance = init()
      return instance
    }
  }
})()