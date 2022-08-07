<template>
  <div class="table">
    <el-card class="box-card" shadow="never">
      <!-- 表格部分 -->
      <div class="table-container">
        <el-table :data="currentPageRecords" style="width: 100%">
          <el-table-column label="序号" type="index" :index="num" width="80">
          </el-table-column>

          <el-table-column
            :prop="item.value"
            :label="item.label"
            v-for="item in NavList"
            :key="item.taskCode"
            :min-width="item.label === '创建日期' ? 200 : 120"
          >
          </el-table-column>
          <slot>

          </slot>
        </el-table>
      </div>
      <!-- 分页部分 -->
      <el-pagination
        :hide-on-single-page="false"
        class="el-pagination-container"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-size="+pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="+totalCount"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data() {
    return {}
  },
  props: {
    NavList: {
      type: Array, //表头数组
      required: true
    },

    currentPageRecords: {
      type: Array, //表格数据数组
      default: () => []
    },
    pageIndex: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    totalCount: {
      type: String,
      default: '0'
    },
    totalPage: {
      type: String,
      default: '0'
    }
  },

  updated() {
    // console.log(this.TaskSearch)
  },
  watch: {
    currentPageRecords: {
      immediate: true,
      handler() {
        this.currentPageRecords.forEach((item) => {
          item.createType = item.createType === 0 ? '自动' : '手动'
          item.createTime = item.createTime.replace('T', ' ')
          item.updateTime = item.updateTime.replace('T', ' ')
          if (item.status === 0) {
            item.status = '创建'
          } else if (item.status === 1) {
            item.status = '支付'
          } else if (item.status === 2) {
            item.status = '出货成功'
          } else {
            item.vmType = '出货失败'
          }
        })
      }
    }
  },
  computed: {
    num() {
      return (this.pageIndex - 1) * this.pageSize + 1
    }
  },

  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.$emit('update:pageSize', val)
      this.$emit('changePage')
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.$emit('update:pageIndex', val)
      this.$emit('changePage')
    }
  }
}
</script>

<style scoped lang="scss">
.table-container {
  margin: 0 20px 20px;
}
.el-pagination-container {
  margin: 20px 20px 40px;
}
</style>
