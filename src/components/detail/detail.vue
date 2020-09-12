<template>
  <div class="detail_content">
    <header class="header">
      <!-- 筛选条件： -->
      <select class="select" v-model="search.type">
        <option :key="option.key" :value="option.key" class="option" v-for="option in columns">{{
          option.title
        }}</option>
      </select>
      <van-search class="search" shape="round" v-model="search.value" placeholder="请输入搜索关键词" @blur="onSearch" />
    </header>

    <Table
      ref="table"
      border
      stripe
      height="900"
      @on-row-click="rowClick"
      :columns="columns"
      :data="data"
      :loading="loading"
    ></Table>
    <Page
      :total="page.total"
      :page-size="page.pageSize"
      @on-change="currentChange"
      @on-page-size-change="pageSizeChange"
      show-sizer
      show-total
      class-name="page"
    />
    <div class="export" @click="exportData" type="info">导出数据</div>

    <!-- 弹框 -->
    <van-popup v-model="show" round closeable close-icon="close" :style="{ height: '80%', width: '90%' }">
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
        <div v-for="item in visitObj" :key="item.id">
          <div v-for="visit in showVisitArr" :key="visit.id">
            <p v-if="visit.identity_key === 'return_remark'">
              <van-field readonly type="textarea" autosize :label="visit.title" :value="item[visit.identity_key]" />
            </p>
            <p v-else>
              <van-field readonly autosize :label="visit.title" :value="item[visit.identity_key]" />
            </p>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import api from '@/api/api'

export default {
  data() {
    return {
      show: false,
      showArr: [],
      showObj: {},
      visitObj: [],
      showVisitArr: [],
      columns: [
        {
          title: '置业顾问',
          key: 'saler',
          fixed: 'left',
          width: '100',
          resizable: true,
        },
        {
          title: '客户姓名',
          key: 'name',
          width: '150',
          resizable: true,
        },
        {
          title: '客户电话',
          key: 'phone',
          width: '150',
          resizable: true,
        },
        {
          title: '性别',
          key: 'gender',
          width: '150',
          resizable: true,
        },
        {
          title: '客户描摹',
          key: 'depict',
          width: '150',
          resizable: true,
        },
        {
          title: '信息来源',
          key: 'source',
          width: '150',
          resizable: true,
        },
        {
          title: '年龄',
          key: 'age',
          width: '150',
          resizable: true,
        },
        {
          title: '来访渠道',
          key: 'pathway',
          width: '150',
          resizable: true,
        },
        {
          title: '客户意向',
          key: 'intention',
          width: '150',
          resizable: true,
        },
        {
          title: '是否排卡',
          key: 'send_card',
          width: '150',
          resizable: true,
        },
        {
          title: '置业目的',
          key: 'motivation',
          width: '150',
          resizable: true,
        },
        {
          title: '意向价格',
          key: 'price',
          width: '150',
          resizable: true,
        },
        {
          title: '付款方式',
          key: 'payment',
          width: '150',
          resizable: true,
        },
        {
          title: '有无购房资格',
          key: 'entitlement',
          width: '150',
          resizable: true,
        },
        {
          title: '购房资格备注',
          key: 'reason',
          width: '150',
          resizable: true,
        },
        {
          title: '客户主要抗性',
          key: 'resistance',
          width: '150',
          resizable: true,
        },
        {
          title: '喜好户型',
          key: 'house_type',
          width: '150',
          resizable: true,
        },
        {
          title: '居住区域',
          key: 'living_area',
          width: '150',
          resizable: true,
        },
        {
          title: '工作区域',
          key: 'working_area',
          width: '150',
          resizable: true,
        },
        {
          title: '预计来访时间',
          key: 'estimated_time',
          width: '150',
          resizable: true,
        },
        {
          title: '填写时间',
          key: 'created_at',
          width: '150',
          resizable: true,
        },
      ],
      data: [],
      page: {
        pageSize: 18,
        total: 0,
        current: 0,
      },
      loading: true,
      search: {
        value: '',
        type: 'saler',
      },
      tableID: 13,
      visitID: 18,
      showPhone: true,
    }
  },
  mounted() {
    const permission = localStorage.getItem('user_permission')
    if (permission.indexOf('销售总监') === -1 && permission.indexOf('权证')) {
      this.showPhone = false
      this.columns = [
        {
          title: '置业顾问',
          key: 'saler',
          fixed: 'left',
          width: '100',
          resizable: true,
        },
        {
          title: '客户姓名',
          key: 'name',
          width: '150',
          resizable: true,
        },
        {
          title: '性别',
          key: 'gender',
          width: '150',
          resizable: true,
        },
        {
          title: '客户描摹',
          key: 'depict',
          width: '150',
          resizable: true,
        },
        {
          title: '信息来源',
          key: 'source',
          width: '150',
          resizable: true,
        },
        {
          title: '年龄',
          key: 'age',
          width: '150',
          resizable: true,
        },
        {
          title: '来访渠道',
          key: 'pathway',
          width: '150',
          resizable: true,
        },
        {
          title: '客户意向',
          key: 'intention',
          width: '150',
          resizable: true,
        },
        {
          title: '是否排卡',
          key: 'send_card',
          width: '150',
          resizable: true,
        },
        {
          title: '置业目的',
          key: 'motivation',
          width: '150',
          resizable: true,
        },
        {
          title: '意向价格',
          key: 'price',
          width: '150',
          resizable: true,
        },
        {
          title: '付款方式',
          key: 'payment',
          width: '150',
          resizable: true,
        },
        {
          title: '有无购房资格',
          key: 'entitlement',
          width: '150',
          resizable: true,
        },
        {
          title: '购房资格备注',
          key: 'reason',
          width: '150',
          resizable: true,
        },
        {
          title: '客户主要抗性',
          key: 'resistance',
          width: '150',
          resizable: true,
        },
        {
          title: '喜好户型',
          key: 'house_type',
          width: '150',
          resizable: true,
        },
        {
          title: '居住区域',
          key: 'living_area',
          width: '150',
          resizable: true,
        },
        {
          title: '工作区域',
          key: 'working_area',
          width: '150',
          resizable: true,
        },
        {
          title: '预计来访时间',
          key: 'estimated_time',
          width: '150',
          resizable: true,
        },
        {
          title: '填写时间',
          key: 'created_at',
          width: '150',
          resizable: true,
        },
      ]
    }

    this.getPageData()
    let sqlCount = `SELECT COUNT(*) FROM fdc_form_1_13;`
    api.getSqlJsonAPI(sqlCount).then((res) => {
      this.page.total = res.data[0].count
    })
    api.getFormAPI(this.tableID).then((res) => {
      this.showArr = res.data.fields
      api.getFormAPI(this.visitID).then((res) => {
        this.showVisitArr = res.data.fields.slice(4)
        this.showVisitArr.unshift({
          identity_key: 'created_at',
          title: '回访时间',
        })
      })
    })
  },
  methods: {
    getPageData() {
      this.loading = true
      let sql = `select * from fdc_form_1_13  ORDER BY created_at DESC limit ${this.page.pageSize} OFFSET ${this.page.current}`
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
    currentChange(current) {
      this.page.current = this.page.pageSize * (current - 1)
      this.onSearch()
    },
    pageSizeChange(pageSize) {
      this.page.pageSize = pageSize
      this.onSearch()
    },
    onSearch() {
      this.loading = true
      let sql = `select * from fdc_form_1_13  where ${this.search.type} ~ '${this.search.value}' ORDER BY created_at  DESC limit ${this.page.pageSize} OFFSET ${this.page.current}`
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

      let sqlCount = `SELECT COUNT(*) FROM fdc_form_1_13 where ${this.search.type} ~ '${this.search.value}'; `
      api.getSqlJsonAPI(sqlCount).then((res) => {
        this.page.total = res.data[0].count
      })
    },
    rowClick(row, column, data, event) {
      this.show = true
      this.showObj = row
      let phone = row.phone
      let sqlPhone = `SELECT * FROM fdc_form_1_18 where customer_phone = '${phone}';`
      api.getSqlJsonAPI(sqlPhone).then((res) => {
        let data = res.data
        for (let i = 0; i < data.length; i++) {
          data[i].created_at = data[i].created_at.slice(0, 10)
        }
        this.visitObj = data
      })
    },
    exportData() {
      let sqlCount = `SELECT * FROM fdc_form_1_13; `
      api.getSqlJsonAPI(sqlCount).then((res) => {
        res.data.forEach((element) => {
          element.created_at = element.created_at.slice(0, 10)
          if (element.estimated_time) {
            element.estimated_time = element.estimated_time.slice(0, 10)
          }
        })
        this.$refs.table.data = res.data
        this.$refs.table.exportCsv({
          filename: '客户明细',
          quoted: true,
        })
      })
    },
  },
}
</script>
<style lang="scss">
.detail_content {
  margin: 0px auto;

  .header {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    width: 90vw;
    margin: 0 auto;

    .select {
      width: 150px;
      display: inline-block;
      height: 28px;
      margin: 14px 0px;
    }
    .search {
      width: 200px;
    }
  }

  .ivu-table td,
  .ivu-table th {
    text-align: center;
  }
  .ivu-table th {
    color: #000;
    font-weight: 600;
  }
  .ivu-table-cell {
    height: 48px;
    line-height: 48px;
  }

  .ivu-table-row {
    height: 48px;
  }

  .ivu-table td,
  .ivu-table th {
    height: 48px;
  }

  .page {
    margin-top: 20px;
  }

  .popup {
    margin: 30px auto;
    width: 77%;
  }

  .van-field__label {
    width: 7rem;
  }
  .export {
    background: #1989fa;
    width: 100px;
    height: 37px;
    line-height: 37px;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    margin: 10px auto;
    border-radius: 7px;
  }
}
</style>
