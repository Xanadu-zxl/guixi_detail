<template>
  <div>
    <p v-show="!show">登录中...</p>

    <p v-show="show">授权成功,请等待页面跳转...</p>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  data() {
    return {
      show: '',
      code: '',
      token: '',
      path: '',
      url: 'http://localhost:10777/guixi_detail/code',
      // url: 'https://gxzh.cdht.gov.cn/guixi_detail/code',
      client_id: 'b42b2c8778deb85576ff4476161e7b861661fa1e9f3b5ac53ce85135f2a33eca',
      client_secret: '9af26e14165cf4d9ab0bb7dcf6938a4815660e80b61a5089225ea02c30ebd9b5',
    }
  },
  mounted() {
    this.code = this.$route.query.code
    this.path = sessionStorage.getItem('callback')

    if (!this.code) {
      window.location.href = `https://gxzh.cdht.gov.cn/oauth/authorize?client_id=${this.client_id}&redirect_uri=${this.url}&response_type=code`
    } else {
      this.show = true

      this.$axios({
        method: 'POST',
        url: '/oauth/token',
        headers: { 'Content-Type': 'application/json' },
        params: {
          client_id: this.client_id,
          client_secret: this.client_secret,
          code: this.code,
          grant_type: 'authorization_code',
          redirect_uri: this.url,
        },
      }).then((res) => {
        let token = res.data.access_token
        api.getUserAPI(token).then((res) => {
          console.log(res.data)
          const data = res.data
          localStorage.setItem('user_id', data.id)
          localStorage.setItem('user_phone', data.phone)
          localStorage.setItem('user_name', data.name)
          localStorage.setItem('user_imgUrl', data.headimgurl)
          this.$router.push({ name: 'my' })
        })
      })
    }
  },
}
</script>

<style lang="scss" scoped>
p {
  margin: 20px;
}
</style>
