<template>
  <div class="header">
    <img src="../assets/img/404.jpg" alt="" class="img" />
    <p>对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>
    <p class="link" @click="back">返回上一页</p>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {
    document.title = '404网页找不到～'
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
  },
}
</script>
<style lang="scss" scoped>
.header {
  margin-top: 50px;

  .img {
    width: 80%;
    height: 100%;
  }

  p {
    padding: 20px;
  }

  .link {
    color: rgb(102, 166, 238);
  }
}
</style>
