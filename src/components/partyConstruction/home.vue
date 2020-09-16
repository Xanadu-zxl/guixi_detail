<template>
  <div class="home">
    <div class="mian">
      <div class="banner">
        <img class="img" src="../../assets/img/banner.png" alt="" />
      </div>
      <div class="content">
        <div class="item">
          <div class="icon">1</div>
          <van-cell class="title" title="党建地图" is-link url="/vant/mobile.html" />
        </div>
        <div class="item">
          <div class="icon">1</div>
          <van-cell class="title" title="党建地图" is-link url="/vant/mobile.html" />
        </div>
        <div class="item">
          <div class="icon">1</div>
          <van-cell class="title" title="党建地图" is-link url="/vant/mobile.html" />
        </div>
        <div class="item">
          <div class="icon">1</div>
          <van-cell class="title" title="党建地图" is-link url="/vant/mobile.html" />
        </div>
      </div>

      <van-cell icon="phone" class="phone" title="电话咨询" is-link url="/vant/mobile.html" />
      <footer class="footer">
        <p>地址：四川省成都市武侯区天仁路176号</p>
      </footer>
    </div>

    <home-nav></home-nav>
  </div>
</template>
<script>
import homeNav from '@/components/page/nav'

export default {
  data() {
    return {
      replace: true,
    }
  },
  components: {
    homeNav,
  },
  mounted() {
    document.title = '桂溪党建'
  },
}
</script>
<style lang="scss" scoped>
.home {
  position: absolute;
  background: linear-gradient(88.34deg, #b1391a 0%, #ec3017 100%);
  height: 100%;
  width: 100%;

  .img {
    margin: 0rem auto 1.25rem;
    width: 100%;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 95%;
    margin: 0 auto;

    .item {
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.03);
      border-radius: 8px;
      height: 8.125rem;
      width: 10.3125rem;
      color: #fff;
      background: #0000001a;
      margin: 0.375rem;
      display: flex;
      flex-direction: column;

      .icon {
        width: 2.875rem;
        height: 2.875rem;
        background: #ff5722;
        border-radius: 8px;
        margin: 1.125rem;
      }

      .title {
        text-align: left;
        font-size: 16px;
        color: #fff;
        line-height: 22px;
        background: transparent;

        .van-icon-arrow::before {
          color: #fff;
        }
      }
    }
  }

  .phone {
    width: 94%;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.03);
    border-radius: 8px;
    margin: 0.375rem auto;
    background: #0000001a;
    font-size: 16px;
    color: #ffffff;
    text-align: left;

    .van-icon-arrow::before {
      color: #fff;
    }
    .van-icon-phone::before {
      font-size: 26px;
    }
  }
  .van-cell::after {
    border: none;
  }

  .footer {
    margin: 50px auto;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    color: #ffffff;
    opacity: 0.6;
    background-image: url(./../../assets/img/bg_bottom.png);
    height: 105px;
    line-height: 105px;
    background-size: cover;
  }
}
</style>
