// call bind apply 都可以改变this指向
// call 接受的多个参数， 其中第一个参数是对象，
// apaly 接受两个参数， 第一个参数为绑定的对象，第二个参数是一个数组
// bind 和apply一样， 但是返回的是一个函数

// function.call(obj, arg1, arg2, ...,argn)
Function.prototype.myCall = function (context) {
  const _context = context || window;
  const args = [...arguments].slice(1);
  _context.fn = this;
  return _context.fn(...args);
}

// fun.apply(obj, [arg1, arg2, ...,argn])
Function.prototype.myApply = function(context) {
  const myContext = context || window;
  const args = [...arguments][1];
  myContext.fn = this;
  return myContext.fn(...args);
}
// function.bind(obj)(arg1, arg2)
Function.prototype.myBind = function (context) {
  const args = [...arguments].slice(1);
  const self = this;
  return function Fn() {
    if (self instanceof Fn) {
      return new self(...arguments, ...args);
    } else {
      return self.myApply(context, args.concat(...arguments))
    }
  }
}

function say(sex) {
  console.log(`I can speak ${this.language}`)
  console.log(`更多信息, 我是${sex}`);
};

function Person() {
  console.log('我是人')
}
Person.prototype.say = function () {
  console.log(this.name);
};

const dog = {
  name: '小黑',
  language: '汪汪'
}
const pig = {
  name: '小猪🐷',
  language: '猪猪'
}
say.myCall(dog, '男的');
say.myApply(pig, ['女生']);
say.myBind(dog)('阴阳人');

const person = new Person();
person.say.myBind(pig, 'hhh')('xxx');

function CreateObj() {
  let obj = {};
  let Con = [].shift.call(arguments)
}

