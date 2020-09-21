<template>
  <div class="home">
    <div class="mian">
      <div class="banner">
        <img class="img" src="../../assets/img/banner.jpg" alt="" />
      </div>
      <van-loading type="spinner" v-show="showLoading" vertical></van-loading>

      <div class="content" v-show="!showLoading">
        <div class="item" v-for="item in list" :key="item.id">
          <div class="icon"><img :src="item.icon" alt="" /></div>
          <van-cell class="title" :title="item.title" is-link :url="item.href" />
        </div>
      </div>

      <a :href="'tel:' + '028-85218279'" class="information-right">
        <van-cell icon="phone" class="phone" title="电话咨询" is-link v-show="!showLoading" />
      </a>
      <footer class="footer" v-show="!showLoading">
        <p>地址：四川省成都市武侯区天仁路176号</p>
      </footer>
    </div>

    <home-nav></home-nav>
  </div>
</template>
<script>
import homeNav from '@/components/page/nav'
import api from '@/api/api'

export default {
  data() {
    return {
      replace: true,
      showLoading: true,
      list: [],
    }
  },
  components: {
    homeNav,
  },
  mounted() {
    let sql = `select * from guixi_form_1_150 where show='是';`
    api.getSqlJsonAPI(sql).then((res) => {
      this.list = res.data
      this.showLoading = false
    })
    document.title = '桂溪党建'
  },
}
</script>
<style lang="scss" scoped>
.home {
  background: linear-gradient(88.34deg, #b1391a 0%, #ec3017 100%);

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
      width: 43vw;
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
        display: flex;
        justify-content: center;
        align-items: center;
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
    margin: 20px auto 50px;
    font-size: 12px;
    text-align: center;
    color: #ffffff;
    opacity: 0.6;
    background-image: url(./../../assets/img/bg_bottom.jpg);
    height: 105px;
    line-height: 105px;
    background-size: cover;
  }
}
</style>
