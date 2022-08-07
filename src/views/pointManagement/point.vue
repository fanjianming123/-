<template>
  <div>
    <el-card class="box-card">
      <SearchTop :searchItem="searchItem"> </SearchTop>
    </el-card>
  </div>
</template>

<script>
import SearchTop from '@/components/search/searchTop.vue'
export default {
  data() {
    return {
      searchItem: {
        firstItem: '工单编号',
        secondItem: '工单状态',
        isSelect: 'true',
        selectOption: [
          { label: '待办', value: '1' },
          { label: '进行', value: '2' },
          { label: '取消', value: '3' },
          { label: '完成', value: '4' }
        ],
        formInline: {
          user: '',
          region: ''
        }
      }
    }
  },
  components: {
    SearchTop
  },
  created() {},

  methods: {}
}
</script>

<style scoped>
.box-card {
  position: relative;
  padding: 20px px;
  background-color: #f8fafd;
  min-height: 1350px;
}
</style>
