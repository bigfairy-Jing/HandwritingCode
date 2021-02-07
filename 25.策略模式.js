// 策略模式： 简单理解就是定义一系列同级算法（功能的具体实现），在一个稳定的环境下使用

const levelObj = {
  A: num => num * 1,
  B: num => num * 2,
  C: num => num * 3,
  D: num => num * 4,
}

const calcBouns = (level, num) => levelObj[level](num)

console.log(calcBouns('B', 1000))