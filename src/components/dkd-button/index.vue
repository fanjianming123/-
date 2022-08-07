<template>
  <div class="btn">
    <el-button
      size="small"
      :class="user"
      :icon="iconName"
      @click="$emit('click')"
      ><slot></slot
    ></el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  props: ['user'],

  computed: {
    iconName() {
      if (this.user === 'query') {
        return 'el-icon-search'
      } else if (this.user === 'create') {
        return 'el-icon-circle-plus-outline'
      } else {
        return ''
      }
    }
  },

  created() {},

  methods: {}
}
</script>

<style scoped lang="scss">
.btn {
  .el-button--small {
    font-size: 14px;
    color: #fff;
    width: 80px;
    height: 36px;
    border: unset;
  }
  .query {
    background-color: #5f84ff;
  }
  .create {
    background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
  }
  .sure {
    background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
  }
  .cancel {
    background-color: #fbf4f0 !important;
    color: #655b56 !important;
  }
}
</style>
