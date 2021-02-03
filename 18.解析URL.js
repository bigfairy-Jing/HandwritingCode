// URL
// scheme: // user:password@ host: port path ? query # fragment

// 举例子 https://fairy:shen@www.aiheshui.com:80/file?test1=3&test2=4#load-0

const url = 'https://fairy:shen@www.aiheshui.com:80/file?test1=3&test2=4#load-0'

function parseUrl(url) {
  const schemeStr = '(?:([^/?#]+))?//(?:([^:]*)(?::?(.*))@)?'
  const urlStr = '(?:([^/?#:]*):?([0-9]+)?)?([^?#]*)(\\?(?:[^#]*))?'
  const fragmentStr = '(#(?:.*))'
  const parttern = RegExp(`^${schemeStr}${urlStr}${fragmentStr}`)
  const matched = url.match(parttern) || []
  return {
    protocol: matched[1], // 协议
    username: matched[2], // 用户名
    password: matched[3], // 密码
    hostname: matched[4], // 主机
    port: matched[5], // 端口
    pathname: matched[6], // 路径
    search: matched[7], // 查询字符串 queryString
    hash: matched[8] // 锚点
  }
}
console.log(parseUrl(url))

function parseUrl(url) {
  const urlObj = new URL(url)
  return {
    protocol: urlObj.protocol, // 协议
    username: urlObj.username, // 用户名
    password: urlObj.password, // 密码
    hostname: urlObj.hostname, // 主机
    port: urlObj.port, // 端口
    pathname: urlObj.pathname, // 路径
    search: urlObj.search, // 查询字符串 queryString
    hash: urlObj.hash // 锚点
  }
}


// 单独解析查询字符串
function getQueryType(key) {
  if (key.endsWith('[]')) return 'ARRAY'
  if (key.endsWith('{}')) return 'JSON'
  return 'DEFAULT'
}


function parseQueryString(query) {
  if (!query) return {}
  query = query.replace(/^\?/, '')
  const queryArr = query.split('&')
  const result = {}
  queryArr.forEach(query => {
    let [key, value] = query.split('=')
    try {
      key = decodeURIComponent(key || '').replace(/\+/g, ' ')
      value = decodeURIComponent(value || '').replace(/\+/g, ' ')
    } catch (e) {
      return console.error(e)
    }
    const type = getQueryType(key)
    switch (type) {
      case 'ARRAY':
        key = key.replace(/\[\]$/, '') // 对于形如 `list[]` 的解析成数组
        if (!result[key]) {
          result[key] = [value]
        } else {
          result[key].push(value)
        }
        break;
      case 'JSON':
        key = key.replace(/\{\}$/, '') // 对于形如 obj{} 的解析为对象
        value = JSON.parse(value)
        result.json = value
        break;
      default:
        result[key] = value
    }

  })
  return result
}

// 测试
console.log(parseQueryString('?test1=3&test2=4'))

// 简易版本queryParse
function getUrlQuery(search) {
  const searchObj = {}
  for (let [key, value] of new URLSearchParams(search)) {
    searchObj[key] = value
  }
  return searchObj
}

// 不合理的点
// 相同字段如何处理
// 没有替换 + 为 %20
// 只有 key / 只有 value

// 推荐使用js-url query-string  node中存在url.parse querystring.parse
