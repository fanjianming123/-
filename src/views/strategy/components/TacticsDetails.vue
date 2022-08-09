<!--  -->
<template>
    <el-dialog title="策略详情" :visible="visible" @close="closeFn">
      <p>策略名称：{{ policyName }}</p>
      <br />
      <div style="display: flex">
        <span style="margin-top: 14px">策略方案：</span>
        <el-table :data="gridData">
          <el-table-column
            type="index"
            label="序号"
            width="300"
          ></el-table-column>
          <el-table-column
            property="nodeName"
            label="点位名称"
            width="300"
          ></el-table-column>
          <el-table-column
            property="innerCode"
            label="设备编号"
          ></el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="paging">
        <div>
          共<span>{{ pagingData.totalCount }}</span
          >条记录 第<span>{{ pagingData.pageIndex }}</span
          >/<span>{{ pagingData.totalPage }}</span
          >页
        </div>

        <div class="pagingBtn">
          <el-button
            @click="PreviousPage"
            :disabled="pagingData.pageIndex <= 1 ? true : false"
            >上一页</el-button
          >

          <el-button
            @click="nextPage"
            :disabled="
              pagingData.pageIndex === pagingData.totalPage ? true : false
            "
            >下一页</el-button
          >
        </div>
      </div>
    </el-dialog>
 
</template>

<script>
import { searchPolicy } from '@/api/strategy'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      gridData: [],
      pagingData: {},
      pageIndex: 1,
      policyId: ''
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    policyName: {
      type: String,
      required: true
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    closeFn() {
      this.$emit('update:visible', false)
    },
    async clickSearchPolicy(row) {
      //   console.log(row)
      this.policyId = row ? row.policyId : this.policyId
      //   console.log(this.policyId)
      const { data } = await searchPolicy({
        policyId: this.policyId,
        pageIndex: this.pageIndex
      })
      console.log(data)
      this.pagingData = data
      //   console.log(this.pagingData)
      this.gridData = data.currentPageRecords
    },
    //下分页
    PreviousPage() {
      this.pageIndex--
      this.clickSearchPolicy()
    }, //上一页
    nextPage() {
      this.pageIndex++
      this.clickSearchPolicy()
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {}
  //生命周期 - 挂载完成（可以访问DOM元素）
}
</script>
<style scoped lang="scss">
::v-deep .el-dialog{
  border-radius: 10px !important;
}
// 分页
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
</style>
