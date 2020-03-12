
function add(x, y) {
  return x + y;
}

// 下一行eslint所有规则都失效(不对下一行进行eslint检查)
// eslint-disable-next-line
console.log(add(2, 5));
