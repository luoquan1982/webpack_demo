console.log("index.js文件被加载了~");

document.getElementById("btn").onclick = function() {
  // 懒加载~:当文件需要使用时才加载~
  // 预加载 Prefetch: 会在使用之前,提前加载js文件(慎用,兼容性不好,尤其是移动端和IE浏览器)
  // 正常加载可以认为是并行加载(同一时间加载多个文件) 预加载 Prefetch:等待其他资源加载完毕,浏览器空闲了,再偷偷加载
  import(/* webpackChunkName: 'test',webpackPrefetch:true */ "./test").then(
    ({ mul }) => {
      console.log(mul(4, 5));
    }
  );
};
