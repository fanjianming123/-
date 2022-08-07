<template>
  <div class="management">
    <!-- 头部搜索 -->
    <div class="top">
      <span>人员搜索:</span>
      <inputBox></inputBox>
      <i class="ibutt"></i>
      <searchBtn></searchBtn>
    </div>
    <!-- 表单内容 -->
    <div class="bottom">
      <dkd-table
        :NavList="NavList"
        v-bind.sync="currentObj"
        @changePage="changePage"
      >
        <el-button
          type="text"
          size="small">
          修改
        </el-button>
        <el-button
        style='color:red'
          type="text"
          size="small">
          删除
        </el-button>
      </dkd-table>
    </div>
  </div>
</template>

<script>
import inputBox from '@/components/search/input.vue'
import searchBtn from '@/components/search/searchBtn.vue'
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
      }
    }
  },
  beforeUpdate() {
    this.currentObj.pageSize = +this.currentObj.pageSize
    this.currentObj.pageIndex = +this.currentObj.pageIndex
  },
  components: { inputBox, searchBtn },
  created() {
    this.getUpersonnel(this.baseparams)
  },

  methods: {
    async getUpersonnel(val) {
      const res = await getUpersonnelApi(val)
      this.currentObj = res.data
      console.log(res)
    },
    async changePage() {
      const params = {
        pageIndex: this.currentObj.pageIndex,
        pageSize: this.currentObj.pageSize
      }
      await this.getUpersonnel(params)
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
    .ibutt{
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
