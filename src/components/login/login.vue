<template>
  <div>
    <p>登录中...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      client_id: '7b5453ca4e172f6a31bf290376a0c483651d4775a8af1bd840bc9b83aad7af09',
      // code: 'http://localhost:8080/guixi_detail/code',
      code: 'https://gxzh.cdht.gov.cn/guixi_detail/code',
    }
  },
  mounted() {
    window.location.href = `https://gxzh.cdht.gov.cn/oauth/authorize?client_id=${this.client_id}&redirect_uri=${this.code}&response_type=code`
  },
}
</script>
<style lang="scss" scoped>
p {
  margin: 20px;
}
</style>
