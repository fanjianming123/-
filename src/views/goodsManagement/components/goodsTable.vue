<template>
  <el-table :data="tableData" stripe style="width: 98%; margin: auto">
    <el-table-column type="index" :label="goodsListTitle.index" width="100">
    </el-table-column>
    <el-table-column
      prop="className"
      :label="goodsListTitle.goodsTypeName"
      width="1340"
    >
    </el-table-column>
    <el-table-column
      prop="address"
      :label="goodsListTitle.operation"
      width="180"
    >
      <el-button type="primary" size="small">修改</el-button>
      <el-button type="danger" size="small">删除</el-button>
    </el-table-column>
  </el-table>
</template>

<script>
import { getGoodsList } from '@/api/goods'
export default {
  data() {
    return {
      goodsListTitle: {
        index: '序号',
        goodsTypeName: '商品类型名称',
        operation: '操作'
      },
      tableData: []
    }
  },
  methods: {
    async getGoodsList(val) {
      console.log(val)
      const res = await getGoodsList({
        className: val
      })
      this.tableData = res.data.currentPageRecords
    }
  },
  created() {
    this.getGoodsList()
  }
}
</script>

<style scoped></style>
