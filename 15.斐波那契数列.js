// 递归， 时间复杂度O(2^n)
function fibSequence(n) {
  if(n === 1 || n === 2) return n - 1
  return fibSequence(n -1) + fibSequence(n - 2)
}


// 迭代， 时间复杂度为O(n)
function fib(n) {
  let a = 0, b = 1, c = a + b
  for (let i = 3; i < n; i++) {
    a = b
    b = c
    c = a + b
  }
  return c
}