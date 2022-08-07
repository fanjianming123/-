<template>
  <button :class="[type]">
    <slot></slot>
  </button>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    type: {
      type: String,
      default: 'default'
    }
  },
  created() {},

  methods: {}
}
</script>

<style scoped lang="scss">
button {
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  font-size: 14px;
  border-radius: 4px;
  &:hover {
    z-index: 1;
    background: rgba(0,0,0,.5);
  }
}
.primary {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  align-items: center;
  min-width: 80px;
  height: 36px;
  padding: 0;
  background-color: #5f84ff;
  border: none;
  border-radius: 5px;
  color: #fff;
}
.newTableColumn {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 80px !important;
  height: 36px;
  padding: 0;
  background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
  border: none;
  color: #fff;
  font-size: 15px;
  margin-right: 15px;
}
.configuration {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 80px !important;
  height: 36px;
  padding: 0;
  background-color: #fbf4f0 !important;
  border: none;
  color: #655b56 !important;
  
}
</style>
