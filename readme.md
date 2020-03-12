"browserslist": {
    "development": [
      // 兼容最近的chrome版本
      "last 1 chrome version"
    ],
}

"browserslist": {
    "development": [
      // 兼容最近的chrome版本
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    "production": [
      // 大于99.8的浏览器
      ">0.2%",
      // 不需要支持已经"死掉"的浏览器
      "not dead",
      // 不需要支持op_mini浏览器的所有浏览器(op_mini已经死亡了)
      "not op_mini all"
    ]
  }