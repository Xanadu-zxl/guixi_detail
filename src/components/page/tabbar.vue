<template>
  <div>
    <header class="tabnar-header">
      <van-icon name="arrow-left" @click="back" />
      <span>党员信息</span>
    </header>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {}
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
.tabnar-header {
  display: flex;
  width: 100%;
  position: relative;

  .van-icon-arrow-left::before {
    position: absolute;
    left: 1px;
    line-height: 2.5rem;
    margin: 10px 16px;
    font-size: 22px;
    font-weight: 700;
  }

  span {
    width: 100%;
    display: block;
    font-size: 16px;
    font-weight: 600;
    color: #222;
    height: 2.5rem;
    line-height: 2.5rem;
    margin: 10px 16px;
  }
}
</style>
