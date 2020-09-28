<template>
  <div class="detail_content">
    <div class="detail_content_title">{{ searchTitle.value }}</div>

    <header class="header">
      <!-- 筛选条件： -->
      <div class="detail-select">
        <div class="select">
          <select v-model="search.value">
            <option :key="index" :value="option" class="option" v-for="(option, index) in columnsTitle">
              {{ option }}
            </option>
          </select>
          <van-icon name="arrow-down" />
        </div>
      </div>
      <img class="export" @click="exportData" src="@/assets/img/table_btn_download.jpg" />
    </header>
    <div class="table">
      <Table
        :ellipsis="ellipsis"
        border
        stripe
        height="600"
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
        height="600"
        @on-row-click="rowClick"
        :columns="exportColumns"
        :data="data"
        :loading="loading"
      ></Table>

      <div class="title">共 {{ page.total }} 条数据</div>
    </div>

    <!-- 弹框 -->
    <van-popup class="popup" v-model="show" round close-icon="close" :style="{ height: '80%', width: '90%' }">
      <div>
        <header class="popup-header">桂溪街道数据统计详情</header>
        <div class="popup-item">
          <div v-for="item in showArr" :key="item.id">
            <p v-if="item.identity_key === 'project'">
              <van-field readonly type="textarea" autosize :label="item.title" :value="showObj[item.identity_key]" />
            </p>
            <p v-else>
              <van-field readonly :label="item.title" :value="showObj[item.identity_key]" />
            </p>
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
      currentPage: 1,
      show: false,
      showArr: [],
      showObj: {},
      showVisitArr: [],
      columns: [],
      exportColumns: [],
      columnsTitle: [],
      data: [],
      page: {
        total: 0,
      },
      loading: true,
      search: {
        value: '全部类别',
        type: 'category',
      },
      searchTitle: {
        value: '全部科室',
        key: 'department',
      },
      tableID: 198,
      showPhone: true,
    }
  },
  watch: {
    searchTitle: {
      handler(newVal, oldVal) {
        let titleValue = newVal.value
        if (titleValue === '全部科室') {
          this.onSearch()
        } else {
          this.onSearchTitle(titleValue)
        }
      },
      deep: true,
    },
    search: {
      handler(newVal, oldVal) {
        let titleValue = newVal.value
        if (titleValue === '全部类别') {
          this.search.value = ''
          this.onSearch()
        } else {
          this.onSearch()
        }
      },
      deep: true,
    },
  },
  mounted() {
    document.title = '桂溪街道数据统计'
    this.searchTitle.value = this.$route.query.name
    // 获取类别
    let sql = `SELECT * FROM guixi_form_1_201 where department ~ '${this.searchTitle.value}';`
    api.getSqlJsonAPI(sql).then((res) => {
      const array = []
      res.data.forEach((ele) => {
        array.push(ele.category)
      })
      this.columnsTitle = Array.from(new Set(array))
      this.columnsTitle.unshift('全部类别')
    })

    api.getFormAPI(this.tableID).then((res) => {
      // 创建表头
      this.columns = total.createdTableHeadersDetail(res.data.fields)
      this.exportColumns = total.createdExportHeadersDetail(res.data.fields)
    })
    this.getPageData()

    let sqlCount = `SELECT COUNT(*) FROM guixi_form_1_198 where department ~ '${this.searchTitle.value}';`
    api.getSqlJsonAPI(sqlCount).then((res) => {
      this.page.total = res.data[0].count
    })
    api.getFormAPI(this.tableID).then((res) => {
      this.showArr = res.data.fields
    })
  },
  methods: {
    currentChange() {
      this.page.current = this.page.pageSize * (this.currentPage - 1)
      this.onSearch()
    },
    getPageData() {
      this.loading = true
      let sql = `SELECT * FROM guixi_form_1_198 where department ~ '${this.searchTitle.value}' ORDER BY created_at DESC `
      api.getSqlJsonAPI(sql).then((res) => {
        this.data = total.unitWith(res.data)
        this.loading = false
      })
    },

    onSearch() {
      this.loading = true
      let sql = `SELECT * FROM guixi_form_1_198  where department ~ '${this.searchTitle.value}' and category ~ '${this.search.value}' ORDER BY created_at DESC`
      api.getSqlJsonAPI(sql).then((res) => {
        this.data = total.unitWith(res.data)

        this.loading = false
      })

      let sqlCount = `SELECT COUNT(*) FROM guixi_form_1_198 where department ~ '${this.searchTitle.value}' and category ~ '${this.search.value}' ; `
      api.getSqlJsonAPI(sqlCount).then((res) => {
        this.page.total = res.data[0].count
      })
    },
    onSearchTitle(title) {
      this.loading = true
      let sql = `SELECT * FROM guixi_form_1_198  where department ~ '${this.searchTitle.value}' ORDER BY created_at  DESC`
      api.getSqlJsonAPI(sql).then((res) => {
        this.data = total.unitWith(res.data)

        this.loading = false
      })

      let sqlCount = `SELECT COUNT(*) FROM guixi_form_1_198 where department ~ '${this.searchTitle.value}'; `
      api.getSqlJsonAPI(sqlCount).then((res) => {
        this.page.total = res.data[0].count
      })
    },
    rowClick(row, column, data, event) {
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
    line-height: 50px;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
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
    width: 7rem;
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
    margin: 30px auto 0px;
    width: 90%;
    text-align: left;
    .select {
      border-left: 4px solid #1989fa;
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
