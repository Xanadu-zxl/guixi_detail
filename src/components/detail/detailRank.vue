<template>
  <div class="detail_content">
    <div class="detail_content_title">{{ departmentName }}</div>

    <header class="header">
      <!-- 筛选条件： -->
      <div class="detail-select">
        <div class="select">
          <span class="select-rail"></span>
          <Select v-model="screenValue" style="width:160px" placeholder="请选择类别">
            <Option v-for="item in columnsTitle" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
      <img class="export" @click="exportData" src="@/assets/img/table_btn_download.jpg" />
    </header>
    <div class="table">
      <Table
        :ellipsis="ellipsis"
        border
        stripe
        height="500"
        @on-row-click="rowClick"
        :columns="columns"
        :data="data"
        :loading="loading"
      ></Table>
      <!-- 用于数据导出 -->
      <Table
        v-show="tableShow"
        :ellipsis="ellipsis"
        ref="table"
        border
        stripe
        height="500"
        @on-row-click="rowClick"
        :columns="exportColumns"
        :data="data"
        :loading="loading"
      ></Table>

      <div class="title">共 {{ total }} 条数据</div>
    </div>

    <!-- 弹框 -->
    <van-popup class="popup" v-model="show" round close-icon="close" :style="{ height: '80%', width: '90%' }">
      <div>
        <header class="popup-header">桂溪街道数据统计详情</header>
        <div class="popup-item">
          <div v-for="item in showArr" :key="item.id">
            <!-- <p v-if="item.identity_key === 'project'">
              <van-field readonly type="textarea" autosize :label="item.title" :value="showObj[item.identity_key]" />
            </p> -->
            <van-field readonly :label="item.title" :value="showObj[item.identity_key]" />
          </div>
        </div>
      </div>
      <footer class="popup-footer" @click="showPopup">关闭</footer>
    </van-popup>
  </div>
</template>
<script>
import api from '@/api/api'
import total from '@/api/total'

export default {
  data() {
    return {
      tableShow: false,
      ellipsis: true,
      show: false,
      showArr: [],
      showObj: {},
      columns: [],
      exportColumns: [],
      columnsTitle: [],
      data: [],
      loading: true,
      total: 0,
      tableID: '',
      screenValue: '',
      showPhone: true,
      departmentName: '',
    }
  },
  watch: {
    screenValue(newValue, oldValue) {
      this.screenData(newValue)
    },
  },
  mounted() {
    document.title = '桂溪街道数据统计'
    this.departmentName = this.$route.query.name
    let tableSQL = `SELECT * FROM guixi_form_1_290 where name ~ '${this.departmentName}';`
    api.getSqlJsonAPI(tableSQL).then((res) => {
      this.tableID = res.data[0].table_id
      // 获取类别
      let sql = `SELECT * FROM guixi_form_1_${this.tableID};`
      api.getSqlJsonAPI(sql).then((res) => {
        this.columnsTitle = total.getColumnsTitle(res.data)
      })
      api.getFormAPI(this.tableID).then((res) => {
        // 创建表头
        this.columns = total.createdTableHeadersDetail(res.data.fields)
        this.exportColumns = total.createdExportHeadersDetail(res.data.fields)
      })
      api.getFormAPI(this.tableID).then((res) => {
        this.showArr = res.data.fields
      })
      this.getPageData()
    })
  },
  methods: {
    getPageData() {
      this.loading = true
      let sql = `SELECT * FROM guixi_form_1_${this.tableID} ORDER BY created_at DESC `
      api.getSqlJsonAPI(sql).then((res) => {
        this.data = total.unitWith(res.data)
        this.total = res.data.length
        this.loading = false
      })
    },
    screenData(value) {
      this.loading = true
      let sql = `SELECT * FROM guixi_form_1_${this.tableID}  where category ~ '${value}' ORDER BY created_at DESC`
      api.getSqlJsonAPI(sql).then((res) => {
        this.data = total.unitWith(res.data)
        this.total = res.data.length
        this.loading = false
      })
    },

    rowClick(row, column, data, event) {
      console.log(row)
      this.show = true
      this.showObj = row
    },
    showPopup() {
      this.show = false
    },
    exportData() {
      this.$refs.table.exportCsv({
        filename: '桂溪街道数据统计',
        quoted: true,
      })
    },
  },
}
</script>
<style lang="scss">
.detail_content {
  width: 100%;
  margin: 0px auto;
  .detail_content_title {
    font-size: 20px;
    font-weight: 600;
    line-height: 60px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
  }
  .header {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    width: 90vw;
    margin: 0 auto;
    .header-select {
      display: flex;
      border-radius: 20px;
      margin: 15px 0px;
      .search {
        border-radius: 20px;
        border: none;
        height: 40px;
        background: #f6f7f9;
        width: 280px;
        padding: 0px;

        .van-cell {
          border: none;
        }
      }
    }
    .export {
      background: #1989fa;
      height: 40px;
      width: 40px;
      margin: 15px;
      border-radius: 20px;
    }
  }
  .ivu-table-header thead tr th,
  .ivu-table-fixed-header thead tr th {
    padding: 4px;
  }
  .ivu-table td,
  .ivu-table th {
    text-align: center;
    border-bottom: none;
  }
  .ivu-table th {
    color: #fff;
    background: #1989fa;
    font-weight: 600;
  }
  .ivu-table-cell {
    padding: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    height: 32px;
    line-height: 32px;
  }
  .ivu-table-row {
    height: 32px;
  }
  .table {
    margin: 0 auto;
    position: relative;
  }
  .title {
    line-height: 1.25rem;
    height: 1.25rem;
    margin: 1rem;
  }
  .van-field__label {
    width: 5.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .ivu-page-item:hover {
    border: 1px solid #dcdee2;
    a {
      color: black;
    }
  }
  .van-pagination {
    justify-content: center;
  }
  .ivu-table td,
  .ivu-table th {
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .van-pagination__next,
  .van-pagination__prev {
    max-width: 6.25rem;
  }
  .van-cell {
    border-bottom: 1px solid #ebedf0;
  }
  .popup {
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .popup-header {
      line-height: 52px;
      font-size: 16px;
      font-weight: 600;
      height: 52px;
      border-bottom: 1px solid #ebedf0;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
    }
    .popup-item {
      margin: 30px auto 60px;
      width: 87%;
    }
    .popup-footer {
      line-height: 52px;
      font-size: 16px;
      font-weight: 600;
      background: #1989fa;
      width: 100%;
      color: #fff;
      height: 52px;
    }
  }
  .detail-select {
    margin: 20px auto 0px;
    width: 90%;
    text-align: left;

    .select {
      .select-rail {
        border: 2px solid #1989fa;
        background: #1989fa;
        border-radius: 4px;
        height: 1.75rem;
        margin-right: 0.5rem;
      }
      padding-left: 10px;
      select {
        -webkit-appearance: none;
        border: none;
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #262626;
        background: #fff;
        outline: none;
        width: 150px;
      }
    }
  }
}
</style>
