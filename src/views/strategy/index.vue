<!-- 策略 -->
<template>
  <div class="main-page">
    <!-- 头部 -->
    <div class="WorkOrder">
      <el-form
        :inline="true"
        size="medium"
        :model="searchFrom"
        label-width="82px"
        class="demo-form-inline"
      >
        <el-form-item>
          <template slot="label">
            <span class="label-text"> 策略搜索： </span>
          </template>
          <el-input
            v-model="searchFrom.policyName"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="item-btn"
            icon="el-icon-search"
            @click="onSubmit"
            style="font-size: 14px"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <body v-loading="loading">
      <div class="body-btn">
        <lsButton
          icon="el-icon-circle-plus-outline"
          color="addBtn"
          title="新建"
          @click="addBtn"
        />
      </div>
      <!-- 表格 -->
      <div class="Strategy-main">
        <el-table
          :data="tableData"
          style="width: 100%"
          :lazy="true"
          empty-text="暂无数据"
          type="index"
          highlight-current-row
        >
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 这个我先跟你说 slot-scope已经outt了 现在都用v-slot  -->
              <el-button type="text" @click="seeDetails(scope.row)"
                >查看详情</el-button
              >
              <el-button type="text" @click="handleEdit(scope.row)"
                >修改</el-button
              >
              <el-button
                type="text"
                style="color: red"
                @click="clickremoverePolicy()"
                >删除</el-button
              >
            </template>
          </el-table-column>
          <tableColumn title="序号" type="index" :pag="Pag.pageIndex" />
          <tableColumn title="策略名称" label="policyName" />
          <tableColumn title="策略方案" label="discount" />
          <tableColumn title="创建日期" label="createTime" />
        </el-table>
        <div v-if="judgepage" class="dataBtn">
          <div class="Data">
            共{{ Pag.totalCount }}记录 第{{ Pag.pageIndex }}/{{
              Pag.totalPage
            }}页
          </div>
          <lsButton
            ref="btn"
            title="上一页"
            :disable="disable"
            color="pag"
            @click="PreviousPage"
          />
          <lsButton
            title="下一页"
            :disable="disable1"
            color="pag"
            @click="NextPage"
          />
        </div>
      </div>
    </body>
    <Addapolicy
      ref="Addapolicy"
      :visible.sync="visible"
      @refresh="PolicySearch"
    />
    <TacticsDetails
      :visible.sync="dialogTableVisible"
      :policyName="policyName"
      ref="child"
    ></TacticsDetails>
  </div>
</template>

<script>
import lsButton from '@/components/ls-button'
import tableColumn from '@/components/tablecolumn'
import { getPolicySearch, removerePolicy } from '@/api/strategy'
import moment from 'moment' // 处理时间
import Addapolicy from './components/Addapolicy.vue'
import TacticsDetails from './components/TacticsDetails'
export default {
  components: {
    lsButton,
    tableColumn,
    Addapolicy,
    TacticsDetails
  },
  data() {
    return {
      searchFrom: {
        policyName: '',
        pageIndex: 1
      },
      policyName: '',
      policyNameList: [],
      moment,
      WorkOrderList: [],
      Pag: '', // 分页数据
      tableData: [], // 表格数据
      disable: true,
      disable1: false, // 页脚禁用
      loading: false, // 加载
      visible: false, // 弹出层
      row: {}, // 当前项
      dialogTableVisible: false, //
      policyId: ''
    }
  },
  computed: {
    judgepage() {
      if (this.Pag.totalCount > 10) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.PolicySearch()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  methods: {
    // 策略
    async PolicySearch() {
      this.loading = true
      try {
        const { data } = await getPolicySearch(this.searchFrom)
        const workList = await this.ProcessingWorkOrderStatus(
          data.currentPageRecords
        )
        this.tableData = workList
        this.Pag = data
      } catch (error) {
        console.dir(error)
      } finally {
        this.loading = false
      }
    },
    // 策略搜索
    onSubmit() {
      this.PolicySearch()
    },
    // 删除策略
    async clickremoverePolicy(row) {
      console.log(row)
      this.policyId = row ? row.policyId : this.policyId
      try {
        await removerePolicy(this.policyId)
        this.PolicySearch()
      } catch (error) {
        console.dir(error)
      }
      this.$message({
        message: '演示系统，不支持此操作',
        type: 'warning'
      })
    },
    // 修改
    handleEdit(row) {
      this.$refs.Addapolicy.getDetail(row)
      this.visible = true
    },
    // 添加
    addBtn(row) {
      this.visible = true
    },
    // 上一页
    NextPage() {
      if (this.searchFrom.pageIndex < this.Pag.totalPage) {
        this.searchFrom.pageIndex++
        this.disable = false
        return this.PolicySearch()
      }
      this.disable1 = true
    },
    // 下一页
    PreviousPage() {
      if (this.searchFrom.pageIndex > 1) {
        this.searchFrom.pageIndex--
        return this.PolicySearch()
      }
      this.disable = true
    },
    // 处理工单状态
    ProcessingWorkOrderStatus(data) {
      data.forEach((ele) => {
        ele.createTime = this.moment(ele.createTime)
          .utcOffset(8)
          .format('YYYY.MM.DD HH:mm:ss')
      })
      return data
    },
    // 查看详情弹框
    seeDetails(row) {
      // console.log(row);
      this.dialogTableVisible = true
      this.$refs.child.clickSearchPolicy(row) // 这行我没懂 请求数据在哪
      this.policyName = row.policyName
      // 把table渲染的那个策略社么的对应的传过去不就好了，传啊
      // this.tableData.forEach((item) => {
      //   return this.policyNameList.push(item.policyName)
      // })
      console.log(this.policyName)
    }
  }
}
</script>
<style scoped lang="scss">
.main-page {
  padding: 20px;
  //  头部
  .WorkOrder {
    width: 100%;
    height: 60px;
    background-color: #fff;
    display: flex;
    padding: 10px 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    .label-text {
      font-weight: 400;
    }
    .item-btn {
      background-color: rgb(95, 132, 255);
      border-color: rgb(95, 132, 255);
      height: 36px;
      width: 80px;
      font-size: 16px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .title-from {
      display: flex;
    }
    // .el-form-item{
    //   margin-bottom: 10px;
    // }
    .el-input {
      width: 100% !important;
    }
  }
  body {
    background-color: #fff;
    padding: 20px 15px 19px 17px;
    .body-btn {
      margin-bottom: 20px;
      :deep(.search) {
        margin: 0;
      }
    }
  }
  // 页码
  .dataBtn {
    display: flex;
    margin-bottom: 30px;
    margin-top: 30px;
    align-items: center;
    margin-right: 30px;
    .Data {
      width: 100%;
      height: 40px;
      background-color: #fff;
      line-height: 40px;
      // line-height: 100px;
      padding-left: 30px;
      color: #dbdfe5;
    }
  }
  .ViewDetails {
    color: #409eff;
    font-style: normal;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .form-group {
    width: 100%;
  }
  .BackOrder {
    color: #4368e1;
    cursor: pointer;
  }
  //按钮
  .addWorkBtn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
