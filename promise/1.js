// 手写promise
// 三种状态 pedding fulfilled rejected 不可逆 从pedding到fufilled(rejected)之后执行.then(.catch) 传入的方法
// 存在.then的链式调用
// 构造函数接受一个函数作为参数
// new Promise((resolve, reject) => {
//    resolve('1');
// })
//   .then(res => {
//      console.log(res); // 1
//   })
//   .catch(err => {

//   })

// 不能透传
// const PEDDING = 'pedding';
// const FULFILLED = 'fufilled';
// const REJECTED = 'rejected';
// class MyPromise {
//   constructor(fn) {
//     this.state = PEDDING;
//     this.value = null;
//     this.fufilledCallback = [];
//     this.rejectCallback = []
//     try {
//       fn(this.resolve.bind(this), this.reject.bind(this))
//     }
//     catch(err) {
//       this.reject(err);
//     }
//   }
//   resolve(value) {
//     if (this.state === PEDDING) {
//       this.state = FULFILLED;
//       this.value = value;
//       this.fufilledCallback.forEach(cb => cb(this.value));
//     }
    
//   }
//   reject(err) {
//     if (this.state === PEDDING) {
//       this.state = REJECTED;
//       this.value = err;
//       this.rejectCallback.forEach(cb => cb(this.value));
//     }
    
//   }
//   then(onfufiled, onreject) {
//     const fufilledCb = onfufiled instanceof Function
//       ? onfufiled
//       : v => v;
//     const rejectedCb = onreject instanceof Function
//       ? onreject
//       : (err) => {
//         throw err;
//       };
//     if (this.state === PEDDING) {
//       this.fufilledCallback.push(fufilledCb);
//       this.rejectCallback.push(rejectedCb);
//     }
//     if (this.state === FULFILLED) {
//       fufilledCb(this.value);
//     }
//     if (this.state === REJECTED) {
//       rejectedCb(this.value);
//     }
//   }
//   // catch() {
//   //   const rejectedCb = cb instanceof Function ? cb : v => v;
//   //   this.rejectCallback.push(rejectedCb);
//   // }
// };
// new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success');
//   }, 1000)
// }).then(res => {console.log(res)})

class MyPromise {
  static PEDDING = 'pedding';
  static FUFILLED = 'fufilled';
  static REJECTED = 'rejected'
  constructor(fn) {
    this.state = MyPromise.PEDDING;
    this.value = null;
    this.rejectCallback = [];
    this.fufilledCallback = null;
    this.newPromise = null;
    typeof fn === 'function' ? fn(this.resolve.bind(this), this.reject.bind(this)) : null
  }
  resolve(value) {
    if (this.state === MyPromise.PEDDING) {
      this.value = value;
      this.state = MyPromise.FUFILLED
      this.fufilledCallback.forEach(cb => cb(this.value));
    }
  }

  reject(err) {
    if (this.state = MyPromise.PEDDING) {
      this.value = err;
      this.state = MyPromise.REJECTED;
      this.rejectCallback.forEach(cb => cb(this.value))
    }
  }

  then(onfufiled) {
    const fufilledCb = typeof onfufiled === 'function' ? onfufiled : v => v;
    this.fufilledCallback.push(fufilledCb);
  }
   catch(onrejected) {
    const rejectedCb = typeof onrejected === 'function' ? onrejected : v => v;
    this.rejectCallback.push(rejectedCb);
   }
}
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 1000);
}).then(res => console.log(res));

