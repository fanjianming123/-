<template>
  <div>
    <SearchTop :searchItem="searchItem" @searchForm="searchFormFn"> </SearchTop>
    <bkd-table
      :NavList="NavList"
      :isShow="isShow"
      v-bind.sync="AreaList"
      :baseParams="baseParams"
      @add="addFn"
    >
      <el-table-column label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看详情</el-button
          >
          <el-button type="text" size="small" @click.native="addFn(scope.row)"
            >修改</el-button
          >
          <el-button
            type="text"
            size="small"
            style="color: red"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <!-- <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small"
          >查看详情</el-button
        >
        <el-button type="text" size="small">修改</el-button>
        <el-button
          type="text"
          size="small"
          style="color: red"
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          >删除</el-button
        >
      </template> -->
    </bkd-table>
    <dialogPoint
      ref="showEdit"
      :visible.sync="dialogFormVisible"
      :AreaList="AreaList"
      @add="addArea"
      :editAreaList="editAreaList"
    ></dialogPoint>
  </div>
</template>

<script>
import bkdTable from './components/bkdTable.vue'
import SearchTop from './components/searchTop.vue'
import { getAreaListApi } from '@/api/point'
import dialogPoint from '@/components/dialogPoint'
import { addAreaListApi } from '@/api/point'
export default {
  data() {
    return {
      searchItem: {
        firstItem: '区域搜索',
        isSelect: false,
        selectOption: [],
        formInline: {
          user: '',
          region: ''
        }
      },
      NavList: [
        { label: '区域名称', value: 'name' },
        { label: '点位数', value: 'nodeCount' },
        { label: '备注说明', value: 'remark' }
      ],
      isShow: false,
      baseParams: {
        //请求列表时的初始参数
        pageIndex: 1,
        pageSize: 10
      },
      AreaList: {},
      dialogFormVisible: false,
      editAreaList: {}
    }
  },
  components: {
    SearchTop,
    bkdTable,
    dialogPoint
  },
  created() {
    this.getAreaList()
    // this.getVmSearch(this.baseParams)
  },

  methods: {
    async getAreaList(val) {
      const res = await getAreaListApi(val)
      console.log(res)
      this.AreaList = res.data
      this.AreaList.pageSize = +this.AreaList.pageSize
      this.AreaList.pageIndex = +this.AreaList.pageIndex
    },
    handleClick(row) {
      console.log(row)
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    searchFormFn(val) {
      this.getAreaList({
        name: val.user
      })
      console.log(val.user)
    },
    async addFn(val) {
      // console.log(val)
      this.editAreaList = val ? val : {}
      await this.$refs.showEdit.showEditContent(val.id)
      this.dialogFormVisible = true
      // console.log(this.editAreaList)
    },
    async addArea(val) {
      // console.log(this.AreaList.currentPageRecords)
      try {
        await addAreaListApi({
          regionName: val.name,
          remark: val.remark
        })
        this.$message.success('添加成功')
        this.getAreaList()
      } catch (error) {
        console.dir(error)
        this.$message.error('添加失败')
      }
    }
  }
}
</script>

<style scoped></style>
