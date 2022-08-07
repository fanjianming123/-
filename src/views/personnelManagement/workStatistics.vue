<template>
  <div class="Human-effect">
    <el-row type="flex">
      <el-col class="operate-Man">
        运营人员（当天）
        <el-row type="flex" align="center">
          <el-col
            ><span>5</span>
            <div>工单总数(个)</div></el-col
          >
          <el-col>
            <span>0</span>
            <div>完成工单(个)</div></el-col
          >
          <el-col
            ><span>3</span>
            <div>拒绝工单(个)</div></el-col
          >
          <el-col
            ><span>18</span>
            <div>运营人员数(个)</div></el-col
          >
        </el-row>
      </el-col>
      <el-col class="maintenance-man">
        运维人员（当天）
        <el-row type="flex" align="center">
          <el-col
            ><span>5</span>
            <div>工单总数(个)</div></el-col
          >
          <el-col>
            <span>0</span>
            <div>完成工单(个)</div></el-col
          >
          <el-col
            ><span>3</span>
            <div>拒绝工单(个)</div></el-col
          >
          <el-col
            ><span>18</span>
            <div>运营人员数(个)</div></el-col
          >
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},

  methods: {}
}
</script>

<style scoped lang="scss">
.Human-effect {
  .operate-Man {
    font-size: 16px;
    font-weight: 700;
    // background-color: #e9f3ff;
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
}
</style>
