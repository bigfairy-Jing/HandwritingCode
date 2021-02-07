// 代理模式： 为某个对象提供一种代理以控制对这个对象的访问

// 举个例子：双十一，小美有亿件快递到了，有些包裹太重了自己拿不动。
// 于是，她拜托工具人舔狗小明帮忙，小明欣然前往快递点取件。
// 这里，小明帮小美取快递就起到了代理的作用。
// 注意：整个动作还是小美发起的，小明可以理解为一个透明的中间人，直接看代码。

const expressPoint = {
  pickUp() {
    console.log('取快递成功...')
  }
}

const Ming = {
  getMsg(target) {
    target.pickUp()
  }
}

const Mei = {
  getExpress(target){
    Ming.getMsg(target) 
  }
}

Mei.getExpress(expressPoint) 