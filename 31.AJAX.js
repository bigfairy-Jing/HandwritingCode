function params(data) {
  if(typeof data === 'object') {
    const arr = []
    for (const key in data) {
      arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    }
    return arr.join('&')
  }
  return data
}

const _Ajax = function(url, method="GET", data) {
  return new Promise((reslove, rejcet)=> {
    const xhr = XMLHttpRequest ? new XMLHttpRequest() :
      new ActiveXObject('Microsoft.XMLHttp');
    const _data = params(data);
    
    if(method === 'GET') {
      url.inCludes('?') ? xhr.open(method, `${url}&${_data}`) :
        xhr.open(method, `${url}?${_data}`)
      
      xhr.send()
    }

    if(method === 'POST') {
      xhr.open(method, url, false)
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      xhr.send(_data)
    }

    xhr.onreadystatechange = function( ) {
      if(xhr.readyState !== 4)return
      if(xhr.status === 200 || xhr.status === 304){
        reslove(xhr.responseText)
      } else {
        rejcet(new Error(xhr.responseText))
      }
    }



  }) 
}