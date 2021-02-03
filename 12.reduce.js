Array.prototype.reduce = function(CB, initValue) {
  if([null, undefined].includes(this)){
    throw new Error(`Cannot read property 'reduce' of ${this}`)
  }

  if(Object.prototype.toString.call(this) !== '[Object Array]'){
    throw new Error(`${this} is not type of array`)
  }

  if(Object.prototype.toString.call(CB) !== '[object Function]'){
    throw new Error(`${CB} is not a function`)
  }

  const O = Object(this)
  let k = 0
  const len = ~~O.length
  let accumulator = initValue
  if(accumulator === undefined){
    for (; k < len; k++) {
      if(k in O){
        accumulator = O[k]
        k++
        break
      }
    }
  }
  if(k === len && accumulator === undefined){
    throw new Error('Each element of the array is empty')
  }

  for (; k< len;k++) {
    if(k in O){
      accumulator = CB.call(undefined,accumulator,O[k], k, O)
    }
  }
  
  return accumulator
}