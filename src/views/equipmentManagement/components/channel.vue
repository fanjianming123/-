<template>
  <div>
    <el-dialog
      title="货道设置"
      :visible="vmChanneldialogVisible"
      width="940px"
      @close="onClose"
    >
      <!-- 上方售货机详情和智能排序 -->
      <el-row
        type="flex"
        justify="space-between"
        align="middle"
        style="background-color: #f3f6fb; height: 56px; margin-bottom: 15px"
      >
        <el-col :span="14">
          <span style="margin: 0 0 0 40px">货道行数：{{ types.vmRow }}</span>
          <span style="margin: 0 40px">货道列数：{{ types.vmCol }}</span>
          <span>货道容量（个）：{{ types.channelMaxCapacity }}</span>
        </el-col>
        <el-col :span="4">
          <el-button size="small" class="create" @click="sortFn"
            >智能排货</el-button
          >
        </el-col>
      </el-row>

      <!-- el-scrollbar部分 -->
      <div class="scrollbar">
        <el-scrollbar style="height: 100%" ref="elbar">
          <div
            v-for="(i, index) in channelList.length / 10"
            :key="index"
            style="margin-bottom: 60px"
          >
            <el-row class="scrollbar-item" type="flex" :gutter="12">
              <el-col
                v-for="item in List(index)"
                :key="item.channelCode"
                :span="26"
              >
                <el-row class="sku">
                  <div class="tag">{{ item.channelCode }}</div>
                  <img :src="skuImage(item)" alt="" v-imgError="defaultImg" />
                  <p>{{ skuName(item) }}</p>
                  <el-card
                    style="margin-top: 28px"
                    body-style="width: 150px; padding:0;text-align:center;"
                  >
                    <el-button type="text" @click="addGood">添加</el-button>
                    <el-button
                      type="text"
                      :style="{ color: !item.sku ? '#eee' : 'red' }"
                      :disabled="!item.sku"
                      @click="delGood(item)"
                      >删除</el-button
                    >
                  </el-card>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-scrollbar>
        <el-button
          icon="el-icon-arrow-left"
          style="font-size: 40px"
          type="text"
          class="left-arrow"
          @click="clickArrowLeft"
        ></el-button>
        <el-button
          icon="el-icon-arrow-right"
          style="font-size: 40px"
          type="text"
          class="right-arrow"
          @click="clickArrowRight"
        ></el-button>
      </div>

      <!-- 智能排序弹层 -->
      <el-dialog
        title="智能排货"
        append-to-body
        width="50%"
        :visible.sync="businessTopdialogVisible"
        @close="onClosebusinessTop"
      >
        <p v-if="!isAdd">
          该区域属于{{ businessType.name }}商圈适合销售一下商品：
        </p>
        <searchTop
          v-else
          :searchItem="searchItem"
          @searchForm="searchFormFn"
        ></searchTop>
        <el-row type="flex">
          <el-col
            style="margin: 10px"
            :span="6"
            class="sortSku"
            v-for="(item, index) in TopList1"
            :key="index"
          >
            <img :src="item.image" alt="" v-if="!isAdd" />
            <img :src="item.skuImage" alt="" v-else />
            <p>{{ item.skuName }}</p>
          </el-col>
        </el-row>
        <el-row type="flex" v-if="TopList.length > 5">
          <el-col
            style="margin: 10px"
            :span="6"
            class="sortSku"
            v-for="(item, index) in TopList2"
            :key="index"
          >
            <img :src="item.image" alt="" v-if="!isAdd" />
            <img :src="item.skuImage" alt="" v-else />
            <p>{{ item.skuName }}</p>
          </el-col>
        </el-row>
        <el-button
          v-if="isAdd"
          icon="el-icon-arrow-left"
          style="font-size: 40px"
          type="text"
          class="left-arrow1"
          @click="clickArrowLeft1"
        ></el-button>
        <el-button
          v-if="isAdd"
          icon="el-icon-arrow-right"
          style="font-size: 40px"
          type="text"
          class="right-arrow1"
          @click="clickArrowRight1"
        ></el-button>
        <span class="dialog-footer">
          <dkd-button user="sure" @click="sureAdvice">采纳建议</dkd-button>
        </span>
      </el-dialog>
      <!-- 下方按钮 -->
      <span slot="footer" class="dialog-footer">
        <dkd-button user="sure">确定</dkd-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import searchTop from './searchTop.vue'
import defaultImg from '@/assets/404_images/none.png'
import { getbusinessTopAPI, getskusearchAPI } from '@/api/equipment'
export default {
  data() {
    return {
      searchItem: {
        firstItem: '商品名称',
        secondItem: '',
        isSelect: false,
        formInline: {
          user: ''
        }
      },
      defaultImg,
      businessTopdialogVisible: false,
      businessType: {},
      TopList1: [],
      TopList2: [],
      TopList: [],
      isAdd: false,
      currentpageIndex: 1
    }
  },
  components: {
    searchTop
  },
  props: {
    vmChanneldialogVisible: {
      type: Boolean,
      default: false
    },
    currentVm: {
      type: Object,
      default: () => ({})
    },
    channelList: {
      type: Array,
      default: () => []
    }
  },
  created() {},
  computed: {
    types() {
      return this.currentVm.type
    },
    List() {
      return (index) => {
        return this.channelList.slice(10 * index, (index + 1) * 10)
      }
    },
    skuImage() {
      return (item) => {
        if (item.sku?.skuImage.indexOf('blob') !== -1) {
          return item.sku?.skuImage.replace('blob:', '')
        }
        return item.sku?.skuImage
      }
    },
    skuName() {
      return (item) => {
        return item.sku?.skuName ?? '暂无商品'
      }
    }
  },
  methods: {
    onClose() {
      this.$emit('update:vmChanneldialogVisible', false)
    },
    // 左箭头点击事件
    clickArrowLeft() {
      this.$refs['elbar'].wrap.scrollLeft =
        this.$refs['elbar'].wrap.scrollLeft - 820
    },
    // 右箭头点击事件
    clickArrowRight() {
      this.$refs['elbar'].wrap.scrollLeft = this.$refs['elbar'].wrap.scrollWidth
      this.sLeft = this.$refs['elbar'].wrap.scrollLeft
    },
    // 删除商品
    delGood(item) {},
    //采纳建议
    sureAdvice() {
      this.onClosebusinessTop()
    },
    async sortFn() {
      console.log(this.currentVm)
      this.businessType = this.currentVm.node.businessType
      const res = await getbusinessTopAPI(this.currentVm.businessId)
      const arr = res.data
      this.TopList = res.data
      if (arr.length < 5) {
        this.TopList1 = arr
      } else {
        this.TopList1 = [arr[0], arr[1], arr[2], arr[3], arr[4]]
        this.TopList2 = [arr[5], arr[6], arr[7], arr[8], arr[9]]
      }
      //   console.log(this.TopList1)
      this.businessTopdialogVisible = true
    },
    //关闭top10商品弹层
    onClosebusinessTop() {
      this.businessTopdialogVisible = false
      this.isAdd = false
    },
    addGood() {
      this.isAdd = true
      this.getskusearch(this.currentpageIndex)
      this.businessTopdialogVisible = true
    },
    async getskusearch(page,skuName) {
      const res = await getskusearchAPI(page,skuName)
      console.log(res)
      const arr = res.data.currentPageRecords
      if (arr.length <= 5) {
        this.TopList1 = arr
      } else {
        this.TopList1 = [arr[0], arr[1], arr[2], arr[3], arr[4]]
        this.TopList2 = [arr[5], arr[6], arr[7], arr[8], arr[9]]
      }
    },
    async clickArrowLeft1() {
      if (this.currentpageIndex < 1) return
      this.currentpageIndex -= 1
      console.log(this.currentpageIndex)
      await this.getskusearch(this.currentpageIndex)
    },
    // 右箭头点击事件
    async clickArrowRight1() {
      if (this.TopList.length2 < 0) return
      this.currentpageIndex += 1
      console.log(this.currentpageIndex)
      await this.getskusearch(this.currentpageIndex)
    },
    searchFormFn(val) {
      console.log(val)
      this.getskusearch(1,val.user)
    }
  }
}
</script>

<style scoped lang="scss">
.sortSku {
  position: relative;
  width: 134px;
  height: 134px;
  padding-top: 16px;
  background-color: #f6f7fb;
  -webkit-box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%);
  border-radius: 4px;
  text-align: center;

  img {
    display: inline-block;
    width: 83px;
    height: 84px;
    margin-bottom: 5px;
    -o-object-fit: contain;
    object-fit: contain;
  }
  p {
    width: 102px;
    margin: 0 auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.left-arrow1 {
  position: absolute;
  left: 0px;
  top: 233px;
}
.right-arrow1 {
  position: absolute;
  right: 0px;
  top: 233px;
}
.dialog-footer {
  text-align: center;
}
.el-button--small {
  font-size: 14px;
  color: #fff;
  width: 80px;
  height: 36px;
  border: unset;
}
.create {
  background-color: #5f84ff;
}

.scrollbar {
  position: relative;
  width: 814px;
  height: 384px;
  margin: 0 auto;
  .left-arrow {
    position: absolute;
    left: -50px;
    top: 153px;
  }
  .right-arrow {
    position: absolute;
    right: -50px;
    top: 153px;
  }

  .scrollbar-item {
    width: 150px;
    height: 135px;
  }

  .sku {
    position: relative;
    height: 135px;
    padding-top: 16px;
    background-color: #f6f7fb;
    border-radius: 4px;
    text-align: center;
    padding-bottom: 10px;
    .tag {
      position: absolute;
      top: 10px;
      left: 0;
      width: 43px;
      height: 23px;
      line-height: 23px;
      background: #829bed;
      border-radius: 0 10px 10px 0;
      font-size: 12px;
      color: #fff;
    }
    img {
      display: inline-block;
      width: 84px;
      height: 78px;
      margin-bottom: 10px;
      -o-object-fit: contain;
      object-fit: contain;
    }
    p {
      position: absolute;
      bottom: 10px;
      left: 50px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .btn {
    display: flex;
    justify-content: center;
  }
}
</style>
