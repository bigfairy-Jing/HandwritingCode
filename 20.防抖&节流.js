// 1. 防抖 避免不必要连续操作的误操作
const debounce = (fn, delay) => {
  let timer = null
  return function (...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      fn.apply(this, args)
    }, delay)
  }
}

// 2. 节流: 固定频率促发，scroll事件等

function throttle(fn, interval) {
  let flag = true
  return function(...args) {
    if(!flag) return
    flag = false
    setTimeout(()=>{
      fn.apply(this, args)
      flag = true
    }, interval)
  }
}
// 适合逻辑较为复杂情况防抖
function throttle2(fn, interval) {
  let last = 0
  return function() {
    let now = +new Date()
    if(now - last < interval) return
    last = now
    fn.apply(this, args)
  }
}

// 固定频率促发
const throttle = (fn, delay) => {
  let timer = null
  let last = 0
  return function(...args) {
    let now = +new Date()
    if(now - last < delay && timer){
      clearTimeout(timer)
      timer = setTimeout(()=>{
        fn.apply(this, args)
      }, delay)
    }else {
      last = now
      fn.apply(this, args)
    }
  }
}