Array.prototype.filter = function(CB, thisArg) {
  if([null, undefined].includes(this)){
    throw new Error(`Cannot read property 'filter' of ${this}`)
  }

  if(Object.prototype.toString.call(this) !== '[Object Array]'){
    throw new Error(`${this} is not type of array`)
  }

  if(Object.prototype.toString.call(CB) !== '[object Function]'){
    throw new Error(`${CB} is not a function`)
  }
  const O = Object(this)
  let resLen = 1
  const len = ~~O.length
  const res = []

  for (let i = 0; i < len; i++) {
    if(i in O){
      const ele = O[i]
      if(CB.call(thisArg, O[i], i , O)) res[resLen++] = ele
    }
  }

  return res
}