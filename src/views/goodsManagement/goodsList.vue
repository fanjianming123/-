<template>
  <div>
    <searchTop :searchItem="searchItem" @searchForm="searchGoods"></searchTop>
    <el-card class="box-card">
      <el-button
        icon="el-icon-circle-plus-outline"
        class="elBtn"
        @click="newGoods"
      >
        新建
      </el-button>
      <el-button class="importBtn"> 导入数据 </el-button>
      <goodsListTable ref="goodsSearch" @paging="pagingFn"></goodsListTable>
      <!-- 分页 -->
      <div class="paging">
        <div>
          共<span>{{ paging.totalCount }}</span
          >条记录 第<span>{{ paging.pageIndex }}</span
          >/<span>{{ paging.totalPage }}</span
          >页
        </div>
        <div class="pagingBtn">
          <el-button
            @click="PreviousPage"
            :disabled="paging.pageIndex <= 1 ? true : false"
            >上一页</el-button
          >
          <el-button
            :disabled="paging.pageIndex === paging.totalPage ? true : false"
            @click="nextPage"
            >下一页</el-button
          >
        </div>
      </div>
    </el-card>
    <!-- 弹窗 -->
    <addGoodsList
      :visible.sync="dialogVisible"
      ref="addgoods"
      @addGoods="addGoods"
    ></addGoodsList>
  </div>
</template>

<script>
import searchTop from './components/searchTop.vue'
import goodsListTable from './components/goodsListTable.vue'
import addGoodsList from './components/addGoodsList.vue'
export default {
  data() {
    return {
      searchItem: {
        firstItem: '商品搜索: ',
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
      paging: {}, //分页数据
      dialogVisible: false //弹窗
    }
  },

  created() {},

  methods: {
    //搜索
    searchGoods(val) {
      this.$refs.goodsSearch.getGoodsSearch(val.user)
    },
    //分页
    pagingFn(val) {
      this.paging = val
      // console.log(this.paging)
    },
    // 上一页
    PreviousPage() {
      this.$refs.goodsSearch.pageIndexjianjian()
      this.$refs.goodsSearch.getGoodsSearch()
    },
    //下一页
    nextPage() {
      this.$refs.goodsSearch.pageIndexjiajia()
      this.$refs.goodsSearch.getGoodsSearch()
    },
    newGoods() {
      this.dialogVisible = true
      this.$refs.addgoods.getGoodsList()
    },
    addGoods() {
      this.$refs.goodsSearch.getGoodsSearch()
    }
  },
  components: {
    searchTop,
    goodsListTable,
    addGoodsList
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
  .importBtn {
    background-color: #fbf4f0;
    color: #655b56;
    border: none;
  }
  //  分页
  .paging {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 50px 0 50px 50px;
    color: #dbdfe5;
    font-size: 16px;
    .pagingBtn {
      display: flex;
      margin-right: 60px;
    }
  }
}
</style>
