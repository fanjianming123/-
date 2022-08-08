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
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="small"
          @click="$emit('editGoodsType', scope.row)"
          >修改</el-button
        >
        <el-button type="danger" size="small" @click="delGoodsType(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getGoodsList, delGoodsType } from '@/api/goods'
export default {
  name: 'GoodsTable',
  data() {
    return {
      goodsListTitle: {
        index: '序号',
        goodsTypeName: '商品类型名称',
        operation: '操作'
      },
      tableData: [],
      pageIndex: 1
    }
  },
  methods: {
    // 获取商品类型
    async getGoodsList(val) {
      const res = await getGoodsList({
        className: val,
        pageIndex: this.pageIndex
      })
      this.$emit('paging', res.data)
      this.tableData = res.data.currentPageRecords
    },
    // 删除商品类型
    async delGoodsType(val) {
      try {
        await this.$confirm('此操作将永久删除该商品类型, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
        delGoodsType(val.classId)
        this.$message.success('删除成功')
        this.getGoodsList()
      } catch (error) {}
    },
    pageIndexjiajia() {
      this.pageIndex++
    },
    pageIndexjianjian() {
      this.pageIndex--
    }
  },
  created() {
    this.getGoodsList()
  }
}
</script>

<style scoped></style>
