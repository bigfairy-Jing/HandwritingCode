// 实现方式有三种
// 1. clentHeight scrollTop offsetTop
// 2. getBoudingClientRect
// 3. intersectionObserver

// 这里只写getBoudingClientRect 和 IntersectionObserver 方法

// @1 getBoundingClientRect
const imgs = document.getElementsByTagName("img")

let count = 0

lazyload()

function throttle(fn, interval) {
  let flag = true
  return function (...args) {
    if (!flag) return
    flag = false
    setTimeout(() => {
      fn.apply(this, args)
      flag = true
    }, interval)
  }
}

window.addEventListener('scroll', throttle(lazyload, 160))

function lazyLoad() {
  for (let i = count; i < imgs.length; i++) {
    if (imgs[i].getBoundingClientRect().top < document.documentElement.clientHeight) {
      if (imgs[i].getAttribute("src") !== "default.jpg") continue;
      imgs[i].src = imgs[i].getAttribute("data-src")
      count++
    }
  }
}


// @2 IntersectionObserver
const imgs = document.getElementsByTagName("img")
const observer = new IntersectionObserver(changes=>{
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i]
    if(img.isIntersecting){
      const imgElement = img.target
      imgElement.src = imgElement.getAttribute('data-src')
      observer.unobserve(imgElement)
    }
  }
});

[...imgs].forEach(item => observer.observe(item))