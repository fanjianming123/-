<template>
  <div>
    <searchTop :searchItem="searchItem"></searchTop>
  </div>
</template>

<script>
import searchTop from '@/components/search/searchTop.vue'
export default {
  data() {
    return {
      searchItem: {
        firstItem: '商品类型搜索',
        secondItem: '工单状态',
        isSelect: false,
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

  created() {},
  components: {
    searchTop
  },
  methods: {}
}
</script>

<style scoped></style>
