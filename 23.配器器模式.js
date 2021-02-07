// 适配器模式 的作用就是解决两个软件实体间接口不兼容情况，实体电器例如电源适配器、USB 转接口、各种转换器等。

// 需求1 对接多个平台外卖

const eleService = {
  create(){
    console.log('你点了一个饿了么外卖')
  }
}

const mtService = {
  create() {
    console.log('你点了一个美团外卖')
  }
}

// 提供给使用者调用
const createOrder = express => {
  if(express.create instanceof Function) express.create()
}
createOrder(eleService)
createOrder(mtService)

// 这个时候百度外卖也想集成SDK,但是百度外卖的方法是generate
const btService = {
  generate(){
    console.log('你点了一个百度外卖')
  }
}

// 适配器
const _btService = {
  create(){
    return btService.generate()
  }
}

createOrder(_btService)


// 2. 需求2 数据格式变更 当有一天后端数据格式发生变化了。前端因为已经深入了页面。
// 这个时候我们可以写一个适配器用来将新的数据格式转换为旧的数据格式