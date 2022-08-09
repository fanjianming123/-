<template>
  <el-table :data="tableData" stripe style="width: 98%; margin: auto">
    <el-table-column type="index" :label="goodsListTitle.index" width="100">
    </el-table-column>
    <el-table-column
      prop="brandName"
      :label="goodsListTitle.brandName"
      width="180"
    >
    </el-table-column>
    <el-table-column :label="goodsListTitle.skuImage" width="180">
      <template slot-scope="scope">
        <img :src="scope.row.skuImage" class="img" alt="" />
      </template>
    </el-table-column>
    <el-table-column prop="skuName" :label="goodsListTitle.skuName" width="180">
    </el-table-column>
    <el-table-column prop="unit" :label="goodsListTitle.unit" width="180">
    </el-table-column>
    <el-table-column prop="price" :label="goodsListTitle.price" width="180">
    </el-table-column>
    <el-table-column
      prop="skuClass.className"
      :label="goodsListTitle.className"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="createTime"
      :label="goodsListTitle.createTime"
      width="180"
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
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getGoodsSearch } from '@/api/goods'
export default {
  name: 'GoodsTable',
  data() {
    return {
      goodsListTitle: {
        index: '序号',
        brandName: '商品名称',
        skuImage: '商品图片',
        skuName: '品牌',
        unit: '规格',
        price: '商品价格',
        className: '商品类型',
        createTime: '创建日期',
        operation: '操作'
      },
      tableData: [],
      pageIndex: 1
    }
  },
  methods: {
    // 获取商品类型
    async getGoodsSearch(val) {
      const res = await getGoodsSearch({
        skuName: val,
        pageIndex: this.pageIndex
      })
      this.$emit('paging', res.data)
      // console.log(res.data)
      this.tableData = res.data.currentPageRecords
    },

    pageIndexjiajia() {
      this.pageIndex++
    },
    pageIndexjianjian() {
      this.pageIndex--
    }
  },
  created() {
    this.getGoodsSearch()
  }
}
</script>

<style scoped>
.img {
  width: 26px;
  height: 26px;
}
</style>
