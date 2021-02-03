// 1. 冒泡排序
export const bubbleSort = arr => {
  const i = arr.length
  while (i > 0) {
    for (let j = 0; j < i - 1; j++) {
      if(arr[j] > arr[j + 1]) [arr[j],arr[j+1]] = [arr[j+1], arr[j]]
    }
    i--
  }
  return arr
}

// 2. 选择排序: 遍历自身以后的元素，最小的元素跟自己调换位置
export const selectSort = arr => {
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = i; j < j < len; j++) {
      if(arr[i] > arr[j]) [arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }
}

// 3. 插入排序将元素插入到已经排序好的数组中
export const insetSort = arr => {
  const len = arr.length
  for (let i = 1; i < len; i++) { // arr[0]默认为已经排序的数组
    for (let j = i; j > 0; j--) {
      if(arr[j] < arr[j-1]){
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
      }else {
        break
      }
    }
  }
  return arr
}
// 4. 快速排序 选择基准值 mid，循环原数组，
// 小于基准值放左边数组，大于放右边数组，然后 concat 组合，最后依靠递归完成排序。
export const quickSort = arr => {
  const len = arr.length
  if(len <= 1) return arr
  const left = [];
  const right = [];
  const mid = arr.splice(0, 1)
  for (let i = 0; i < len; i++) {
    if(arr[i] < mid) left.push(arr[i])
    else right.push(arr[i])
  }
  return quickSort(left).concat(mid, quickSort(right))
}
