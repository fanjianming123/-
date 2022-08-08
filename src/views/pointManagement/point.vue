<template>
  <div>
    <SearchTop :searchItem="searchItem"> </SearchTop>
  </div>
</template>

<script>
import SearchTop from '@/views/equipmentManagement/components/searchTop.vue'
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

<style scoped></style>
