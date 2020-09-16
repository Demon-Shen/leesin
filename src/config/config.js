const devConfig = {
  api: "http://localhost:8010",
  ossUrl: "https://leesin-congcong.oss-cn-shanghai.aliyuncs.com/"
}

const proConfig = {
  api: "http://49.234.233.180/leesin",
  ossUrl: "https://leesin-congcong.oss-cn-shanghai.aliyuncs.com/"
}

export default {
  ...devConfig,
  // ...proConfig
}