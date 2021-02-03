Array.prototype.map = function(CB, thisArg) {
  if([null, undefined].includes(this)) {
    throw new Error(`Cannot read property map of ${this}`)
  }

  if(Object.prototype.toString.call(CB) !== '[object Function]'){
    throw new Error(`${CB} is not a function`)
  }

  if(Object.prototype.toString.call(this) !== '[Object Array]'){
    throw new Error(`${this} is not type of array`)
  }

  const O = Object(this)
  const len = ~~O.length // 保证len为数字
  const res = new Array(len)
  
  for (let k = 0; k < len; k++) {
    if(k in O){
      const mapValue = CB.call(thisArg, O[k], k, O)
      res[k] = mapValue
    }
  }

  return res
}