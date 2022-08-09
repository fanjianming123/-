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
      <goodsTable
        ref="search"
        @editGoodsType="editGoodsType"
        @paging="pagingFn"
      ></goodsTable>
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
import searchTop from './components/searchTopa.vue'
import addGoods from './components/addGoods.vue'
export default {
  data() {
    return {
      searchItem: {
        firstItem: '商品类型搜索: ',
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
      editGoodsTypeVal: {}, //修改传值数据
      paging: {} //分页数据
    }
  },

  created() {},
  // updated() {
  //   if (this.paging.totalPage > 1) {
  //     this.disablednex = false
  //   }
  // },
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
      this.$refs.goods.formData.classId = val.classId
      this.dialogVisible = true
    },
    //分页
    pagingFn(val) {
      this.paging = val
    },

    // 上一页
    PreviousPage() {
      this.$refs.search.pageIndexjianjian()
      this.$refs.search.getGoodsList()
    },
    //下一页
    nextPage() {
      this.$refs.search.pageIndexjiajia()
      this.$refs.search.getGoodsList()
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
