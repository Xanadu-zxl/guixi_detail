<template>
  <div class="my">
    <header class="header">
      <van-loading type="spinner" v-show="showLoading" vertical></van-loading>

      <header class="header-content" v-show="!showLoading">
        <div class="header-left">
          <div class="head-portrait">
            <img class="head-portrait_img" :src="imgUrl[0]" alt="" />
          </div>
          <div class="head-info">
            <h3>{{ name }}</h3>
            <p>{{ party }}</p>
          </div>
        </div>
        <div class="header-right">
          <router-link to="particular" class="detailed">
            详细信息
          </router-link>
        </div>
      </header>
    </header>

    <div class="content" v-show="!showLoading">
      <div class="item" v-for="item in list" :key="item.id">
        <img :src="item.icon" alt="" />
        <van-cell icon="" :title="item.title" border is-link />
      </div>
    </div>
    <my-nav></my-nav>
    <van-popup :style="{ height: '40%', width: '70%' }" round close-icon v-model="showPopup">
      <div class="popup">
        <h1 class="popup_h1">提示：</h1>
        <p class="popup_title">尚未登录，是否前往登录？</p>
        <p class="popup_botton">
          <span class="noLogin" @click="showPopup = false">取消</span>
          <router-link class="goLogin" to="code">去登录</router-link>
        </p>
      </div>
    </van-popup>
  </div>
</template>
<script>
import myNav from '@/components/page/nav'
import api from '@/api/api'

export default {
  data() {
    return {
      list: [],
      name: '',
      party: '',
      showLoading: true,
      imgUrl: [],
      showPopup: false,
    }
  },
  components: {
    myNav,
  },
  mounted() {
    document.title = '党员中心'
    this.name = localStorage.getItem('user_name')
    this.phone = localStorage.getItem('user_phone')
    if (!this.name) {
      this.showPopup = true
    }

    let sql = `select * from guixi_form_1_152;`
    api.getSqlJsonAPI(sql).then((res) => {
      this.list = res.data
    })
    let sqlPhone = `select * from guixi_form_1_117 WHERE phone1 ='${this.phone}' ;`
    api.getSqlJsonAPI(sqlPhone).then((res) => {
      if (res.data.length !== 0) {
        this.party = res.data[0].building_party_name
        this.dataID = res.data[0].response_id
        api.getResFormAPI(this.dataID).then((res) => {
          //  赋值
          res.data.entries.forEach((res) => {
            if (res.field_id === 7784) {
              if (res.attachment.download_url) {
                this.imgUrl.push(res.attachment.download_url)
              }
            } else {
              this.imgUrl.push(localStorage.getItem('user_imgUrl'))
            }
          })
          this.showLoading = false
        })
      } else {
        this.$toast('暂无你的党员信息！')
        this.imgUrl.push(localStorage.getItem('user_imgUrl'))
        this.showLoading = false
        this.party = '暂无党组织信息'
      }
    })
  },
}
</script>
<style lang="scss" scoped>
.my {
  background: linear-gradient(90deg, #ac3926 0%, #dd2b20 100%);
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10.625rem;

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
        margin-left: 20px;
        line-height: 60px;
        text-align: left;

        h3 {
          color: #fff;
          line-height: 30px;
        }

        p {
          line-height: 30px;
          font-size: 14px;
          color: #ffffff;
          opacity: 0.6;
        }
      }
    }
    .header-right {
      .detailed {
        background: #ffffff;
        border-radius: 20px;
        width: 6.4375rem;
        height: 2rem;
        line-height: 2rem;
        display: block;
        font-size: 16px;
        text-align: center;
        color: #2196f3;
      }
    }
  }
  .content {
    background: #fff;
    border-radius: 12px 12px 0px 0px;
    margin-top: -1.25rem;
    padding: 1.25rem 0rem;

    .item {
      padding-left: 20px;

      display: flex;
      justify-content: center;
    }
  }

  .van-cell__title,
  .van-cell__value {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    text-align: left;
    padding-left: 20px;
  }
  .popup {
    padding: 20px;
  }
  .popup_h1 {
    margin-top: 20px;
    text-align: left;
  }
  .popup_title {
    margin-top: 15%;
    display: flex;
    font-size: 18px;
  }
  .popup_botton {
    margin-top: 10%;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    margin-right: 10%;
    .noLogin {
      font-size: 16px;
      margin-right: 10%;
    }
    .goLogin {
      text-align: center;
      font-size: 16px;
    }
  }
}
</style>
