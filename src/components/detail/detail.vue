<template>
  <div class="detail_content">
    <div class="detail_content_header">
      <span class="detail_content_title">{{ departmentName }}</span>
      <div class="detail-select">
        <div class="select">
          <Select v-model="screenValue" style="width:120px" placeholder="请选择类别">
            <Option v-for="item in columnsTitle" :value="item.value" :key="item.value">{{
              item.label
            }}</Option>
          </Select>
        </div>
      </div>
    </div>

    <!-- 筛选条件： -->

    <!-- :disabled-hover="disabledHover" -->
    <div class="table">
      <Table
        resizable
        :span-method="handleSpan"
        :ellipsis="ellipsis"
        border
        height="700"
        @on-row-click="rowClick"
        :columns="columns"
        :data="data"
        :loading="loading"
        stripe
      ></Table>
      <!-- 用于数据导出 -->

      <div class="title">共 {{ total }} 条数据</div>
    </div>

    <!-- 弹框 -->
    <van-popup
      class="popup"
      v-model="show"
      round
      close-icon="close"
      :style="{ height: '80%', width: '90%' }"
    >
      <div>
        <header class="popup-header">汇总数据详情</header>
        <div class="popup-item">
          <div v-for="item in showArr" :key="item.id">
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
      disabledHover: true,
      tableShow: false,
      ellipsis: true,
      show: false,
      showArr: [],
      showObj: {},
      columns: [],
      columnsTitle: [],
      data: [],
      loading: true,
      total: 0,
      tableID: '',
      screenValue: '',
      showPhone: true,
      departmentName: '',
      categoryArray: [], // 所有类别的数量
      first: '', // 排序第一类别
      formID: 290,
      field_id: 0,
    }
  },
  watch: {
    screenValue(newValue, oldValue) {
      this.screenData(newValue)

      this.loading = false
    },
  },
  mounted() {
    document.title = '汇总数据'
    this.departmentName = this.$route.query.name
    this.getFormRecord(this.formID, 9126, this.departmentName)
  },
  methods: {
    async getFormRecord(formID, id, value) {
      const params = {}
      params[`query[${id}]`] = value
      const { data } = await api.getFormRecord(formID, params)
      this.tableID = data[0].mapped_values.table_id.value[0]
      // 获取类别
      this.setColumnsTitle(this.tableID)
      api.getFormAPI(this.tableID).then((res) => {
        // 创建表头
        this.columns = total.createdTableHeaders(res.data.fields)
      })
      await api.getFormAPI(this.tableID).then((res) => {
        this.showArr = res.data.fields
        res.data.fields.forEach((res) => {
          if (res.identity_key === 'category') {
            this.field_id = res.id
          }
        })
      })
      await this.getPageData(this.tableID)
    },

    async setColumnsTitle(formID, id, value) {
      const params = {}
      params[`query[${id}]`] = value
      const { data } = await api.getFormRecord(formID, params)
      this.columnsTitle = total.getColumnsTitle(data)
      // 分组计数
      let arr = []
      this.columnsTitle.forEach((column, index) => {
        let num = 1
        data.forEach((res) => {
          if (res.mapped_values.category.value[0] === column.value) {
            arr[index] = {}
            arr[index].count = num++
          }
        })
      })
      this.categoryArray = arr
      this.loading = false
    },
    // 合并单元格
    handleSpan({ row, column, rowIndex, columnIndex }) {
      // 第一次合并的行数量
      // 15
      if (columnIndex === 0) {
        const arr = this.categoryArray
        let len = arr.length
        let sum = 0
        let sign = 0
        let res = 0
        for (let x = 0; x < len; x++) {
          res = arr[x].count
          if (rowIndex === sum && columnIndex === 0) {
            return [res, 1]
          }
          sign = sum
          sum = sum + res
          for (let index = sign; index < sum; index++) {
            if (rowIndex === index && columnIndex === 0) {
              return [0, 0]
            }
          }
          this.loading = false
        }
      }
    },
    async getPageData(formID) {
      const { data } = await api.getFormRecord(formID)
      this.data = total.setMappedValues(data)
      this.first = data[0].mapped_values.category.value[0]
      this.total = data.length
    },
    async screenData(value) {
      this.loading = true
      const params = {}
      params[`query[${this.field_id}]`] = value
      const { data } = await api.getFormRecord(this.tableID, params)

      this.data = total.setMappedValues(data)
      this.total = data.length
      this.loading = false
      this.categoryArray = [
        {
          count: data.length,
        },
      ]
    },
    rowClick(row, column, data, event) {
      this.show = true
      this.showObj = row
    },
    showPopup() {
      this.show = false
    },
  },
}
</script>
<style lang="scss" scoped>
.detail_content {
  width: 100%;
  margin: 0px auto;

  .detail_content_header {
    padding: 0 4px;
    display: flex;
    justify-content: space-around;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
    .detail_content_title {
      font-size: 20px;
      font-weight: 600;
      line-height: 60px;
    }
    .detail-select {
      text-align: left;
      line-height: 60px;
      .select {
        .select-rail {
          border: 2px solid #1989fa;
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

  /deep/ .table {
    .ivu-table .ivu-table-fixed-header th,
    .ivu-table .ivu-table-header th {
      height: 100%;
      line-height: 100%;
      display: table-cell;
    }
    .ivu-table th {
      color: #fff;
      background: #1989fa;
      font-weight: 600;
    }
    .ivu-table-cell {
      padding: 0px;
      line-height: 22px;
    }
    .ivu-table-row {
      height: 20px;
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
      text-align: center;
      height: 1.5rem;
      line-height: 1.5rem;
      display: table-cell;
    }
    .van-pagination__next,
    .van-pagination__prev {
      max-width: 6.25rem;
    }
    .van-cell {
      border-bottom: 1px solid #ebedf0;
    }
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
      /deep/ .van-cell {
        border-bottom: 1px solid #0000001a;
      }
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
}
</style>
