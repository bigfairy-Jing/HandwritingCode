// 利用函数的length属性(形参) 与 arguments的length比较
export const curry = fn => 
  judge = (...args) =>
    args.length === fn.length? fn(...args) : arg => judge(...args, arg)


function curry2(fn, args=[]) {
  return function() {
      let newArgs = args.concat(Array.prototype.slice.call(arguments))
      if (newArgs.length < fn.length) { 
          return curry.call(this, fn, newArgs)
      } else {
          return fn.apply(this, newArgs)
      }
  }
}