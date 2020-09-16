<template>
  <div>
    <van-tabbar route>
      <van-tabbar-item :replace="replace" to="/guixi_detail/home" icon=" icon-home">
        首页
      </van-tabbar-item>
      <van-tabbar-item :replace="replace" to="/guixi_detail/my" icon=" icon-dangyuan">
        党员中心
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      replace: true,
    }
  },
}
</script>
<style lang="scss" scoped>
.van-tabbar-item--active {
  color: #ff5722;
}

.van-tabbar-item__text {
  font-size: 0.875rem;
  line-height: 1rem;
  height: 1rem;
}
</style>
