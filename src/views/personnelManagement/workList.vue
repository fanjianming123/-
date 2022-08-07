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
      <i class="ibutt"></i>
      <el-button type="primary" icon="el-icon-search">查询</el-button>
    </div>
    <!-- 表单内容 -->
    <div class="bottom">
      <dkd-table
        :NavList="NavList"
        @changePage="changePage"
        :isShow="false"
        :isShowNew="false"
      >
        <el-button type="text" size="small"> 修改 </el-button>
        <el-button style="color: red" type="text" size="small">
          删除
        </el-button>
      </dkd-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valueName: '',
      NavList: [
        { label: '人员名称', value: 'userName' },
        { label: '角色', value: 'regionName' },
        { label: '联系电话', value: 'role.roleName' },
        { label: '完成工单（本月）', value: 'mobile' },
        { label: '进行中工单', value: 'mobile' },
        { label: '拒绝工单（本月）', value: 'mobile' }
      ]
    }
  },

  created() {},

  methods: {}
}
</script>

<style scoped lang="scss">
.management {
  min-height: 1350px;
  background-color: #f8fafd;
  padding: 20px 12px 0;
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
