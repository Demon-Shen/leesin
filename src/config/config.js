const devConfig = {
  api: "http://localhost:8010",
  ossUrl: "https://leesin-congcong.oss-cn-shanghai.aliyuncs.com/",
}

const proConfig = {
  api: "https://www.cncongcong.com/leesin",
  ossUrl: "https://leesin-congcong.oss-cn-shanghai.aliyuncs.com/"
}

export default {
  ...devConfig,
  // ...proConfig
}