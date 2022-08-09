<!--  -->
<template>
  <div>
    <el-upload
      class="upload-demo"
      action=""
      :limit="1"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      accept=".xls, .xlsx"
      :http-request="handlePictureCardPreview"
    >
      <span class="title">标题：</span>
      <el-button size="small" type="primary" class="UploadBtn">
        <i class="el-icon-upload"></i>
        点击上传</el-button
      >
      <div slot="tip" class="el-upload__tip">
        只能上传xls/xlsx文件，且不超过1MB
      </div>
    </el-upload>
    <div class="addWorkBtn">
      <el-button @click="CancelBtn">取 消</el-button>
      <el-button type="primary" @click="addFileList">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { uploadGoods } from '@/api/goods'
// import lsButton from '@/components/ls-button'
export default {
  data() {
    return {
      fileList: [],
      file: ''
    }
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  methods: {
    // 取消关闭弹框
    CancelBtn() {
      this.$emit('CancelBtn')
    },
    async addFileList() {
      console.log(this.file)
      try {
        var formData = new FormData()
        formData.append('fileName', this.file.file)
        await uploadGoods(formData)
        this.$emit('CancelBtn')
        this.$message.success('导入成功')
      } catch (err) {
        1
      }
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isLt2kb = file.size / 1024 / 1024 < 1
      if (!isLt2kb) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isLt2kb
    },
    async handlePictureCardPreview(file) {
      this.file = file
    }
  }
}
</script>
<style scoped>
.addWorkBtn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.UploadBtn {
  width: 221px;
  height: 38px;
  position: absolute;
  top: 60px;
  left: 180px;
}
.title {
  position: absolute;
  top: 70px;
  left: 124px;
}
.el-upload__tip {
  margin-left: 170px;
  margin-bottom: 20px;
}
</style>
