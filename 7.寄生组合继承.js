function Parent() {
  this.name = 'zhangsan'
}

function Child() {
  Parent.call(this) // 继承父类的属性
  this.age = 18
}

Child.prototype = Object.create(Parent.prototype)
Object.setPrototypeOf(Child, Parent) // 继承父类的静态方法
Child.prototype.constructor = Child // constructor 重新指向child