<script setup>
import { queryAllApi,addApi,updateApi,deleteApi } from "@/api/dept";
import { ref,onMounted } from "vue";
import { ElMessage } from "element-plus";
const deptList = ref([]);
onMounted(() => {
  search()
});
const search = async () => {
  const result = await queryAllApi()
  if(result.code){
    deptList.value = result.data
  }
};
const formTitle=ref("");
const dialogVisible=ref(false);
const dept=ref({name:''});
const save = async()=>{
  const result= await addApi(dept.value);
  if(result.code){
    ElMessage.success('新增部门成功');
    dialogVisible.value=false;
    search();
  }else{
    ElMessage.error(result.msg);
  }
}
const addDept= ()=>{
  dialogVisible.value=true;
  formTitle.value="新增部门";
  dept.value={name:''};
}
const editDept = ()=>{
  formTitle.value="编辑部门";
  dialogVisible.value=true;
}
</script>
<template>
  <h1>部门管理</h1>
  <div class="container">
    <el-button type="primary" @click="addDept">新增部门</el-button>
  </div>
  <div class="container">
    <el-table :data="deptList" border>
      <el-table-column type="index" label="序号" width="100" align="center" />
      <el-table-column prop="name"label="部门名称"width="260"align="center"/>
      <el-table-column prop="updateTime"label="更新时间" width="300"align="center"/>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" @click="editDept">编辑</el-button>
          <el-button type="danger" @click="deleteDept">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog :title="formTitle" v-model="dialogVisible" width="500">
    <el-form :model="dept">
      <el-form-item label="部门名称"label-width="120px" >
        <el-input v-model="dept.name"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="info" @click="dialogVisible = false">取消</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.container {
  margin: 20px;
}
</style>
