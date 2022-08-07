<template>
  <el-card class="box-card">
    <div class="top">
      <span>工单编号:</span>
      <inputBox></inputBox>
      <span>工单状态:</span>
      <DownBox style="margin-right: 10px"></DownBox>
      <searchBtn></searchBtn>
    </div>
    <div class="bottom">
      <el-button icon="el-icon-circle-plus-outline" class="elBtn">
        新建
      </el-button>
      <el-button class="elbtnTwo">工单配置</el-button>
      <!-- 表格 -->
      <el-table :data="tableData" stripe style="width: 98%; margin: auto">
        <el-table-column type="index" :label="workOrderTitle.index" width="100">
        </el-table-column>
        <el-table-column
          prop="taskCode"
          :label="workOrderTitle.taskCode"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="innerCode"
          :label="workOrderTitle.innerCode"
          width="220"
        >
        </el-table-column>
        <el-table-column
          prop="taskType.typeName"
          :label="workOrderTitle.taskType.typeName"
          width="190"
        >
        </el-table-column>
        <el-table-column
          prop="createType"
          :label="workOrderTitle.createType"
          width="190"
        >
        </el-table-column>
        <el-table-column
          prop="taskStatusTypeEntity.statusName"
          :label="workOrderTitle.taskStatus"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="userName"
          :label="workOrderTitle.userName"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="updateTime"
          :label="workOrderTitle.updateTime"
          width="220"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          :label="workOrderTitle.operation"
          width="180"
        >
          <el-button type="text" size="small"> 查看详情 </el-button>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="paging">
        <div>共<span>985</span>条记录 第<span>1</span>/<span>99</span>页</div>
        <div class="pagingBtn">
          <el-button>上一页</el-button>
          <el-button>下一页</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import inputBox from "@/components/search/input.vue";
import DownBox from "@/components/search/dropDownBox.vue";
import searchBtn from "@/components/search/searchBtn.vue";
import { getWorkOrderList } from "@/api/workOrder";
export default {
  data() {
    return {
      workOrderTitle: {
        index: "序号",
        taskCode: "工单编号",
        innerCode: "设备编号",
        taskType: { typeName: "工单类型" },
        createType: "工单方式",
        taskStatus: "工单状态",
        userName: "运营人员",
        updateTime: "创建时间",
        operation: "操作",
      },
      tableData: [],
    };
  },
  updated() {
    this.tableData.forEach((item) => {
      return (item.createType = item.createType ? "手动" : "自动");
    });
    this.tableData.forEach((item) => {
      return (item.updateTime = item.updateTime.replace("T", " "));
    });
  },
  created() {
    this.getWorkOrderList();
  },

  methods: {
    async getWorkOrderList() {
      const res = await getWorkOrderList();
      console.log(res.data);
      this.tableData = res.data.currentPageRecords;
    },
  },
  components: {
    inputBox,
    DownBox,
    searchBtn,
  },
};
</script>

<style scoped lang="scss">
.box-card {
  min-height: 1350px;
  background-color: #f8fafd;
  .top {
    height: 60px;
    background-color: #fff;
    display: flex;
    align-items: center;
    span {
      margin-right: 10px;
      margin-left: 10px;
    }
  }
  .bottom {
    height: 840px;
    margin-top: 20px;
    background-color: #fff;
    .elBtn {
      background-color: #ff893b;
      color: #fff;
      font-size: 14px;
      margin: 20px 10px 20px 18px;
    }
    .elbtnTwo {
      background-color: #fbf4f0;
      color: black;
    }
    //  分页
    .paging {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 50px 0 50px 50px;
      color: #dbdfe5;
      font-size: 16px;
      .pagingBtn {
        display: flex;
        margin-right: 60px;
      }
    }
  }
}
</style>
