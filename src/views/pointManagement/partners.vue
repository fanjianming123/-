<template>
  <div>
    <SearchTop
      :searchItem="searchItem"
      ref="SearchTop"
      @searchForm="searchFormFn"
    >
    </SearchTop>
    <bkdTable
      :NavList="NavList"
      :isShow="isShow"
      v-bind.sync="AreaList"
      :baseParams="baseParams"
      @add="addFn"
      @changePage="changePageFn"
    >
      <el-table-column label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button @click="replaceCode(scope.row)" type="text" size="small"
            >重置密码</el-button
          >
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
            @click.native="deleteRow(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </bkdTable>
    <addDialog
      ref="addDialog"
      :visible.sync="dialogFormVisible"
      :AreaList="AreaList"
      @add="addPoint"
      @edit="editFn"
      :editAreaList="editAreaList"
    ></addDialog>
    <ShowDetail :Visible.sync="Visible" ref="showDetail"> </ShowDetail>
  </div>
</template>

<script>
import SearchTop from './components/searchTop.vue'
import bkdTable from './components/bkdTable.vue'
import ShowDetail from './partnerComponent/showDetailDialog.vue'
import { getPartnerSearchApi,addPartnerListApi } from '@/api/partner'
import addDialog from './partnerComponent/addDialog.vue'
export default {
  data() {
    return {
      searchItem: {
        firstItem: '合作商搜索',
        secondItem: '',
        isSelect: false,
        selectOption: [],
        formInline: {
          user: '',
          region: ''
        }
      },
      // searchItem1: []
      NavList: [
        { label: '合作商名称', value: 'name' },
        { label: '账号', value: 'account' },
        { label: '设备数量', value: 'vmCount' },
        { label: '分成比例', value: 'ratio' },
        { label: '联系人', value: 'contact' },
        { label: '联系电话', value: 'mobile' }
      ],
      baseParams: {
        //请求列表时的初始参数
        pageIndex: 1,
        pageSize: 10
      },
      AreaList: {},
      isShow: false,
      dialogFormVisible: false,
      editAreaList: {},
      Visible: false
    }
  },
  components: {
    SearchTop,
    bkdTable,
    addDialog,
    ShowDetail
  },
  created() {
    this.getNodeSearch({
      pageIndex: 1,
      pageSize: 10
    })
  },
  beforeUpdate() {
    this.AreaList.pageSize = +this.AreaList.pageSize
    this.AreaList.pageIndex = +this.AreaList.pageIndex
  },
  methods: {
    async getNodeSearch(val) {
      const { data } = await getPartnerSearchApi(val)
      console.log(data)
      this.AreaList = data
    },
    searchFormFn(val) {
      // console.log(val)
      if (val.user) {
        this.getNodeSearch({
          name: val.user
        })
      } else {
        this.getNodeSearch({
          pageIndex: 1,
          pageSize: 10
        })
      }
    },
    async addFn(val) {
      // console.log(val)
      if (val) {
        this.editAreaList = val
        await this.$refs.addDialog.showEditContent({
          name: val.name,
          regionId: val.regionId
        })
      }
      this.dialogFormVisible = true

      // console.log(this.editAreaList)
    },
    async addPoint(val) {
      console.log(val)
      try {
      //   await addPartnerListApi({
      //     name,
      //     account,
      //     password,
      //     ratio,
      //     contact,
      //     phone,
      //     mobile
        // })
        this.$message.success('添加成功')
      } catch (error) {
        this.$message.error('添加失败')
        this.$message.error(error.response.data)
      }
      // console.log(res)
    },
    async editFn(val) {
      console.log(val)
      try {
        await editNodeDetailApi({
          id: val.id,
          name: val.name,
          addr: val.addr[0] + '-' + val.addrDetail,
          areaCode: val.addr[1],
          createUserId: this.$store.state.user.userId,
          regionId: val.regionName,
          businessId: val.businessTypeName,
          ownerId: val.ownerName.id,
          ownerName: val.ownerName.name
        })
        this.$message.success('编辑成功')
      } catch (error) {
        this.$message.error('编辑失败')
        this.$message.error(error.response.data)
      }
    },
    async handleClick(row) {
      await this.$refs.showDetail.showDetailContent(row)
      this.Visible = true
    },
    async deleteRow(row) {
      try {
        await delNodeDetailApi(row.id)
        this.getNodeSearch()
      } catch (error) {
        // console.dir(error)
        this.$message.error(error.response.data)
      }
    },
    changePageFn() {
      this.getNodeSearch({
        pageIndex: this.AreaList.pageIndex,
        pageSize: this.AreaList.pageSize
      })
    },
    replaceCode(val) {
      console.log(val)
    }
  }
}
</script>

<style scoped></style>
