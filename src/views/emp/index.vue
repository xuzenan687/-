<template>
  <h1>员工管理</h1>

  <div class="container">
    {{ searchEmp }}
    <el-form :inline="true" :model="searchEmp" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="searchEmp.name" placeholder="请输入姓名" style="width: 110px;"/>
      </el-form-item>
      <el-form-item label="性别" >
        <el-select v-model="searchEmp.gender" placeholder="请选择性别">
          <el-option label="男" value="1" />
          <el-option label="女" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="入职日期" width="100px">
        <el-date-picker
          v-model="searchEmp.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-left: 10px" @click="search">查询</el-button>
        <el-button type="info" style="margin-left: 10px" @click="clear">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- 功能按钮 -->
  <div class="container">
    <el-button type="primary" style="margin-left: 10px" @click="">+ 新增员工</el-button>
    <el-button type="danger" style="margin-left: 10px" @click="">- 批量删除</el-button>
  </div>

  <!-- 数据表格 -->
   <div class="container">
    <el-table :data="empList" style="width: 100%">
      <el-table-column type="selection" width="30" align="center"/>
      <!-- 居中显示 -->
      <el-table-column prop="name" label="姓名" width="100" align="center" />
      <el-table-column label="性别" width="100" align="center">
        <template #default="scope">
          {{scope.row.gender==1?'男':'女'}}
        </template>
      </el-table-column>
      <el-table-column prop="image" label="头像" width="100" align="center">
        <template #default="scope">
          <el-image 
            v-if="scope.row.image" 
            :src="scope.row.image" 
            :preview-src-list="[scope.row.image]" 
            fit="contain" 
            style="width: 40px; height: 40px;"
          />
          <span v-else>无头像</span>
        </template>
      </el-table-column>
      <el-table-column prop="deptName" label="所属部门" width="100" align="center"/>
      <el-table-column label="职位" width="100" align="center">
        <template #default="scope">
          <span v-if="scope.row.job=='1'">班主任</span>
          <span v-else-if="scope.row.job=='2'">讲师</span>
          <span v-else-if="scope.row.job=='3'">学工主管</span>
          <span v-else-if="scope.row.job=='4'">教研主管</span>
          <span v-else-if="scope.row.job=='5'">咨询师</span>
          <span v-else>其他</span>
        </template>
      </el-table-column>
      <el-table-column prop="entryDate" label="入职日期" width="180" align="center"/>
      <el-table-column prop="updateTime" label="最后操作时间" width="200" align="center"/>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
   </div>

   <!-- 分页条 -->
   <div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 50]"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChage"
      @current-change="handleCurrentChage"
    ></el-pagination>
   </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// 导入图标组件
import { EditPen, Delete } from '@element-plus/icons-vue'

const searchEmp = ref({
  name: '',
  gender: '',
  date: [],
  begin: '',
  end: '',
});

const empList = ref([
  {
    name: '张三',
    gender: '1',
    image: '',
    deptName: '',
    job: '1',
    entryDate: '',
    updateTime: '',
  },
]);

// 监听
watch(() => searchEmp.value.date, (newValue, oldValue) => {
  if (newValue.length > 0) {
    searchEmp.value.begin = newValue[0];
    searchEmp.value.end = newValue[1];
  } else {
    searchEmp.value.begin = '';
    searchEmp.value.end = '';
  }
})

const search = () => {
  console.log(searchEmp.value);
}

const clear = () => {
  searchEmp.value = { name: '', gender: '', date: [], begin: '', end: '' };
  search();
}

// 分页
const currentPage = ref(1);
const pageSize = ref(5);
const background = ref(true);
const total = ref(50);

const handleSizeChage = (val) => {
  console.log(val);
  pageSize.value = val;
}

const handleCurrentChage = (val) => {
  console.log(val);
  currentPage.value = val;
}
</script>

<style scoped>
.container {
  margin: 10px 0px;
}
</style>