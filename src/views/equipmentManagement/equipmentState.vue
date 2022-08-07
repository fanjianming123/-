<template>
  <div>
    <searchTop :searchItem="searchItem" @searchForm="searchFormFn"></searchTop>
    <TableComponent
      :isTwoBtn='false'
      :NavList="NavList"
      :needTag="true"
      v-bind.sync="searchResults"
      @changePage="changePageFn"
    >
      <el-button size="mini" type="text">查看详情</el-button>
    </TableComponent>
  </div>
</template>
<script>
import searchTop from './components/searchTop.vue'
import TableComponent from './components/table.vue'
import { getVmSearchAPI } from '@/api/equipment'
export default {
  data() {
    return {
      searchItem: {
        firstItem: '设备编号',
        secondItem: '',
        isSelect: false,
        formInline: {
          user: ''
        }
      },
      baseParams: {
        //请求列表时的初始参数
        pageIndex: 1,
        pageSize: 10
      },
      searchResults: {},
      NavList: [
        { label: '设备编号', value: 'innerCode' },
        { label: '设备型号', value: 'vmType' },
        { label: '详细地址', value: 'node.addr' },
        { label: '运营状态', value: 'vmStatus' }
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
      const res = await getVmSearchAPI(val)
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
      this.baseParams.innerCode = val.user
      this.getVmSearch(this.baseParams)
    }
  }
}
</script>

<style scoped></style>
