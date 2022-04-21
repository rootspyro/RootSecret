module.exports = { 
  async headers() {
    return [
      {
        source : "/api/:path",
        headers : [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "http://192.168.0.103:3000" },
        ]
      }
    ]
  }
}
