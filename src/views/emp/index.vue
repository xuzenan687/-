<template>
  <h1>员工管理</h1>
  <!-- 修改员工对话框 -->
  <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="employee" label-width="80px">
        <!-- 基本信息 -->
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名">
              <el-input v-model="employee.username" placeholder="请输入员工用户名，2-20个字"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="employee.name" placeholder="请输入员工姓名，2-10个字"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="性别">
              <el-select v-model="employee.gender" placeholder="请选择性别" style="width: 100%;">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="手机号">
              <el-input v-model="employee.phone" placeholder="请输入员工手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="职位">
              <el-select v-model="employee.job" placeholder="请选择职位" style="width: 100%;">
                <el-option label="班主任" value="1"></el-option>
                <el-option label="讲师" value="2"></el-option>
                <el-option label="学工主管" value="3"></el-option>
                <el-option label="教研主管" value="4"></el-option>
                <el-option label="咨询师" value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="薪资">
              <el-input v-model="employee.salary" placeholder="请输入员工薪资"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第四行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属部门">
              <el-select v-model="employee.deptId" placeholder="请选择部门" style="width: 100%;">
                <el-option label="研发部" value="1"></el-option>
                <el-option label="市场部" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入职日期">
              <el-date-picker v-model="employee.entryDate" type="date" style="width: 100%;" placeholder="选择日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第五行 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                action="/api/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                >
                <img v-if="employee.image" :src="employee.image" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        

        <!-- 工作经历 -->
        <!-- 第六行 -->
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="工作经历">
              <el-button type="success" size="small" @click="">+ 添加工作经历</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        
        <!-- 第七行 ...  工作经历 -->
        <el-row :gutter="3">
          <el-col :span="10">
            <el-form-item size="small" label="时间" label-width="80px">
              <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item size="small" label="公司" label-width="60px">
              <el-input placeholder="请输入公司名称"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item size="small" label="职位" label-width="60px">
              <el-input placeholder="请输入职位"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="2">
            <el-form-item size="small" label-width="0px">
              <el-button type="danger" >- 删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      
      <!-- 底部按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="">保存</el-button>
        </span>
      </template>
  </el-dialog>




<!-- 搜索栏 -->
  <div class="container">
    {{ searchEmp }}
    <el-form :inline="true" :model="searchEmp" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="searchEmp.name" placeholder="请输入姓名" style="width: 110px;"/>
      </el-form-item>
      <el-form-item label="性别" >
        <el-select v-model="searchEmp.gender" placeholder="请选择性别">
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
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
    <el-button type="primary" style="margin-left: 10px" @click="addEmp">+ 新增员工</el-button>
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
      {{ currentPage }} : {{ pageSize }}
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
import { ref, watch,onMounted } from 'vue'
import { queryPageApi } from '@/api/emp'

// 导入图标组件
import { EditPen, Delete } from '@element-plus/icons-vue'
const addEmp = () => {
  dialogVisible.value = true;
  dialogTitle.value='新增员工';
}

const search = async () => {
  const result=await queryPageApi(
    searchEmp.value.name,searchEmp.value.gender,
    searchEmp.value.begin,searchEmp.value.end,
    currentPage.value,pageSize.value);
    if(result.code){
      total.value=result.data.total;
      empList.value=result.data.rows;
    }
}
onMounted(() => {
  search();
})

const searchEmp = ref({
  name: '',
  gender: '',
  date: [],
  begin: '',
  end: '',
});
const dialogVisible = ref(false);
const dialogTitle = ref('');
const currentPage = ref(1);
const pageSize = ref(10);
const background = ref(true);
const total = ref();
const empList = ref([]);
const employee = ref({
  username: '',
  name: '',
  gender: '',
  phone: '',
  job: '',
  salary: '',
  deptId: '',
  entryDate: '',
  image: '',
  exprList: []
})
// 监听
watch(() => searchEmp.value.date, (newValue, oldValue) => {
  if (newValue.length == 2) {
    searchEmp.value.begin = newValue[0];
    searchEmp.value.end = newValue[1];
  } else {
    searchEmp.value.begin = '';
    searchEmp.value.end = '';
  }
})



const clear = () => {
  searchEmp.value = { name: '', gender: '', date: [], begin: '', end: '' };
  search();
}

// 分页

const handleSizeChage = (val) => {
  search();
}

const handleCurrentChage = (val) => {
  search();
}
</script>





<style scoped>
.container {
  margin: 10px 0px;
}

.avatar {
  height: 40px;
}
.avatar-uploader .avatar {
  width: 78px;
  height: 78px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  text-align: center;
  border-radius: 10px;
  /* 添加灰色的虚线边框 */
  border: 1px dashed var(--el-border-color);
}
</style>