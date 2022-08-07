<template>
  <div>
    <searchTop :searchItem="searchItem" @searchForm="searchFormFn"></searchTop>
    <TableComponent
      :isOneBtn="true"
      :NavList="NavList"
      v-bind.sync="searchResults"
      @changePage="changePageFn"
    >
      <template v-slot:default="data">
        <el-button size="mini" type="text" @click="editFn(data)"
          >修改</el-button
        >
        <el-button
          size="mini"
          type="text"
          style="color: red"
          @click="delFn(data)"
          >删除</el-button
        >
      </template>
    </TableComponent>
  </div>
</template>
<script>
import searchTop from './components/searchTop.vue'
import TableComponent from './components/table.vue'
import { delVmTypeAPI, getVmTypeAPI } from '@/api/equipment'
export default {
  data() {
    return {
      searchItem: {
        firstItem: '型号搜索',
        secondItem: '',
        isSelect: false,
        formInline: {
          user: ''
        }
      },
      baseParams: {
        //请求列表时的初始参数
        pageIndex: 1,
        pageSize: 10,
        name: ''
      },
      searchResults: {},
      NavList: [
        { label: '型号名称', value: 'name' },
        { label: '型号编码', value: 'model' },
        { label: '设备图片', value: 'image' },
        { label: '货道行', value: 'vmRow' },
        { label: '货道列', value: 'vmCol' },
        { label: '设备容量', value: 'channelMaxCapacity' }
      ]
    }
  },

  components: {
    searchTop,
    TableComponent
  },

  created() {
    this.getVmSearch(this.baseParams)
  },
  beforeUpdate() {
    this.searchResults.pageSize = +this.searchResults.pageSize
    this.searchResults.pageIndex = +this.searchResults.pageIndex
  },
  methods: {
    async getVmSearch(val) {
      const res = await getVmTypeAPI(val)
      this.searchResults = res.data
      console.log(this.searchResults)
    },
    changePageFn() {
      this.getVmSearch({
        pageIndex: this.searchResults.pageIndex,
        pageSize: this.searchResults.pageSize
      })
    },
    searchFormFn(val) {
      // console.log(val)
      this.baseParams.name = val.user
      this.getVmSearch(this.baseParams)
    },
    editFn(val) {
      console.log(val)
    },
    async delFn(val) {
      try {
        await delVmTypeAPI(val.data.typeId)
        this.getVmSearch(this.baseParams)
        this.$message.success('删除成功')
      } catch (error) {}
    }
  }
}
</script>

<style scoped></style>
