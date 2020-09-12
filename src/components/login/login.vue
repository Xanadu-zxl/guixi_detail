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
      // code: 'http://localhost:8080/guixi_detail/saler/code',
      code: 'http://shandenabian.skylarkly.com/guixi_detail/saler/code',
    }
  },
  mounted() {
    window.location.href = `http://shandenabian.skylarkly.com/oauth/authorize?client_id=${this.client_id}&redirect_uri=${this.code}&response_type=code`
  },
}
</script>
<style lang="scss" scoped>
p {
  margin: 20px;
}
</style>
