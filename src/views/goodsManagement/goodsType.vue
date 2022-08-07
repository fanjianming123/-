<template>
  <div>
    <searchTop :searchItem="searchItem" @searchForm="searchGoods"></searchTop>
    <el-card class="box-card">
      <el-button icon="el-icon-circle-plus-outline" class="elBtn">
        新建
      </el-button>
      <goodsTable ref="search"></goodsTable>
    </el-card>
  </div>
</template>

<script>
import goodsTable from './components/goodsTable.vue'
import searchTop from '@/components/search/searchTop.vue'
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
      }
    }
  },

  created() {},
  components: {
    searchTop,
    goodsTable
  },
  methods: {
    searchGoods(val) {
      this.$refs.search.getGoodsList(val.user)
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
