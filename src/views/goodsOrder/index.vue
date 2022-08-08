<template>
  <div>
    <!-- 头部 -->
    <orderTop @submit="submitFn"></orderTop>
    <!-- table -->
    <orderTable
      :NavList="NavList"
      v-bind.sync="orderData"
      @changePage="changePageFn"
    >
      <el-table-column label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="seeDetails(scope.row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </orderTable>

    <!-- 查看详情 弹出层 -->
    <el-dialog
      title="订单详情"
      :visible.sync="dialogVisible"
      width="630px"
      height="50%"
    >
      <div class="el-dialog__body">
        <div class="task-status" v-if="this.row.status === '创建'">
          <img src="./img/1.png" alt="" class="icon" />
          <span class="status">未支付</span>
          <img src="./img/2.png" alt="" class="pic" />
        </div>
        <div class="task-status" v-else>
          <img src="./img/good.1.png" alt="" class="icon" />
          <span class="status">未支付</span>
          <img src="./img/good.2.png" alt="" class="pic" />
        </div>
        <form action=""></form>
      </div>
      <div class="container">
        <el-row class="containeritem">
          <el-col :span="12">订单编号: {{ row.orderNo }}</el-col>
          <el-col :span="12">商品名称: {{ row.skuName }}</el-col>
        </el-row>
        <el-row class="containeritem">
          <el-col :span="12">订单金额： {{ row.amount }}</el-col>
          <el-col :span="12">设备编号： {{ row.innerCode }}</el-col>
        </el-row>
        <el-row class="containeritem">
          <el-col :span="12">创建时间： {{ row.createTime }} </el-col>
          <el-col :span="12">完成时间： {{ row.updateTime }}</el-col>
        </el-row>
        <el-row class="containeritem">
          <el-col :span="12">支付方式： {{ row.createType }}</el-col>
          <el-col :span="12">设备地址：{{ row.addr }}</el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { orderSearchApi } from '@/api/order'
import orderTop from '@/components/OrderTop/ordertop.vue'
import orderTable from '@/components/OrderTop/orderTable.vue'
export default {
  data() {
    return {
      NavList: [
        { label: '订单编号', value: 'orderNo' },
        { label: '商品名称', value: 'skuName' },
        { label: '订单金额（元）', value: 'amount' },
        { label: '设备编号', value: 'innerCode' },
        { label: '订单状态', value: 'status' },
        { label: '订单日期', value: 'createTime' }
      ],
      orderData: {},
      baseParams: {
        //请求列表时的初始参数
        pageIndex: 1,
        pageSize: 10,
        orderNo: '',
        startDate: '',
        endDate: ''
      },
      dialogVisible: false,
      row: ''
    }
  },

  created() {
    this.orderSearch(this.baseParams)
  },

  beforeUpdate() {
    this.orderData.pageSize = +this.orderData.pageSize
    this.orderData.pageIndex = +this.orderData.pageIndex
    this.baseParams.pageIndex = this.orderData.pageIndex
    this.baseParams.pageSize = this.orderData.pageSize
  },

  methods: {
    async orderSearch(val) {
      const res = await orderSearchApi(val)
      // console.log(res)
      this.orderData = res.data
    },
    changePageFn() {
      console.log(this.orderData.pageIndex)
      this.orderSearch(this.baseParams)
    },
    seeDetails(row) {
      this.dialogVisible = true
      // console.log(row)
      this.row = row
    },
    submitFn(val, valueTime) {
      console.log(val)
      this.baseParams.orderNo = val
      this.baseParams.startDate = valueTime[0]
      this.baseParams.endDate = valueTime[1]
      // console.log(this.orderData)
      this.orderSearch(this.baseParams)
    }
  },
  components: {
    orderTop,
    orderTable
  }
}
</script>

<style scoped lang="scss">
.el-dialog__body {
  padding: 20px 20px 30px;
  color: #666;
}
.el-dialog__body {
  padding: 30px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
.task-status {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: relative;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 54px;
  margin-bottom: 25px;
  background-color: hsla(0, 0%, 92.5%, 0.39);
}
.containeritem {
  margin-bottom: 10px;
}
.pic {
  /* display: flex; */
  position: absolute;
  right: 50px;
  top: 0;
  /* margin-right: 10px; */
}
.icon {
  position: absolute;
  left: 10px;
}
span {
  position: absolute;
  left: 50px;
}
</style>
