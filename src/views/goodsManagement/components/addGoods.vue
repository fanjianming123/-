<template>
  <el-dialog
    title="新增商品类型"
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
      <el-form-item label="商品类型名称:" prop="text">
        <el-input
          type="text"
          placeholder="请输入"
          v-model="formData.text"
          maxlength="10"
          show-word-limit
        >
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addGoodsType, editGoodsType, getGoodsList } from '@/api/goods'
export default {
  name: 'ADDGOODS',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    editGoodsTypeVal: {
      type: Object
    }
  },
  data() {
    const checkGoodsName = async (rule, value, cb) => {
      const {
        data: { currentPageRecords }
      } = await getGoodsList()
      const isRepeat = currentPageRecords.some(
        (item) => item.className === value
      )
      isRepeat ? cb(new Error('商品类型名称重复')) : cb()
    }
    return {
      formData: {
        text: '',
        classId: 0,
        parentId: 0
      },
      goodsRoules: {
        text: [
          { required: true, message: '请输入商品类型名称', trigger: 'blur' },
          {
            validator: checkGoodsName,
            trigger: 'blur'
          }
        ]
      }
    }
  },

  created() {},

  methods: {
    // 关闭弹窗
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        text: '',
        classId: 0,
        parentId: 0
      }
    },
    // 确定事件
    async onSave() {
      await this.$refs.form.validate()
      try {
        if (this.formData.text) {
          const res = await editGoodsType({
            classId: this.editGoodsTypeVal.classId,
            className: this.formData.text
          })
          console.log(res)
          this.$message.success('修改成功')
          this.onClose()
          this.$emit('addGoods')
        } else {
          await addGoodsType({
            className: this.formData.text
          })
          this.$message.success('添加成功')
          this.formData.text = ''
          this.onClose()
          this.$emit('addGoods')
        }
      } catch (error) {
        this.$message.error('操作失败')
      }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
  width: 620px;
  height: 210px;
  border-radius: 10px;
  //   取消按钮
  .el-button--default {
    position: absolute;
    left: 204px;
    top: 145px;
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
}
</style>
