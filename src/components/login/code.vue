<template>
  <div>
    <p class="p" v-show="show">授权成功,请等待页面跳转...</p>
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
    }
  },
  mounted() {
    this.code = this.$route.query.code
    this.path = sessionStorage.getItem('callback')

    this.$axios({
      method: 'POST',
      url: '/oauth/token',
      headers: { 'Content-Type': 'application/json' },
      params: {
        client_id: '7b5453ca4e172f6a31bf290376a0c483651d4775a8af1bd840bc9b83aad7af09',
        client_secret: '2e47adc25c9584deabd3866923ad5784236149a5a087442e8b3320ba6eaa35d2',
        code: this.code,
        grant_type: 'authorization_code',
        // redirect_uri: 'http://localhost:8080/guixi_detail/saler/code',
        redirect_uri: 'http://shandenabian.skylarkly.com/guixi_detail/saler/code',
      },
    }).then((res) => {
      let token = res.data.access_token
      api.getUserAPI(token).then((res) => {
        const data = res.data
        this.show = true
        localStorage.setItem('user_id', data.id)
        localStorage.setItem('user_phone', data.phone)
        localStorage.setItem('user_name', data.name)
        const phone = data.phone
        let sqlCount = `SELECT * FROM fdc_form_1_14 WHERE phone = '${phone}'; `
        api.getSqlJsonAPI(sqlCount).then((res) => {
          const [data] = res.data
          localStorage.setItem('user_permission', data.authority)
        })

        if (this.path) {
          this.$router.push({ name: this.path })
        } else {
          this.$router.push({ name: 'buy' })
        }
      })
    })
  },
}
</script>

<style lang="scss" scoped>
.p {
  margin: 20px;
}
</style>
