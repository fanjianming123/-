<template>
  <div>
    <!-- 头部 -->
    <div class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="订单编号:">
          <el-input
            v-model="formInline.user"
            placeholder="请输入订单编号"
          ></el-input>
        </el-form-item>
        <span>选择日期：</span>
        <el-date-picker
          v-model="valueTime"
          type="daterange"
          value-format='yyyy-MM-dd'
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">
            <i class="el-icon-search"></i>
            查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valueTime: '',
      formInline: {
        user: ''
      }
    }
  },

  created() {},

  methods: {
    onSubmit() {
      // console.log('submit!')
      // console.log(this.formInline.user);
      this.$emit('submit', this.formInline.user,this.valueTime)
      this.formInline.user = ''
      // console.log(this.valueTime)
      // this.$emit('submit', this.valueTime)

    },
    onRemove() {
      this.isShowDialog = true
    },
    close() {
      this.isShowDialog = false
    },
    isConfig() {
      this.isShowConfig = true
    }
  }
}
</script>

<style scoped>
.demo-form-inline {
  padding: 15px;
}
.box-card {
  width: 100%;
  height: 64px;
  margin-top: 10px;
  /* margin-left: 5px; */
  margin-bottom: 20px;
  background-color: #fff;
}
</style>
