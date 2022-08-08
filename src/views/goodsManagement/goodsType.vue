<template>
  <div>
    <searchTop :searchItem="searchItem" @searchForm="searchGoods"></searchTop>
    <el-card class="box-card">
      <el-button
        icon="el-icon-circle-plus-outline"
        class="elBtn"
        @click="newGoodsType"
      >
        新建
      </el-button>
      <goodsTable ref="search" @editGoodsType="editGoodsType"></goodsTable>
    </el-card>
    <!-- 新增弹窗 -->
    <addGoods
      :visible.sync="dialogVisible"
      @addGoods="addGoodsFn"
      :editGoodsTypeVal="editGoodsTypeVal"
      ref="goods"
    ></addGoods>
  </div>
</template>

<script>
import goodsTable from './components/goodsTable.vue'
import searchTop from './components/searchTop.vue'
import addGoods from './components/addGoods.vue'
export default {
  data() {
    return {
      searchItem: {
        firstItem: '商品类型搜索',
        secondItem: '工单状态',
        isSelect: false,
        selectOption: [
          { label: '待办', value: '1' },
          { label: '进行', value: '2' },
          { label: '取消', value: '3' },
          { label: '完成', value: '4' }
        ],
        formInline: {
          user: '',
          region: ''
        }
      },
      dialogVisible: false,
      editGoodsTypeVal: {}
    }
  },

  created() {},
  components: {
    searchTop,
    goodsTable,
    addGoods
  },
  methods: {
    //搜索
    searchGoods(val) {
      this.$refs.search.getGoodsList(val.user)
    },
    //新建
    newGoodsType() {
      this.dialogVisible = true
    },
    // 新增子传父调用子接口
    addGoodsFn() {
      this.$refs.search.getGoodsList()
    },
    editGoodsType(val) {
      // console.log(val)
      this.editGoodsTypeVal = val
      this.$refs.goods.formData.text = val.className
      this.dialogVisible = true
      // console.log(this.editGoodsTypeVal)
    }
  }
}
</script>

<style scoped lang="scss">
.box-card {
  .elBtn {
    background-color: #ff893b;
    color: #fff;
    font-size: 14px;
  }
}
</style>
