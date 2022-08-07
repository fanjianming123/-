<template>
  <div class="management">
    <!-- 头部搜索 -->
    <div class="top">
      <span>人员搜索:</span>
      <el-input
        v-model.trim="valueName"
        placeholder="请输入"
        style="width: 200px"
        clearable
      ></el-input>
      <span>角色:</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <i class="ibutt"></i>
      <el-button type="primary" icon="el-icon-search" @click="searchPresonnel"
        >查询</el-button
      >
    </div>
    <!-- 表单内容 -->
    <div class="bottom">
      <Table
        :NavList="NavList"
        v-bind.sync="currentObj"
        @changePage="changePage"
        :isShow="false"
        :isShowNew="false"
      >
        <el-table-column label="操作" min-width="200">
          <template slot-scope="scope">
            <el-button @click="lookMessage(scope.row)" type="text" size="small"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </Table>
    </div>
    <!-- 弹出层 -->
    <Viewdetails
      :Visible="Visible"
      @closeFn="closeFn"
      :details="details"
    ></Viewdetails>
  </div>
</template>

<script>
import Viewdetails from './components/Viewdetails'
import Table from "./components/Table"
import {
  GetWorkloadApi,
  getuserMessageApi,
  WorkOrderStatisticsApi
} from '@/api/personnel'
export default {
  name: 'WorkList',
  components: { Viewdetails,Table },
  data() {
    return {
      valueName: '',
      currentObj: {}, //
      baseparams: {
        pageIndex: 1,
        pageSize: 10
      },
      NavList: [
        { label: '人员名称', value: 'userName' },
        { label: '角色', value: 'roleName' },
        { label: '联系电话', value: 'mobile' },
        { label: '完成工单（本月）', value: 'workCount' },
        { label: '进行中工单', value: 'progressTotal' },
        { label: '拒绝工单（本月）', value: 'cancelCount' }
      ],
      options: [
        {
          value: 'false',
          label: '运营员'
        },
        {
          value: 'true',
          label: '维修员'
        }
      ],
      value: '',
      Visible: false, //弹层显示
      details: {},
      start: '2020-10-01'+'00:00:00'
    }
  },

  created() {
    this.GetWorkload(this.baseparams)
  },
  beforeUpdate() {
    this.currentObj.pageSize = +this.currentObj.pageSize
    this.currentObj.pageIndex = +this.currentObj.pageIndex
  },
  methods: {
    //获取工作量列表
    async GetWorkload(params) {
      const res = await GetWorkloadApi(params)
      this.currentObj = res.data
      // console.log(this.currentObj)
    },
    //分页change事件
    changePage() {
      const params = {
        pageIndex: this.currentObj.pageIndex,
        pageSize: this.currentObj.pageSize
      }
      this.GetWorkload(params)
    },
    //搜索
    searchPresonnel() {
      const params = {
        userName: this.valueName,
        isRepair: this.value
      }
      this.GetWorkload(params)
    },
    //弹层内部关闭
    closeFn() {
      this.Visible = false
    },
    //查看详情
    async lookMessage(val) {
      this.Visible = true
      // 获取当前用户基本信息
      const res = await getuserMessageApi(val.userId)
      this.details = res.data
      console.log(this.details)
      //获取工单统计
      //周
      const weeks={
        start: this.start.replace('+','2B%'),
        end:'2020-10-08'+'00:00:00'.replace
      }
      const Week = await WorkOrderStatisticsApi(weeks)
      console.log(Week)
      //月
      const months={
        start: this.start,
        end:'2020-11-01'+'00:00:00'
      }
      const month = await WorkOrderStatisticsApi(months)
      console.log(month)
      //年
      const years={
        start: this.start,
        end:'2021-10-01'+'00:00:00'
      }
      const year = await WorkOrderStatisticsApi(years)
      console.log(year)
    }
  }
}
</script>

<style scoped lang="scss">
.management {
  min-height: 1350px;
  background-color: #f8fafd;
  padding: 10px 12px 0;
  .top {
    height: 60px;
    background-color: #fff;
    display: flex;
    align-items: center;
    span {
      margin-right: 10px;
      margin-left: 10px;
    }
    .ibutt {
      margin: 0 5px;
    }
  }
  .bottom {
    height: 840px;
    margin-top: 20px;
    background-color: #fff;
  }
}
</style>
