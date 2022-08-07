<template>
  <el-input v-model="input" placeholder="请输入"></el-input>
</template>

<script>
export default {
  data() {
    return {
      input: "",
    };
  },

  created() {},

  methods: {},
};
</script>

<style scoped lang="scss">
::v-deep.el-input {
  width: 200px;
  height: 40px;
}
</style>
