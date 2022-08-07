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
        @clear="clearValue"
      ></el-input>
      <i class="ibutt"></i>
      <el-button type="primary" icon="el-icon-search" @click="queryPresonnel"
        >查询</el-button
      >
    </div>
    <!-- 表单内容 -->
    <div class="bottom">
      <dkd-table
        :NavList="NavList"
        v-bind.sync="currentObj"
        @changePage="changePage"
        :isShow="false"
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
import { getUpersonnelApi } from '@/api/personnel'
export default {
  name: 'personnel',
  data() {
    return {
      NavList: [
        { label: '人员名称', value: 'userName' },
        { label: '归属区域', value: 'regionName' },
        { label: '角色', value: 'role.roleName' },
        { label: '联系电话', value: 'mobile' }
      ],
      currentObj: {},
      baseparams: {
        pageIndex: 1,
        pageSize: 10
      },
      valueName: ''
    }
  },
  beforeUpdate() {
    this.currentObj.pageSize = +this.currentObj.pageSize
    this.currentObj.pageIndex = +this.currentObj.pageIndex
  },
  created() {
    this.getUpersonnel(this.baseparams)
  },

  methods: {
    //获取人员信息列表（搜索）
    async getUpersonnel(val) {
      const res = await getUpersonnelApi(val)
      this.currentObj = res.data
      // console.log(res)
    },
    //分页change事件
    async changePage() {
      const params = {
        pageIndex: this.currentObj.pageIndex,
        pageSize: this.currentObj.pageSize
      }
      await this.getUpersonnel(params)
    },
    //查询事件
    queryPresonnel() {
      const userName = {
        userName: this.valueName
      }
      this.getUpersonnel(userName)
    },
    clearValue() {
      //点击清除小图标发送
      this.getUpersonnel(this.baseparams)
    }
  }
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
