import(/*webpackChunkName:'abc'*/ "./a.js").then(({ add }) => {
  console.log(add(1, 2));
});
