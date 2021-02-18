class VueRouter {
  // Vue 构造函数
  // options 路由映射表，
  constructor(Vue, options) {
    this.$options = options
    this.mode = options.mode || 'hash'
    this.routeMap = {}

    // new 1 个Vue实例储存当前路由属性current
    this.app = new Vue({
      data: {
        current: '#/',
      }
    })
    // 初始化监听路由变化
    this.init()
    // 简单数据转换 this.routeMap = { '/': Home, '/page1': '/page1'}
    this.createRouteMap(this.$options)
    // 组件注册
    this.initComponent(Vue, this.$options, this.app)
  }

  init() {
    if (this.mode === 'hash') {
      window.addEventListener('load', () => {
        this.app.current = window.location.hash.slice(1) || '/'
      }, false)
      window.addEventListener('hashchange', () => {
        this.app.current = window.location.hash.slice(1) || '/'
      }, false)
    } else {
      window.addEventListener('load', () => {
        this.app.current = window.location.pathname || '/'
      })
      window.addEventListener('popstate', () => {
        this.app.current = window.location.pathname || '/'
      })
    }
  }

  createRouteMap(options) {
    options.routes.forEach(item => {
      this.routeMap[item.path] = item.component
    })
  }

  initComponent(Vue, options, app) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      methods: {
        handleClick(event) {
          event && event.preventDefault && event.preventDefault()
          const mode = options.mode
          const path = app.current
          if (mode === 'hash') {
            window.history.pushState(null, '', `#/${path.slice(1)}`)
          } else {
            window.history.pushState(null, '', path.slice(1))
          }
        },
      },
      template: '<a :href="top"><slot></slot></a>'
    })
    const _this = this
    Vue.component('router-view', {
      render(h) {
        const component = _this.routeMap[_this.app.current]
        return h(component)
      }
    })
  }
}