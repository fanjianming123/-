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
      <!-- 工单配置 -->
      <el-button class="importBtn" @click="dialogVisibleTwo = true">
        工单配置
      </el-button>
      <el-dialog
        title="工单配置"
        :visible.sync="dialogVisibleTwo"
        width="30%"
        class="dialog-title"
      >
        <el-form
          ref="form"
          :model="form"
          :rules="formRules"
          label-width="100px"
        >
          <el-form-item label="补货警戒线:" prop="num">
            <el-input-number
              v-model="form.num"
              controls-position="right"
              :min="1"
              :max="10"
              @change="handleChange"
            ></el-input-number>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleTwo = false">取 消</el-button>
          <el-button type="primary" @click="onSave">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 工单配置 -->
      <!-- 列表 -->
      <workTable ref="workPaging" @paging="pagingFn"></workTable>
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
    <!-- 新建弹窗 -->
    <addWorkList :visible.sync="dialogVisible" ref="addWork"></addWorkList>
  </div>
</template>

<script>
import searchTop from './components/searchTopa.vue'
import workTable from './components/workTable.vue'
import addWorkList from './components/addWorkList.vue'
import { getSupplyAlertValue } from '@/api/workOrder'
export default {
  name: 'Operating',
  data() {
    return {
      searchItem: {
        firstItem: '工单编号: ',
        secondItem: '工单状态: ',
        isSelect: true,
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
      dialogVisible: false, //弹窗
      dialogVisibleTwo: false, //工单配置
      form: {
        num: 1
      },
      formRules: {
        num: [{ required: true }]
      }
    }
  },

  created() {},

  methods: {
    searchGoods(val) {
      const user = val.user
      const region = val.region
      this.$refs.workPaging.getWorkOrderList(user, region)
    },
    //分页
    pagingFn(val) {
      this.paging = val
    },
    // 上一页
    PreviousPage() {
      this.$refs.workPaging.pageIndexjianjian()
      this.$refs.workPaging.getWorkOrderList()
    },
    //下一页
    nextPage() {
      this.$refs.workPaging.pageIndexjiajia()
      this.$refs.workPaging.getWorkOrderList()
    },
    newGoods() {
      this.dialogVisible = true
      // this.$refs.addWork.createRepair()
    },
    async onSave() {
      await getSupplyAlertValue()
      this.dialogVisibleTwo = false
      // console.log(res.data)
      // this.form = res.data
    },
    handleChange(val) {
      this.form.num = val
    }
  },
  components: {
    searchTop,
    workTable,
    addWorkList
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
  //工单配置
  ::v-deep .el-dialog {
    width: 630px;
    border-radius: 10px;
    .el-input-number {
      width: 370px;
    }
  }
}
</style>
