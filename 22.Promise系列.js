// 链式调用
// 错误捕获 (冒泡)

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class Promise {
  constructor(exector) {
    this.status = PENDING

    this.value = undefined
    this.reason = undefined

    // 成功回调函数队列
    this.onFulfilledCallbacks = []
    // 失败回调函数队列
    this.onRejectedCallbacks = []

    const resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        // 成功函数依次执行
        this.onFulfilledCallbacks.forEach(fn => fn(this.value))
      }
    }

    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECT
        this.reason = reason
        // 失败的函数依次执行
        this.onRejectedCallbacks.forEach(fn => fn(this.reason))
      }
    }

    try {
      // 立即执行executor
      // 把内部的resolve 和 reject传入executor, 用户可以调用resolve和reject
      exector(resolve, reject)
    } catch (error) {
      reject(error)
    }

  }

  then(onFulfilled, onReject) {

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value

    onReject = typeof onReject === 'function' ? onReject :
      reason => {
        throw new Error(reason instanceof Error ? reason.message : reason)
      }

    // 保存this
    const self = this
    return new Promise((resolve, reject) => {
      if (self.status === PENDING) {
        self.onFulfilledCallbacks.push(() => {
          try {
            setTimeout(() => {
              const result = onFulfilled(self.value)
              // 分两种情况
              // 1. 回调函数返回值是Promise,执行then操作
              // 2. 不是Promise, 调用新的Promise的resolve函数
              result instanceof Promise ? result.then(resolve, reject) : resolve(resolve)
            })
          } catch (error) {
            reject(error)
          }
        })
        self.onRejectedCallbacks.push(() => {
          try {
            setTimeout(() => {
              const result = onReject(self.reason)
              // 不同点 此时reject
              result instanceof Promise ? result.then(resolve, reject) : reject(result)
            })
          } catch (error) {
            reject(result)
          }
        })
      } else if (self.status === FULFILLED) {
        try {
          setTimeout(() => {
            const result = onFulfilled(self.value)
            result instanceof Promise ? result.then(resolve, reject) : resolve(result)
          })
        } catch (error) {
          reject(error)
        }
      } else if (self.status === REJECTED) {
        try {
          setTimeout(() => {
            const result = onReject(self.value)
            result instanceof Promise ? result.then(resolve, reject) : reject(result)
          })
        } catch (error) {
          reject(error)
        }
      }
    })
  }

  catch (onReject) {
    return this.then(null, onReject)
  }

  static resolve(value) {
    if (value instanceof Promise) {
      return value
    } else {
      return new Promise((resolve) => resolve(value))
    }
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  finally(CB) {
    this.then(
      value => {
        return Promise.resolve(CB()).then(() => {
          return value
        })
      }),
      error => {
        return Promise.resolve(CB()).then(() => {
          throw error
        })
      }
  }
}

// 附加

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    const result = []
    let index = 0
    const len = promises.length
    if (len === 0) {
      resolve(result)
      return
    }

    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(data => {
        result[i] = data
        index++
        if (index === len) resolve(result)
      }).catch(error => {
        reject(error)
      })
    }
  })
}


Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    const len = promises.length
    if (len === 0) return
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(data => {
        resolve(data)
        return
      }).catch(error => {
        reject(error)
        return
      })
    }
  })
}