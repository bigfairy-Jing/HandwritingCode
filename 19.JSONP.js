const jsonp = ({url, params, CB}) => {
  const generateURL = (params) =>{
    let dataStr = ''
    for (let key in params) {
      dataStr += `${key}=${params[key]}&`
    }
    dataStr += `callback=${CB}`
    return `${url}?${dataStr}`
  }
  return new Promise((reslove, reject) => {
    CB = CB || Math.random().toString()
    const scriptEle = document.createElement('script')
    scriptEle.src = generateURL(params)
    document.body.appendChild(scriptEle)
    window[CB] = data => {
      reslove(data)
      document.body.removeChild(scriptEle)
    }
  })
}