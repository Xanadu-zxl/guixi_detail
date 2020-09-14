<template>
  <div class="detail_content">
    <div class="detail-select">
      <div class="select">
        <select v-model="searchTitle.value">
          <option :key="index" :value="option" class="option" v-for="(option, index) in columnsTitle">
            {{ option }}
          </option>
        </select>
        <van-icon name="arrow-down" />
      </div>
    </div>

    <header class="header">
      <!-- 筛选条件： -->
      <div class="header-select">
        <van-search
          class="search"
          shape="round"
          v-model="search.value"
          placeholder="请输入搜索关键词"
          @blur="onSearch"
        />
      </div>
      <img class="export" @click="exportData" src="@/assets/img/table_btn_download.png" />
    </header>
    <div class="table">
      <Table
        tooltip
        ref="table"
        border
        stripe
        height="680"
        @on-row-click="rowClick"
        :columns="columns"
        :data="data"
        :loading="loading"
      ></Table>
      <!-- 分页器 -->

      <div class="title">共 {{ page.total }} 条</div>
      <van-pagination
        v-model="currentPage"
        :total-items="page.total"
        :show-page-size="5"
        @change="currentChange()"
        force-ellipses
      />
    </div>

    <!-- 弹框 -->
    <van-popup v-model="show" round close-icon="close" :style="{ height: '80%', width: '90%' }">
      <header class="popup-header">桂溪街道数据统计详情</header>
      <div class="popup">
        <div v-for="item in showArr" :key="item.id">
          <p v-if="item.identity_key === 'depict'">
            <van-field readonly type="textarea" autosize :label="item.title" :value="showObj[item.identity_key]" />
          </p>
          <p v-else-if="item.identity_key === 'working_area'">
            <van-field readonly type="textarea" autosize :label="item.title" :value="showObj[item.identity_key]" />
          </p>
          <p v-else-if="item.identity_key === 'phone'" v-show="showPhone">
            <van-field readonly autosize :label="item.title" :value="showObj[item.identity_key]" />
          </p>
          <p v-else>
            <van-field readonly :label="item.title" :value="showObj[item.identity_key]" />
          </p>
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
      currentPage: 1,
      show: false,
      showArr: [],
      showObj: {},
      showVisitArr: [],
      columns: [],
      columnsTitle: [
        '全部科室',
        '火车南站综合管理办公室',
        '社区发展办公室',
        '党群办公室',
        '综合执法中队',
        '社区治理办公室',
        '市场监管所',
        '城市管理办公室',
        '营商环境建设办公室',
        '民生办',
        '政务服务办公室',
        '劳动就业和社会保障服务办公室',
        '民政服务办公室',
        '退役军人服务站',
        '综合办',
      ],
      data: [],
      page: {
        pageSize: 13,
        total: 0,
        current: 0,
      },
      loading: true,
      search: {
        value: '',
        type: 'department',
      },
      searchTitle: {
        value: '全部科室',
        key: 'department',
      },
      tableID: 149,
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
  },
  mounted() {
    api.getFormAPI(this.tableID).then((res) => {
      // 创建表头
      this.columns = total.createdTableHeadersDetail(res.data.fields)
    })

    this.getPageData()
    let sqlCount = `SELECT COUNT(*) FROM guixi_form_1_149;`
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
      let sql = `select * from guixi_form_1_149  ORDER BY created_at DESC limit ${this.page.pageSize} OFFSET ${this.page.current}`
      api.getSqlJsonAPI(sql).then((res) => {
        res.data.forEach((element) => {
          element.created_at = element.created_at.slice(0, 10)
          if (element.estimated_time) {
            element.estimated_time = element.estimated_time.slice(0, 10)
          }
        })
        this.data = res.data
        this.loading = false
      })
    },

    onSearch() {
      this.loading = true
      let sql = `select * from guixi_form_1_149  where department ~ '${this.search.value}' or  category ~ '${this.search.value}' or project ~ '${this.search.value}' or  unit ~ '${this.search.value}' ORDER BY created_at  DESC limit ${this.page.pageSize} OFFSET ${this.page.current}`
      api.getSqlJsonAPI(sql).then((res) => {
        res.data.forEach((element) => {
          element.created_at = element.created_at.slice(0, 10)
          if (element.estimated_time) {
            element.estimated_time = element.estimated_time.slice(0, 10)
          }
        })
        this.data = res.data
        this.loading = false
      })

      let sqlCount = `SELECT COUNT(*) FROM guixi_form_1_149 where department ~ '${this.search.value}' or  category ~ '${this.search.value}' or project ~ '${this.search.value}' or  unit ~ '${this.search.value}' ; `
      api.getSqlJsonAPI(sqlCount).then((res) => {
        this.page.total = res.data[0].count
      })
    },
    onSearchTitle(title) {
      this.loading = true
      let sql = `select * from guixi_form_1_149  where ${this.searchTitle.key} ~ '${this.searchTitle.value}' ORDER BY created_at  DESC limit ${this.page.pageSize} OFFSET ${this.page.current}`
      api.getSqlJsonAPI(sql).then((res) => {
        res.data.forEach((element) => {
          element.created_at = element.created_at.slice(0, 10)
          if (element.estimated_time) {
            element.estimated_time = element.estimated_time.slice(0, 10)
          }
        })
        this.data = res.data
        this.loading = false
      })

      let sqlCount = `SELECT COUNT(*) FROM guixi_form_1_149 where ${this.searchTitle.key} ~ '${this.searchTitle.value}'; `
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
      let sqlCount = `SELECT * FROM guixi_form_1_149; `
      api.getSqlJsonAPI(sqlCount).then((res) => {
        res.data.forEach((element) => {
          element.created_at = element.created_at.slice(0, 10)
          if (element.estimated_time) {
            element.estimated_time = element.estimated_time.slice(0, 10)
          }
        })
        this.$refs.table.data = res.data
        this.$refs.table.exportCsv({
          filename: '桂溪街道数据统计',
          quoted: true,
        })
        this.onSearch()
      })
    },
  },
}
</script>
<style lang="scss">
.detail_content {
  width: 100%;
  margin: 0px auto;

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
    height: 46px;
    line-height: 46px;
  }

  .ivu-table-row {
    height: 46px;
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

  .popup {
    margin: 30px auto;
    width: 87%;
    position: relative;
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

  .van-pagination__next,
  .van-pagination__prev {
    max-width: 6.25rem;
  }
  .van-cell {
    border-bottom: 1px solid #ebedf0;
  }

  .popup-header {
    line-height: 52px;
    font-size: 16px;
    font-weight: 600;
    height: 52px;
    border-bottom: 1px solid #ebedf0;
  }
  .popup-footer {
    line-height: 52px;
    font-size: 16px;
    font-weight: 600;
    background: #1989fa;
    position: fixed;
    bottom: 0;
    width: 100%;
    color: #fff;
    height: 52px;
  }

  .detail-select {
    margin: 30px auto 10px;
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
