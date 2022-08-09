<template>
  <div class="dashboard-container">
    <!-- 工单统计/销售统计区域 -->
    <el-row type="flex" class="title-Statistics">
      <el-col :span="10" class="left-Statistics">
        <span class="big-span">工单统计</span>
        <span class="mini-span">{{ time }}</span>
        <el-row type="flex" class="main-info">
          <el-col>
            <div>{{ total }}</div>
            <i>工单总数（个）</i>
          </el-col>
          <el-col>
            <div>{{ completedTotal }}</div>
            <i>完成工单（个）</i>
          </el-col>
          <el-col>
            <div>{{ progressTotal }}</div>
            <i>进行工单（个）</i>
          </el-col>
          <el-col>
            <div>{{ cancelTotal }}</div>
            <i>取消工单（个）</i>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8" class="right-Statistics">
        <span class="big-span">销售统计</span>
        <span class="mini-span">{{ time }}</span>
        <el-row type="flex" class="main-info">
          <el-col>
            <div>{{ OrderQuantity }}</div>
            <div class="ming-message">订单量（个）</div>
          </el-col>
          <el-col>
            <div>{{ salesVolume }}</div>
            <div class="ming-message">销售额（万元）</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 销售数据 -->
    <el-row type="flex" class="Sales-data">
      <el-col :span="8">
        <span class="big-span">销售数据</span>
        <span class="mini-span">{{ timeL }}</span>
        <el-row>
          <div class="main" ref="main"></div>
        </el-row>
      </el-col>
      <el-col :span="6">
        <div class="time-year">
          <span
            class="tiem-week"
            v-for="(item, index) in timeDaty"
            :key="index"
            :class="active === index ? 'actives' : ''"
            @click="removeActive(index)"
            >{{ item.day }}</span
          >
        </div>
        <div class="main-two" ref="maintwo">暂无数据</div>
      </el-col>
    </el-row>
    <!-- 右侧边栏 -->
    <el-row class="right-navbar">
      <el-col>
        <span class="big-title">商品热榜</span>
        <span class="mini-time">{{ time }}</span>
      </el-col>
      <el-col
        class="user-maessage"
        v-for="(item, index) in CommodityHotList"
        :key="index"
      >
        <span class="user-img"
          ><i class="index-text">{{ index }}</i>
          <img src="./components/jin.png" alt="" v-if="index === 0" />
          <img src="./components/yin.png" alt="" v-else-if="index === 1" />
          <img src="./components/tong.png" alt="" v-else-if="index === 2" />
          <img src="./components/tie.png" alt="" v-else />
        </span>
        <span class="usser-text">{{ item.skuName }}</span>
        <span class="user-tob">{{ item.count }}单</span>
      </el-col>
    </el-row>
    <!-- 合作商点位 -->
    <el-row type="flex" class="Partner">
      <el-col class="Partner-left">
        <div class="msg-partner" ref="mainss">饼图区域</div>
      </el-col>
      <el-col class="Partner-right">
        <i class="el-icon-open icon" @click="$router.push('/node/partner')"></i>
        <div class="message">
          <div class="bigtext">
            {{ Totalnumber }}
            <div class="ming">点位数</div>
          </div>
          <div class="bigtext">
            {{ partners }}
            <div class="ming">合作商数</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 异常设备监控 -->
    <el-row class="monitor">
      <el-col>
        <span class="title">异常设备监控</span>
        <i class="el-icon-open icon" @click="$router.push('/vm/status')"></i>
        <div class="message-info">
          <img src="./components/imgs/zwsj.png" alt="" />
          <div class="text">暂无数据</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  SalesStatisticsOrderApi,
  TotalAmountOfMoneyApi,
  GetTopSalesApi,
  TotalnumberofpointsApi,
  TotalPartnersApi,
  FaultListApi,
  SalesStatisticsApi,
  SalesDistributionApi,
  PartnerLocationApi
} from '@/api/dashboard'
import { gettaskReportInfoApi } from '@/api/personnel'
import dayjs from 'dayjs'
import * as echarts from 'echarts'
export default {
  name: 'Dashboard',
  data() {
    return {
      active: 0,
      timeDaty: [{ day: '周' }, { day: '月' }, { day: '年' }],
      OrderQuantity: '', //订单量
      salesVolume: '', //销售额
      statistics: [], //工单统计
      total: '', //工单总数
      completedTotal: '', //完成工单
      progressTotal: '', //进行工单
      cancelTotal: '', //取消工单
      CommodityHotList: [], // 商品热榜
      Totalnumber: '', //点位总数
      partners: '', //合作商总数
      Salestrendstatisticschart: null, // 销售趋势统计图
      seriesTimer: {}, //销售趋势数据
      Salesstatisticsdistribution: null, // 销售额分布图
      SalesDistri: {}, //销售分布数据
      Partnerlocation: null, // 合作商点位数图
      PartnerlocationList: [] // 合作商点位数图数据
    }
  },
  computed: {
    time() {
      const start = dayjs(new Date()).startOf('month').format('YYYY-MM-DD')
      const end = dayjs(new Date()).format('YYYY-MM-DD')
      return start + '~' + end
    },
    timeL() {
      const start = dayjs(new Date()).startOf('week').format('YYYY-MM-DD')
      const end = dayjs(new Date()).format('YYYY-MM-DD')
      return start + '~' + end
    }
  },
  created() {
    const collectType = 1
    const start = dayjs(new Date()).startOf('week').format('YYYY-MM-DD')
    const end = dayjs(new Date()).format('YYYY-MM-DD')
    this.SalesStatisticsOrder() //销售额统计订单
    this.TotalAmountOfMoney() //销售额
    this.gettaskReportInfo() //工单统计信息
    this.GetTopSales() //获取销售商品前10
    this.Totalnumberofpoints() // 获取合作商点位总数
    this.TotalPartners() //获取合作商总数
    this.FaultList() // 获取故障列表
    this.SalesStatistics(collectType, start, end) //获取销售额统计趋势图坐标
    this.SalesDistribution(start, end) //根据地区汇总销售额数据(销售量分布)
    this.PartnerLocationApi() //合作商点位汇总统计
  },
  methods: {
    removeActive(index) {
      this.active = index
      if (index === 0) {
        const collectType = 1
        const start = dayjs(new Date()).startOf('week').format('YYYY-MM-DD')
        const end = dayjs(new Date()).format('YYYY-MM-DD')
        this.SalesStatistics(collectType, start, end)
        this.SalesDistribution(start, end)
      } else if (index === 1) {
        const collectType = 1
        const start = dayjs(new Date()).startOf('month').format('YYYY-MM-DD')
        const end = dayjs(new Date()).format('YYYY-MM-DD')
        this.SalesStatistics(collectType, start, end)
        this.SalesDistribution(start, end)
      } else {
        const collectType = 2
        const start = dayjs(new Date()).startOf('year').format('YYYY-MM-DD')
        const end = dayjs(new Date()).format('YYYY-MM-DD')
        this.SalesStatistics(collectType, start, end)
        this.SalesDistribution(start, end)
      }
    },
    //echarts 折线图调用
    Myecharts() {
      let option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.seriesTimer.xAxis
        },
        yAxis: {
          name: '单位：元',
          type: 'value',
          axisTick: {
            show: false // 去除刻度
          }
        },
        grid: {
          left: '0',
          bottom: '3%',
          show: true,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        title: {
          left: 'center',
          text: '销售额趋势图'
        },
        series: [
          {
            data: this.seriesTimer.series,
            type: 'line',
            color: '#ff5757',
            areaStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#dc3881' //0%处的颜色
                    },
                    {
                      offset: 0.6,
                      color: '#fdd4d5' //100%处的颜色
                    }
                  ],
                  globlCoord: false
                }
              }
            }
            // areaStyle: {}
          }
        ]
      }
      this.Salestrendstatisticschart = echarts
        .init(this.$refs.main)
        .setOption(option)
    },
    // 销售统计分布 柱状图
    MyechartsFn() {
      let option = {
        xAxis: {
          type: 'category',
          data: this.SalesDistri.xAxis,
          axisTick: {
            alignWithLabel: false, //图形在刻度之间
            show: false, //不显示刻度
            axisLabel: {
              color: '#9fc1ff'
            }
          }
        },
        grid: {
          left: '0',
          bottom: '3%',
          show: true,
          containLabel: true
        },
        yAxis: {
          type: 'value',
          name: '单位：元'
        },
        title: {
          left: 'center',
          text: '销售额分布'
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        itemStyle: {
          color: '#9fc1ff'
        },
        emphasis: {
          itemStyle: {
            color: '#9fc1ff'
          }
        },
        series: [
          {
            data: this.SalesDistri.series,
            type: 'bar',
            barWidth: '10%',
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          }
        ]
      }
      this.Salesstatisticsdistribution = echarts
        .init(this.$refs.maintwo)
        .setOption(option)
    },
    // 合作商点位统计分布 饼图
    MyechartsFnFor() {
      let option = {
        title: {
          left: 'left',
          text: '合作商点位数Top5'
        },
        color: ['#85a7ff', '#a8ffcf', '#ffb18b', '#c6ebff', '#becce6'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: 'Area Mode',
            type: 'pie',
            radius: [30, 110],
            center: ['50%', '50%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 5
            },
            // 文本标签控制饼形图文字的相关样式， 注意它是一个对象
            label: {
              fontSize: 10
            },
            // 引导线调整
            labelLine: {
              // 连接扇形图线长
              length: 6,
              // 连接文字线长
              length2: 8
            },
            data: this.PartnerlocationList
          }
        ]
      }

      this.Partnerlocation = echarts.init(this.$refs.mainss).setOption(option)
    },
    //获取销售统计订单
    async SalesStatisticsOrder() {
      const start = dayjs(new Date())
        .startOf('month')
        .format('YYYY-MM-DD 00:00:00')
      const end = dayjs(new Date()).format('YYYY-MM-DD 23:59:59')
      const res = await SalesStatisticsOrderApi(start, end)
      this.OrderQuantity = res.data
      // console.log(res)
    },
    //获取销售额
    async TotalAmountOfMoney() {
      const start = dayjs(new Date())
        .startOf('month')
        .format('YYYY-MM-DD 00:00:00')
      const end = dayjs(new Date()).format('YYYY-MM-DD 23:59:59')
      const res = await TotalAmountOfMoneyApi(start, end)
      this.salesVolume = (res.data / 1000000).toFixed(2)
      // console.log(this.salesVolume)
    },
    //获取工单统计信息
    async gettaskReportInfo() {
      const start = dayjs(new Date())
        .startOf('month')
        .format('YYYY-MM-DD 00:00:00')
      const end = dayjs(new Date()).format('YYYY-MM-DD 23:59:59')
      const res = await gettaskReportInfoApi(start, end)
      this.statistics = res.data
      this.total = this.statistics[0].total + this.statistics[1].total
      this.completedTotal =
        this.statistics[0].completedTotal + this.statistics[1].completedTotal
      this.progressTotal =
        this.statistics[0].progressTotal + this.statistics[1].progressTotal
      this.cancelTotal =
        this.statistics[0].cancelTotal + this.statistics[1].cancelTotal
      // console.log(res)
    },
    // 获取排行商品
    async GetTopSales() {
      const start = dayjs(new Date()).startOf('month').format('YYYY-MM-DD')
      const end = dayjs(new Date()).format('YYYY-MM-DD')
      const topValue = 10
      const res = await GetTopSalesApi(topValue, start, end)
      this.CommodityHotList = res.data
      // console.log(res)
    },
    //获取合作商点位总数
    async Totalnumberofpoints() {
      const res = await TotalnumberofpointsApi()
      this.Totalnumber = res.data
      // console.log(res);
    },
    //获取合作商总数
    async TotalPartners() {
      const res = await TotalPartnersApi()
      this.partners = res.data
      // console.log(res)
    },
    //获取故障列表
    async FaultList() {
      const res = await FaultListApi()
      console.log(res)
    },
    //获取销售额统计趋势图坐标
    async SalesStatistics(collectType, start, end) {
      const res = await SalesStatisticsApi(collectType, start, end)
      this.seriesTimer = res.data
      this.Myecharts()
      // console.log(this.seriesTimer)
    },
    //根据地区汇总销售额数据(销售量分布)
    async SalesDistribution(start, end) {
      // const start = dayjs(new Date()).startOf('week').format('YYYY-MM-DD')
      // const end = dayjs(new Date()).format('YYYY-MM-DD')
      const res = await SalesDistributionApi(start, end)
      this.SalesDistri = res.data
      this.MyechartsFn()
      // console.log(res)
    },
    //合作商点位汇总统计
    async PartnerLocationApi() {
      const res = await PartnerLocationApi()
      this.PartnerlocationList = res.data
      this.MyechartsFnFor()
      // console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  padding: 30px;
  // 工单统计 销售额统计css样式
  .title-Statistics {
    .left-Statistics {
      padding: 15px;
      border-radius: 15px;
      background: url('./components/imgs/task.png') #e9f3ff no-repeat;
      background-position: 390px 45px;
      .big-span {
        font-size: 16px;
        font-weight: 700;
        color: #333333;
      }
      .mini-span {
        font-size: 12px;
        color: #999999;
        margin-left: 10px;
      }
      .main-info {
        font-size: 36px;
        color: #072074;
        font-weight: 700;
        margin-top: 18px;
        margin-left: 20px;
        i {
          display: inline-block;
          width: 84px;
          height: 17px;
          font-size: 12px;
          color: #91a7dc;
          margin-top: 3px;
          font-weight: 400;
        }
      }
    }
    .right-Statistics {
      padding: 15px;
      margin-left: 15px;
      border-radius: 15px;
      background: url('./components/imgs/sale.png') #fbefe8 no-repeat;
      background-position: 246px 59px;
      .big-span {
        font-size: 16px;
        font-weight: 700;
        color: #333333;
      }
      .mini-span {
        font-size: 12px;
        color: #999999;
        margin-left: 10px;
      }
      .main-info {
        font-size: 36px;
        color: #ff5757;
        font-weight: 700;
        margin-top: 18px;
        margin-left: 20px;
        .ming-message {
          display: inline-block;
          font-size: 12px;
          color: #df9d97;
          margin-top: 3px;
          font-weight: 400;
        }
      }
    }
  }
  //销售数据区域css
  .Sales-data {
    position: relative;
    padding: 15px;
    border-radius: 15px;
    margin-top: 20px;
    width: 958px;
    background-color: #fff;
    .big-span {
      font-size: 16px;
      font-weight: 700;
      color: #333333;
    }
    .mini-span {
      font-size: 12px;
      color: #999999;
      margin-left: 10px;
    }
    .time-year {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 90px;
      height: 34px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(233, 243, 255, 0.37);
      border-radius: 10px;
      padding: 0 5px;
      .tiem-week {
        display: inline-block;
        width: 100%;
        height: 20px;
        text-align: center;
        line-height: 20px;
        cursor: pointer;
      }
      //动态类名
      .actives {
        background: #fff;
        -webkit-box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
        box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
        border-radius: 7px;
        font-weight: 600;
        color: #333;
      }
    }
    // 销售区域css样式
    .main {
      width: 476px;
      height: 278px;
      background-color: #fff;
      margin-top: 10px;
    }
    .main-two {
      width: 465px;
      height: 278px;
      background-color: #fff;
      margin-left: 167px;
      margin-top: 28px;
    }
  }
  // 右侧侧边栏
  .right-navbar {
    position: absolute;
    top: 0;
    right: 0;
    width: 318px;
    height: 505px;
    padding: 15px;
    margin-top: 30px;
    border-radius: 15px;
    background-color: #fff;
    .big-title {
      font-size: 16px;
      font-weight: 700;
      color: #333333;
    }
    .mini-time {
      font-size: 12px;
      color: #999999;
      margin-left: 10px;
    }
    .user-maessage {
      margin: 15px 0 10px;
      display: flex;
      justify-content: space-between;
      .user-img {
        position: relative;
        width: 21px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        background-color: #fff;
        font-size: 12px;
        margin-left: 10px;
        .index-text {
          position: absolute;
          left: 7px;
          top: -2px;
        }
      }
      .user-text {
        font-size: 14px;
        color: #333333;
      }
      .user-tob {
        font-size: 14px;
        color: #737589;
      }
    }
  }
  //合作商点位
  .Partner {
    position: relative;
    width: 768px;
    height: 353px;
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;
    border-radius: 15px;
    .Partner-left {
      .msg-partner {
        width: 509px;
        height: 284px;
        margin-top: 40px;
        background-color: #fff;
      }
    }
    .Partner-right {
      .message {
        width: 154px;
        height: 230px;
        padding-top: 47px;
        padding-left: 38px;
        margin-top: 41px;
        margin-left: 43px;
        background: linear-gradient(135deg, transparent, #f8f8f9 0) 0 0,
          linear-gradient(-135deg, transparent 12px, #f8f8f9 0) 100% 0,
          linear-gradient(-45deg, transparent, #f8f8f9 0) 100% 100%,
          linear-gradient(45deg, transparent 12px, #f8f8f9 0) 0 100%;
        background-size: 50% 50%;
        background-repeat: no-repeat;
        font-size: 24px;
        color: #072074;
        .bigtext {
          margin: 20px 10px;
        }
        .ming {
          color: #000412;
          font-size: 12px;
          margin-top: 6px;
        }
      }
      .icon {
        position: absolute;
        color: #819eff;
        top: 15px;
        right: 11px;
        cursor: pointer;
      }
    }
  }
  //监控设备区域
  .monitor {
    position: absolute;
    bottom: 29px;
    right: -12px;
    width: 507px;
    height: 353px;
    border-radius: 15px;
    padding: 15px;
    background-color: #fff;
    .message-info {
      margin-left: 181px;
      margin-top: 126px;
      .text {
        margin-left: 40px;
      }
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: #333333;
    }
    i {
      position: absolute;
      right: 15px;
      top: 15px;
      color: #819eff;
      cursor: pointer;
    }
  }
}
</style>
