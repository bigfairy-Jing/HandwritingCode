export const createRandomString = len => {
  let ranDomStr = ''
  for(;ranDomStr.length < len; ranDomStr+=Math.random().toString(36).substr(2)){}
  return ranDomStr.substr(0, len)
}