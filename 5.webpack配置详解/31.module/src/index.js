import minus from "./minus";

console.log("index.js文件加载了~");

import("./add").then(({ default: add }) => {
  console.log(add(10, 2));
});

console.log(minus(3, 2));
