const BASE_URL = process.env.NODE_ENV === 'productiojn' ? '/guixi_detail' : '/'

module.exports = {
  devServer: {
    proxy: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  },
}
