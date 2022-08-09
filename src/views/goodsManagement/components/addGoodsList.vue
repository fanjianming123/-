<template>
  <el-dialog
    :title="isShowTitle"
    :visible="visible"
    width="30%"
    @close="onClose"
  >
    <el-form
      ref="form"
      :rules="goodsRoules"
      :model="formData"
      label-width="120px"
    >
      <el-form-item label="商品名称:" prop="brandName">
        <el-input
          type="text"
          placeholder="请输入"
          v-model="formData.brandName"
          maxlength="15"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="品牌:" prop="skuName">
        <el-input
          type="text"
          placeholder="请输入"
          v-model="formData.skuName"
          maxlength="10"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="商品价格(元):" prop="price">
        <el-input-number
          controls-position="right"
          v-model="formData.price"
          placeholder="请输入"
          @change="handleChange"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="商品类型" prop="classId">
        <el-select v-model="formData.classId" placeholder="请选商品类型">
          <el-option
            :label="item.className"
            :value="item.classId"
            v-for="item in formData.className1"
            :key="item.classId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格:" prop="unit">
        <el-input
          type="text"
          placeholder="请输入"
          v-model="formData.unit"
          maxlength="10"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="商品图片:" prop="imageUrl">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="formData.skuImage"
            :src="formData.skuImage"
            class="avatar"
          />
          <i v-else class="el-icon-upload avatar-uploader-icon"></i>
        </el-upload>
        <span class="prompt">支持扩展名：jpg、png，文件不得大于100kb</span>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getGoodsList, addGoods, editGoods } from '@/api/goods'
export default {
  name: 'ADDGOODSs',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
    // editGoodsTypeVal: {
    //   type: Object
    // }
  },
  data() {
    return {
      formData: {
        brandName: '',
        skuImage: '',
        skuName: '',
        unit: '',
        price: '',
        className1: [],
        classId: '',
        skuId: ''
      },
      goodsRoules: {
        brandName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        skuImage: [
          { required: true, message: '请上传商品图片', trigger: 'blur' }
        ],
        skuName: [
          { required: true, message: '请输入商品品牌', trigger: 'blur' }
        ],
        unit: [{ required: true, message: '请输入商品规格', trigger: 'blur' }],
        price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        className1: [
          { required: true, message: '请输入商品类型', trigger: 'blur' }
        ]
      }
    }
  },

  created() {},

  methods: {
    //商品类型
    async getGoodsList() {
      const res = await getGoodsList()
      // console.log(res.data.currentPageRecords)
      this.formData.className1 = res.data.currentPageRecords
    },
    handleChange(value) {
      console.log(value)
    },
    //上传图片
    handleAvatarSuccess(res, file) {
      this.formData.skuImage = URL.createObjectURL(file.raw)
    },
    //上传图片
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt100kb = file.size / 1024 / 1024 / 1024 < 200

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt100kb) {
        this.$message.error('上传头像图片大小不能超过 100kb!')
      }
      return isJPG && isLt100kb
    },

    // 关闭弹窗
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        brandName: '',
        skuImage: '',
        skuName: '',
        unit: '',
        price: '',
        classId: ''
      }
    },
    // 确定事件
    async onSave() {
      await this.$refs.form.validate()
      try {
        if (this.formData.skuId) {
          await editGoods(this.formData)
          this.$message.success('修改成功')
          this.onClose()
          this.$emit('addGoods')
        } else {
          await addGoods(this.formData)
          this.$message.success('添加成功')
          this.onClose()
          this.$emit('addGoods')
        }
      } catch (error) {
        this.$message.error(error)
      }
    }
  },
  computed: {
    isShowTitle() {
      return this.formData.skuId ? '修改商品' : '新增商品'
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
  width: 630px;
  height: 620px;
  border-radius: 10px;
  //   取消按钮
  .el-button--default {
    position: absolute;
    left: 204px;
    bottom: 29px;
    background-color: #fbf4f0;
    width: 80px;
    height: 36px;
    border-color: #fbf4f0;
    color: #655b56;
  }
  //   确定按钮
  .el-button--primary {
    position: absolute;
    right: 185px;
    bottom: 29px;
    background-color: #e54a14;
    color: #fff;
    border-color: #e54a14;
    width: 80px;
    height: 36px;
  }
  //   名称
  .el-form-item__label {
    font-weight: normal;
    font-size: 14px;
    color: #606266;
  }
  //input框
  .el-input__inner {
    width: 396px;
    height: 36px;
  }
  .el-input__count {
    margin-right: 20px;
    color: #bac0cd;
  }
  .el-input-number__decrease {
    right: -216px;
  }
  .el-input-number__increase {
    right: -216px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 84px;
    height: 84px;
    line-height: 84px;
    text-align: center;
  }
  .avatar {
    width: 84px;
    height: 84px;
    display: block;
  }
  .prompt {
    font-size: 14px;
    color: #bac0cd;
  }
}
</style>
