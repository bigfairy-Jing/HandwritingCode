## 自动生成readme.md文件  
* npm run create
## 说明
* [info.md](./info.md) 



### [1.apply&call](./1.apply&call.js)



### [2.bind](./2.bind.js)



### [3.instanceof](./3.instanceof.js)
* instanceof 判断左边的原型是否存在于右边的原型链中  
* 获取对象原型


### [4.new](./4.new.js)
* new 实际做了三件事情  
* 1. 让实例的对象可以访问私有属性  
* 2. 让实例对象可以访问构造函数原型(constructor.prototype)所在的原型链的属性  
* 3. 考虑构造函数有返回值的情况


### [5.Object.create](./5.Object.create.js)
* 方法创建一个新对象，使用现有的对象来提供新创建的对象的proto。


### [6.柯里化](./6.柯里化.js)
* 利用函数的length属性(形参) 与 arguments的length比较


### [7.寄生组合继承](./7.寄生组合继承.js)
* 继承父类的属性  
* 继承父类的静态方法  
* constructor 重新指向child


### [8.TypeScript中Class私有属性private原理](./8.TypeScript中Class私有属性private原理.js)
* 私有属性满足  
* 1. 能被class内部不同方法访问,但不能在类外部被访问  
* 2. 子类不能继承父类的私有属性


### [9.数组排序](./9.数组排序.js)
* 1. 冒泡排序  
* 2. 选择排序: 遍历自身以后的元素，最小的元素跟自己调换位置  
* 3. 插入排序将元素插入到已经排序好的数组中  
* arr[0]默认为已经排序的数组  
* 4. 快速排序 选择基准值 mid，循环原数组，  
* 小于基准值放左边数组，大于放右边数组，然后 concat 组合，最后依靠递归完成排序。


### [10.数组去重](./10.数组去重.js)
* 1.双层循环  
* 2.indexOf  
* 3. 排序后去重, 如果是第一个元素或者相邻元素不相同  
* 4.Set or Mat


### [11.map](./11.map.js)
* 保证len为数字


### [12.reduce](./12.reduce.js)



### [13.filter](./13.filter.js)



### [14.随机字符串](./14.随机字符串.js)



### [15.斐波那契数列](./15.斐波那契数列.js)
* 递归， 时间复杂度O(2^n)  
* 迭代， 时间复杂度为O(n)


### [16.浅拷贝](./16.浅拷贝.js)
* 浅拷贝：   
* 1. 只能拷贝一层对象，如果对象有嵌套那么浅拷贝无能为力   
* 2. 若拷贝属性是引用类型，拷贝就是内存地址，修改内容会相互影响


### [17.深拷贝](./17.深拷贝.js)
* 1. 乞丐版 ： 无法解决循环引用 2. 无法拷贝特殊的对象，比如 函数，RegExp,Date,Set，Map  
* 2. 几乎覆盖所有版本  
* 基本数据  
* 解决循环引用  
*解决函数  
* 数组 普通对象 Set Map处理  
* 测试


### [18.解析URL](./18.解析URL.js)
* URL  
* scheme: * user:password@ host: port path ? query # fragment  
* 举例子 https:*fairy:shen@www.aiheshui.com:80/file?test1=3&test2=4#load-0  
*fairy:shen@www.aiheshui.com:80/file?test1=3&test2=4#load-0'  
*(?:([^:]*)(?::?(.*))@)?'  
* 协议  
* 用户名  
* 密码  
* 主机  
* 端口  
* 路径  
* 查询字符串 queryString  
* 锚点  
* 协议  
* 用户名  
* 密码  
* 主机  
* 端口  
* 路径  
* 查询字符串 queryString  
* 锚点  
* 单独解析查询字符串  
* 对于形如 `list[]` 的解析成数组  
* 对于形如 obj{} 的解析为对象  
* 测试  
* 简易版本queryParse  
* 不合理的点  
* 相同字段如何处理  
* 没有替换 + 为 %20  
* 只有 key / 只有 value  
* 推荐使用js-url query-string  node中存在url.parse querystring.parse


### [19.JSONP](./19.JSONP.js)



### [20.防抖&节流](./20.防抖&节流.js)
* 1. 防抖 避免不必要连续操作的误操作  
* 2. 节流: 固定频率促发，scroll事件等  
* 适合逻辑较为复杂情况防抖  
* 固定频率促发


### [21.图片懒加载](./21.图片懒加载.js)
* 实现方式有三种  
* 1. clentHeight scrollTop offsetTop  
* 2. getBoudingClientRect  
* 3. intersectionObserver  
* 这里只写getBoudingClientRect 和 IntersectionObserver 方法  
* @1 getBoundingClientRect  
* @2 IntersectionObserver


### [22.Promise系列](./22.Promise系列.js)
* ### 1.Promise  
* 链式调用  
* 错误捕获 (冒泡)  
* 成功回调函数队列  
* 失败回调函数队列  
* 成功函数依次执行  
* 失败的函数依次执行  
* 立即执行executor  
* 把内部的resolve 和 reject传入executor, 用户可以调用resolve和reject  
* 保存this  
* 分两种情况  
* 1. 回调函数返回值是Promise,执行then操作  
* 2. 不是Promise, 调用新的Promise的resolve函数  
* 不同点 此时reject  
* 附加