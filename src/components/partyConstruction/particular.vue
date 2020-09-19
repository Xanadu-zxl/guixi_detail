<template>
  <div class="app">
    <customer-tabbar :title="title" />
    <div class="content">
      <van-loading type="spinner" v-show="showLoading" vertical></van-loading>
      <aside class="signing" v-show="!showLoading">
        <div :key="field.field_id" v-for="field in formData">
          <div v-if="field.identity_key === 'head_portrait'">
            <h3 class="h3">头像</h3>
            <div class="signing-content">
              <img class="img" :src="imgUrl[0]" alt="" />
              <van-uploader v-model="uploader" multiple :after-read="afterRead" />
            </div>
          </div>
          <p v-else-if="field.identity_key === 'phone1'">
            <van-field
              :id="field.identity_key"
              :label="field.title"
              autocomplete="off"
              placeholder="请输入"
              type="text"
              v-model="field.value"
              right-icon="edit"
              readonly
              @click-right-icon="clickRightIcon(field)"
            />
          </p>
          <p v-else>
            <van-field
              readonly
              :id="field.identity_key"
              :label="field.title"
              autocomplete="off"
              placeholder="请输入"
              type="text"
              v-model="field.value"
            />
          </p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import CustomerTabbar from '../page/tabbar.vue'
import api from '@/api/api'
import total from '@/api/total'

export default {
  data() {
    return {
      title: '党员信息',
      userPhone: '',
      formData: [],
      formID: 117,
      showLoading: true,
      uploader: [],
      dataID: '',
      uptoken: '',
      imgUrl: [],
    }
  },
  components: {
    CustomerTabbar,
  },
  mounted() {
    document.title = '党员信息'
    this.userPhone = localStorage.getItem('user_phone')
    api.getFormAPI(this.formID).then((res) => {
      this.formData = total.ListData(res.data.fields)
      const phone = this.userPhone
      let sql = `select * from guixi_form_1_117 WHERE phone1 ='${phone}' ;`
      api.getSqlJsonAPI(sql).then((res) => {
        if (res.data.length !== 0) {
          this.dataID = res.data[0].response_id
          api.getResFormAPI(this.dataID).then((res) => {
            //  赋值
            res.data.entries.forEach((res) => {
              if (res.field_id === 7784) {
                this.imgUrl.push(res.attachment.download_url)
              } else {
                this.imgUrl.push(localStorage.getItem('user_imgUrl'))
              }
            })
            this.addValue(res.data.entries, this.formData)
            this.showLoading = false
          })
        } else {
          this.$toast('暂无你的党员信息！')
          this.showLoading = false
        }
      })
    })
  },
  methods: {
    addValue(entries, formData) {
      formData.forEach((el) => {
        entries.forEach((element) => {
          if (el.field_id === element.field_id) {
            el.value = element.value
          }
        })
      })
    },
    clickRightIcon(field) {
      window.location.href = 'https://gxzh.cdht.gov.cn/namespaces/1/yet_another_workflow/flows/721/journeys/new'
    },
    // 文件的上传
    afterRead(file) {
      api.getUptokenAPI().then((res) => {
        this.uptoken = res.data.uptoken
        let formData = new FormData()
        // 此时可以自行将文件上传至服务器
        formData.append('file', file.file)
        formData.append('token', this.uptoken)
        formData.append('x:key', '1597796993541')
        let data = formData
        let headers = {
          'content-type': false,
        }
        api.postQiNiuApi(data, headers).then((res) => {
          if (res.status === 200) {
            let payload = {
              response: { entries_attributes: [] },
            }
            payload.response.entries_attributes.push({
              field_id: 7784,
              value: '头像',
              value_id: res.data.id,
            })
            // 发请求上传图片
            api.putFormsAmendAPI(this.formID, this.dataID, payload).then((res) => {
              if (res.status === 200) {
                this.$toast('上传成功 ✨')
              } else {
                this.$toast('上传失败 >_<')
              }
            })
          } else {
            this.$toast('网络波动，请再试一次')
          }
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  width: 50vw;
  min-width: 370px;
  margin: 2.25rem auto;
}
.signing {
  border-radius: 4px;
  padding: 0.8rem 1.2rem;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);

  .signing-content {
    display: flex;
    padding: 0.8rem 1.2rem;
    justify-content: start;

    .img {
      width: 5rem;
      height: 5rem;
      border-radius: 8px;
      margin-right: 0.5rem;
    }
  }
  .van-icon-edit::before {
    font-size: 22px;
    color: #9f9fa1;
  }

  .h3 {
    text-align: left;
    padding: 0px;
    color: #222222;
    font-size: 18px;
    padding: 0.8rem 1.2rem;
    font-weight: 600;
  }

  .table_aside_select {
    width: 60%;
  }
  /deep/ .van-field__label {
    width: 14.5rem;
  }
  /deep/ .van-field {
    flex-direction: column;

    .van-field__control {
      font-family: PingFang SC;
      font-size: 14px;
      color: #6b7885;
    }
    .van-field__label {
      text-align: left;
      padding: 0px;
      color: #222222;
      font-size: 18px;
      font-weight: 600;
      width: 300px;
    }
    .van-field__value {
      line-height: 50px;
      border-bottom: 1px solid #e9eaeb;
    }

    .van-icon-edit::before {
      font-size: 22px;
    }
  }
}
</style>
