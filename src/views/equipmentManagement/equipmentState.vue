<template>
  <div>
    <searchTop :searchItem="searchItem" @searchForm="searchFormFn"></searchTop>
    <TableComponent
      :isTwoBtn="false"
      :NavList="NavList"
      :needTag="true"
      v-bind.sync="searchResults"
      @changePage="changePageFn"
    >
      <template v-slot:default="data">
        <el-button size="mini" type="text" @click="checkDetails(data)"
          >查看详情</el-button
        >
      </template>
    </TableComponent>

    <!-- 详情弹窗部分 -->
    <div class="dialog-container">
      <el-dialog title="设备详情" :visible.sync="dialogVisible" width="50%">
        <el-row type="flex">
          <el-col
            >销售量：<span>{{ orderCount }}个</span></el-col
          >
          <el-col
            >销售额：<span>{{ money }}</span></el-col
          >
          <el-col
            >补货次数：<span>{{ supplyCount }}次</span></el-col
          >
          <el-col
            >维修次数：<span>{{ repairCount }}次</span></el-col
          >
        </el-row>
        <h5>商品销量（月）</h5>
        <p v-if="skuCollectList.length == 0">当前设备未销售商品</p>
        <el-row v-else>
          <el-col :span="6" v-for="(item, index) in skuCollectList" :key="index"
            ><div class="grid-content">
              {{ item.skuName }}:{{ item.count }}
            </div></el-col
          >
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import searchTop from './components/searchTop.vue'
import TableComponent from './components/table.vue'
import {
  getorderAmountAPI,
  getorderCountAPI,
  getrepairCountAPI,
  getskuCollectAPI,
  getsupplyCountAPI,
  getVmSearchAPI
} from '@/api/equipment'
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
      ],
      orderAmount: '', //一定时间范围之内的收入
      orderCount: '', //一定时间范围之内的订单总数
      repairCount: '', //售货机维修次数
      supplyCount: '', //售货机补货次数
      skuCollectList: [], //售货机商品销量
      dialogVisible: false //弹层变量
    }
  },

  components: {
    searchTop,
    TableComponent
  },

  created() {
    this.getVmSearch(this.baseParams)
  },
  computed: {
    money() {
      if (this.orderAmount > 10000) {
        return (this.orderAmount / 10000).toFixed(2) + '万元'
      } else {
        return (+this.orderAmount).toFixed(2) + '元'
      }
    }
  },
  beforeUpdate() {
    this.searchResults.pageSize = +this.searchResults.pageSize
    this.searchResults.pageIndex = +this.searchResults.pageIndex
  },
  methods: {
    async getVmSearch(val) {
      const res = await getVmSearchAPI(val)
      this.searchResults = res.data
      // console.log(this.searchResults)
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
    },
    //获取一定时间范围之内的收入
    async getorderAmount(start, end, innerCode) {
      const res = await getorderAmountAPI(start, end, innerCode)
      // console.log(res)
      this.orderAmount = res.data
    },
    //获取一定时间范围之内的订单总数
    async getorderCount(start, end, innerCode) {
      const res = await getorderCountAPI(start, end, innerCode)
      // console.log(res)
      this.orderCount = res.data
    },
    //获取售货机维修次数
    async getrepairCount(innerCode, start, end, paramas) {
      const res = await getrepairCountAPI(innerCode, start, end, paramas)
      // console.log(res)
      this.repairCount = res.data
    },
    //获取售货机补货次数
    async getsupplyCount(innerCode, start, end, paramas) {
      const res = await getsupplyCountAPI(innerCode, start, end, paramas)
      // console.log(res)
      this.supplyCount = res.data
    },
    //获取售货机商品销量
    async getskuCollect(innerCode, start, end, paramas) {
      const res = await getskuCollectAPI(innerCode, start, end, paramas)
      // console.log(res)
      this.skuCollectList = res.data
    },

    checkDetails(val) {
      this.dialogVisible = true
      // console.log(val)
      const end = dayjs(new Date()).format('YYYY-MM-DD')
      const start = dayjs(new Date(end.substr(0, 7))).format('YYYY-MM-DD')
      const paramas = {
        vmType: val.data.type.typeId,
        nodeId: val.data.nodeId,
        createUserId: val.data.createUserId
      }
      this.getrepairCount(val.data.innerCode, start, end, paramas) //获取售货机维修次数
      this.getsupplyCount(val.data.innerCode, start, end, paramas) //获取售货机补货次数
      this.getskuCollect(val.data.innerCode, start, end, paramas) //获取售货机商品销量

      const startTime = dayjs(new Date(end.substr(0, 7))).format(
        'YYYY-MM-DD HH:mm:ss'
      )
      const endTime = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
      //

      this.getorderAmount(startTime, endTime, val.data.innerCode) //获取一定时间范围之内的收入
      this.getorderCount(startTime, endTime, val.data.innerCode) //获取一定时间范围之内的订单总数
    }
  }
}
</script>

<style scoped lang="scss">
.dialog-container {
  span {
    color: blue;
  }
  .grid-content {
    border: 1px solid #000;
    padding: 5px;
  }
}
</style>
