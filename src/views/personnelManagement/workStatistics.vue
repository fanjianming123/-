<template>
  <div class="Human-effect">
    <!-- 头部可视区域 -->
    <el-row type="flex">
      <el-col class="operate-Man">
        运营人员（当天）
        <el-row type="flex" align="center">
          <el-col
            ><span>{{ camp.total }}</span>
            <div>工单总数(个)</div></el-col
          >
          <el-col>
            <span>{{ camp.completedTotal }}</span>
            <div>完成工单(个)</div></el-col
          >
          <el-col
            ><span>{{ camp.cancelTotal }}</span>
            <div>拒绝工单(个)</div></el-col
          >
          <el-col
            ><span>{{ camp.workerCount }}</span>
            <div>运营人员数(个)</div></el-col
          >
        </el-row>
      </el-col>
      <el-col class="maintenance-man">
        运维人员（当天）
        <el-row type="flex" align="center">
          <el-col
            ><span>{{ dimension.total }}</span>
            <div>工单总数(个)</div></el-col
          >
          <el-col>
            <span>{{ dimension.completedTotal }}</span>
            <div>完成工单(个)</div></el-col
          >
          <el-col
            ><span>{{ dimension.cancelTotal }}</span>
            <div>拒绝工单(个)</div></el-col
          >
          <el-col
            ><span>{{ dimension.workerCount }}</span>
            <div>运营人员数(个)</div></el-col
          >
        </el-row>
      </el-col>
    </el-row>
    <!-- 主体内容区域 -->
    <el-row type="flex">
      <el-col class="left-message" :span="18">
        <el-row type="flex">
          <el-col class="title-cols" :span="14">工单状态</el-col>
          <el-col :span="4">
            <el-date-picker
              v-model="value1"
              class="time-out"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
              prefix-icon="el-icon-date"
            >
            </el-date-picker>
          </el-col>
          <el-col :span="2" class="time-madthoryear">
            <ul>
              <li>周</li>
              <li>月</li>
              <li>年</li>
            </ul>
          </el-col>
        </el-row>
        <el-row class="empty-img">
          <el-col>
            <!-- <el-empty description="暂无数据"></el-empty> -->
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="6" class="right-message">
        <el-row type="flex">
          <el-col class="title-cols" :span="16">人效排名（月度）</el-col>
          <el-col :span="3">
            <template>
              <el-select
                v-model="value"
                placeholder="全部"
                class="input-select"
                @visible-change="visibleChange"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </template>
          </el-col>
        </el-row>
        <el-row type="flex" class="middle">
          <el-col>运营人员</el-col>
          <el-col>运维人员</el-col>
        </el-row>
        <el-row class="empty-img">
          <el-col>
            <!-- <el-empty description="暂无数据"></el-empty> -->
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { gettaskReportInfoApi, AreaListApi } from '@/api/personnel'
import dayjs from 'dayjs'
export default {
  name: 'workStatistics',
  data() {
    return {
      options: [],
      value: '',
      value1: '',
      dimension: {}, //运维人员
      camp: {} // 运营人员
    }
  },

  created() {
    this.gettaskReportInfo()
  },

  methods: {
    //头部可视区域接口
    async gettaskReportInfo() {
      const start = dayjs().startOf('date').format('YYYY-MM-DD 00:00:00')
      const end = dayjs().endOf('date').format('YYYY-MM-DD 23:59:59')

      const res = await gettaskReportInfoApi(start, end)
      // console.log(res)
      this.camp = res.data[0]
      this.dimension = res.data[1]
    },
    //下拉区域列表
    async visibleChange() {
      const page = {
        pageIndex: 1,
        pageSize: 1000
      }
      const res = await AreaListApi(page)
      console.log(res)
      this.options = res.data.currentPageRecords
    }
  }
}
</script>

<style scoped lang="scss">
.Human-effect {
  //头部可视区域css样式
  .operate-Man {
    font-size: 16px;
    font-weight: 700;
    background: url('./components/backgroundImg/cc.png') #e9f3ff no-repeat;
    background-position: 485px 38px;
    margin-right: 10px;
    padding: 20px;
    border-radius: 15px;
    ::v-deep.el-col {
      margin-left: 30px;
    }
    span {
      font-size: 36px;
      color: #072074;
    }
    div {
      font-size: 12px;
      color: #91a7dc;
      margin-top: 5px;
    }
  }
  .maintenance-man {
    font-size: 16px;
    font-weight: 700;
    background: url('./components/backgroundImg/yw.png') #fbefe8 no-repeat;
    background-position: 485px 10px;
    margin-left: 10px;
    padding: 20px;
    border-radius: 15px;
    ::v-deep.el-col {
      margin-left: 30px;
    }
    span {
      font-size: 36px;
      color: #ff5757;
    }
    div {
      font-size: 12px;
      color: #de9690;
      margin-top: 5px;
    }
  }
  //内容区域css样式
  .left-message {
    height: calc(75vh - 90px);
    min-height: 542px;
    margin-top: 20px;
    background: #fff;
    border-radius: 15px;
    padding: 20px;
    margin-right: 15px;
    .title-cols {
      font-size: 16px;
      font-weight: 700;
    }
    .time-out {
      width: 230px;
      height: 32px;
      // margin-right: 21px;
      margin-left: 18px;
      padding: 3px 10px;
    }
    .time-madthoryear {
      ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        list-style: none;
        width: 120px;
        height: 34px;
        padding: 0 8px;
        margin-left: 100px;
        margin-top: -2px;
        background-color: #f7fbff;
      }
    }
    .empty-img {
      width: 100%;
      height: 100%;
      user-select: none;
      position: relative;
      background: url('./components/backgroundImg/zwsj.png') no-repeat;
      background-position: 370px 192px;
    }
  }
  .right-message {
    min-height: 542px;
    margin-top: 20px;
    background: #fff;
    border-radius: 15px;
    padding: 20px;
    .title-cols {
      font-size: 16px;
      font-weight: 700;
    }
    .input-select {
      width: 100px;
      height: 28px;
      background-color: #fff;
      margin-top: -5px;
    }
    .middle {
      align-items: center;
      margin-top: 18px;
      margin-left: 60px;
      background-color: #f7fbff;
      width: 174px;
      height: 34px;
      .el-col {
        font-size: 14px;
        color: #333333;
        background-color: #fff;
      }
    }
    .empty-img {
      width: 100%;
      height: 100%;
      user-select: none;
      position: relative;
      background: url('./components/backgroundImg/zwsj.png') no-repeat;
      background-position: 80px 155px;
    }
  }
}
</style>
