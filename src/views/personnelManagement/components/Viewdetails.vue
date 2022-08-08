<template>
  <el-dialog
    title="人员详情"
    :visible="Visible"
    width="48%"
    class="dialog-user"
    :before-close="handleClose"
  >
    <!-- 人员信息 -->
    <div class="userMessage">
      <span>人员名称：{{details.userName}}</span>
      <span>角色：{{details.roleName}}</span>
      <span>联系电话:{{details.mobile}}</span>
      <span>负责区域：{{details.regionName}}</span>
    </div>
    <!-- 表格 -->
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="" width="180">
        </el-table-column>
        <el-table-column prop="name" label="总工单数" width="180">
        </el-table-column>
        <el-table-column prop="address" label="拒绝工单"> </el-table-column>
        <el-table-column prop="address" label="完成工单"> </el-table-column>
        <el-table-column prop="address" label="进行中工单"> </el-table-column>
      </el-table>
    </template>
  </el-dialog>
</template>
<script>
export default {
  name: 'Viewdetails',
  data() {
    return {
      tableData: [
        {
          date: '本周',
          name: '王小虎',
          address: '1'
        },
        {
          date: '本月',
          name: '王小虎',
          address: '2'
        },
        {
          date: '本年',
          name: '王小虎',
          address: '3'
        }
      ]
    }
  },
  props: {
    Visible: {
      type: Boolean,
      required: true
    },
    details:{
        type:Object,
        required: true
    }
  },
  methods: {
    handleClose() {
    this.$emit('closeFn')
    }
  }
}
</script>
<style scoped lang="scss">
.dialog-user {
  padding: 10px;
  .userMessage {
    width: 100%;
    height: 70px;
    background-color: #f3f6fb;
    border-radius: 5px;
    padding: 19px 19px 0;
      margin-bottom: 20px;
    span {
      display: inline-block;
      height: 24px;
      margin: 0 19px;
    }
  }
}
</style>
