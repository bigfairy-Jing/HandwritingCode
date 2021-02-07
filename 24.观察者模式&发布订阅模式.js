// 发布订阅模式和观察者模式区别
// 观察者模式中，观察者知道被观察者的，被观察者一直保持对被观察者进行记录。 松散耦合的
// 发布订阅模式中，发布者不知道对方的存在，它们只是通过消息代理进行通信，同时是异步的，比如消息队列。在发布订阅模式中，是属于解耦合的

// 观察者模式例子：家报社（Subject）一发布报纸，就会立马派送给所有订报（Obsever）的人，订报的人就能获取报纸内容。 这里订报纸的人知道报社，报社也知道订报纸的人

class Subject {
  constructor() {
    this.observers = [] // 观察者队列
  }

  add(observer) {
    this.observers.push(observer)
    this.observers = [...new Set(this.observers)]
  }

  notify(...args) { // 亲自通知观察者
    this.observers.forEach(observer => observer.update(...args))
  }

  remove(observer) {
    const {
      observers
    } = this
    for (let i = 0; i < observers.length; i++) {
      if (observers[i] === observer) observers.splice(i, 1)
    }
  }
}

class Observer {
  update(...args) {
    console.log(...args)
  }
}

const observer1 = new Observer() // 创建观察者1
const observer2 = new Observer() // 创建观察者2

const sub = new Subject() // 创建目标对象

sub.add(observer1)
sub.add(observer2)

sub.notify('you Changed ！')

// 发布订阅模式

const wrapCb = (fn, once = false) => ({
  cb: fn,
  once
})

class EventEmitter {
  constructor() {
    this.events = new Map()
  }

  on(type, fn, once = false) { //监听订阅
    const handler = this.events.get(type)
    if (!handler) this.events.set(type, wrapCb(fn, once))
    else if (handler && typeof handler.cb === 'function') {
      this.events.set(type, [handler, wrapCb(fn, once)])
    } else {
      handler.push(wrapCb(fn, once))
    }
  }

  off(type, fn) { // 删除某个事件的回调
    const handler = this.events.get(type)
    if(!handler) return

    if(!Array.isArray(handler) && fn && handler.cb === fn.cb) {
      this.events.delete(type)
      return
    }

    for (let i = 0; i < handler.length; i++) {
      const item = handler[i]
      if(fn && item.cb === fn.cb){
        handler.splice(i, 1)
        i--
        // 如果所有的都删了那么变成非数组
        if(handler.length === 1) this.events.set(type, handler[0])
      }
    }
  }

  once(type, fn){
    this.on(type, fn, true)
  }

  emit(type, ...args){
    const handler = this.events.get(type)
    if(!handler)return
    if(Array.isArray(handler)){
      handler.forEach(item=>{
        item.cb.apply(this, args)
        if(item.once) this.off(type, item)
      })
    }else {
      handler.cb.apply(this, args)
      if(handler.once)this.allOff(type)
    }
  }

  allOff(type) {
    const handler = this.events.get(type)
    if(!handler) return
    this.events.delete(type)
  }


}

const e = new EventEmitter()

e.on('eventA', ()=> {
  console.log('eventA on')
})

e.on('eventA', ()=> {
  console.log('eventA once again')
})

e.once('type', ()=>{
  console.log('just one')
})

e.emit('type')
e.emit('type')
e.emit('eventA')
e.emit('eventA') // 
e.allOff('eventA')
console.log('-------->>>>')
e.emit('eventA')