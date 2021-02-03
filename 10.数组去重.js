// 1.双层循环

export const unique1 = arr => {
  const len = arr.length
  const res = []
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < res.length; j++) {
      if(arr[i] === arr[j]) break
      if(j === len) res.push(arr[i])
    }
  }
  return res
}

// 2.indexOf
export const unique2 = arr => {
  const res = []
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i]
    if(res.indexOf(current) === -1) res.push(current)
  }
  return res
}

export const unique3 = arr => arr.filter((item,index)=> arr.indexOf(item) === index)

// 3. 排序后去重, 如果是第一个元素或者相邻元素不相同

export const uniqeu4 = arr => {
  const res = []
  const sortedArray = arr.concat().sort()
  let lastVal 
  for (let i = 0; i < sortedArray.length; i++) {
    if(!i || lastVal !== sortedArray[i]) res.push(sortedArray[i])

    lastVal = sortedArray[i]
  }
  return res
}

export const unique5 = arr => arr.concat.sort().filter((item,index)=> !index || item !== arr[index - 1])

// 4.Set or Mat
export const unique5 = arr => [...new Set(arr)]

export const unique6 = arr => {
  const last = new Map()
  return arr.filter(item=> !last.has(item) && last.set(item,1))
}

