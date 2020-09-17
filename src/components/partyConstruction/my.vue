<template>
  <div class="my">
    <header class="header">
      <header class="header-content">
        <div class="header-left">
          <div class="head-portrait">
            <img
              class="head-portrait_img"
              src="http://thirdwx.qlogo.cn/mmopen/vi_32/Dr1oGAIYqCzhgK8iaMpozdsaYDctUXuEWcfBiaSegJowWJ0ylZDNibadeibcUAW5BakENhNNquEeART8WDKZDC4LUA/46"
              alt=""
            />
          </div>
          <div class="head-info">
            <p>攀越</p>
            <p>党支部信息</p>
          </div>
        </div>
        <div class="header-right">
          <span class="detailed">
            详细信息
          </span>
        </div>
      </header>
    </header>
    <my-nav></my-nav>
  </div>
</template>
<script>
import myNav from '@/components/page/nav'
export default {
  data() {
    return {}
  },
  components: {
    myNav,
  },
  mounted() {
    document.title = '党员中心'
  },
}
</script>
<style lang="scss" scoped>
.my {
  background: linear-gradient(90deg, #ac3926 0%, #dd2b20 100%);
}
.header {
  line-height: 10.625rem;

  .header-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 90%;
  }

  .header-left {
    display: flex;
    justify-content: space-between;

    .head-portrait {
      display: flex;
      align-items: center;

      .head-portrait_img {
        width: 60px;
        height: 60px;
        border-radius: 100px;
      }
    }
    .head-info {
      line-height: 24px;
    }
  }
}
</style>
