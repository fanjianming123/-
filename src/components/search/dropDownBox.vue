<template>
  <el-select v-model="formInline.region" placeholder="活动区域">
    <el-option label="区域一" value="shanghai"></el-option>
    <el-option label="区域二" value="beijing"></el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
    };
  },

  created() {},

  methods: {},
};
</script>

<style scoped></style>
