// import '@babel/polyfill';
const add = (x, y) => x + y;

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("定时器执行完了");
    const value = Math.random();
    console.log(value);
    if (value >= 0.5) {
      resolve(value);
    }
    reject(value);
  }, 1000);
});

promise
  .then(value => {
    console.log(`结果是:${value}`);
  })
  .catch(error => {
    console.log(`错误是:${error}`);
  });
