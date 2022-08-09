<template>
  <div class="dashboard-container">
    <!-- 工单统计/销售统计区域 -->
    <el-row type="flex" class="title-Statistics">
      <el-col :span="10" class="left-Statistics">
        <span class="big-span">工单统计</span>
        <span class="mini-span">2022.08.01~2022.08.08</span>
        <el-row type="flex" class="main-info">
          <el-col>
            123
            <i>工单总数（个）</i>
          </el-col>
          <el-col>
            123
            <i>完成工单（个）</i>
          </el-col>
          <el-col>
            123
            <i>进行工单（个）</i>
          </el-col>
          <el-col>
            123
            <i>取消工单（个）</i>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8" class="right-Statistics">
        <span class="big-span">销售统计</span>
        <span class="mini-span">2022.08.01~2022.08.08</span>
        <el-row type="flex" class="main-info">
          <el-col>
            <div>1231</div>
            <div class="ming-message">订单量（个）</div>
          </el-col>
          <el-col>
            <div>2.28</div>
            <div class="ming-message">销售额（万元）</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 销售数据 -->
    <el-row type="flex" class="Sales-data">
      <el-col :span="8">
        <span class="big-span">销售数据</span>
        <span class="mini-span">2022.08.08~2022.08.08</span>
        <el-row>
          <el-col>销售趋势图区域</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <div class="time-year">
          <i v-for="(item, index) in timeDaty" :key="index">{{ item.day }}</i>
        </div>
        <div>暂无数据</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      timeDaty: [{ day: '周' }, { day: '月' }, { day: '年' }]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
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
    width: 980px;
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
    }
  }
}
</style>
