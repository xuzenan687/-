<script setup>
import { ref,onMounted } from "vue";
import { queryAllApi,queryByIdApi,addApi,updateApi,deleteApi } from "@/api/dept";
import { ElMessage, ElMessageBox } from "element-plus";
const deptList = ref([]);

const formTitle=ref("");
const dialogVisible=ref(false);
const dept=ref({name:''});
onMounted(() => {
  search()
});
const search = async () => {
  const result = await queryAllApi();
  if(result.code){
    deptList.value = result.data;
  }
};
const save = async()=>{
 if(!deptFormRef.value) return;
 deptFormRef.value.validate(async (valid) =>{//校验
  if(valid){
    let result;
    if(dept.value.id){
      result = await updateApi(dept.value);
      if(result.code){
        ElMessage.success('修改部门成功');
        dialogVisible.value=false;
        search();
      }else{
        ElMessage.error(result.msg);
      }
    }else{
      result = await addApi(dept.value);
      if(result.code){
        ElMessage.success('新增部门成功');
        dialogVisible.value=false;
        search();
      }else{
        ElMessage.error(result.msg);
      }
    }
  }else{
    ElMessage.error('表单校验失败');
  }
 });
}
const addDept= ()=>{
  dialogVisible.value=true;
  formTitle.value="新增部门";
  dept.value={name:''};
  if(deptFormRef.value){
    deptFormRef.value.resetFields();
  }
}
const editDept = async (id)=>{
  if(deptFormRef.value){
    deptFormRef.value.resetFields();//重置检验
  }
  const result = await queryByIdApi(id);
  if(result.code){
    dialogVisible.value=true;
    formTitle.value="编辑部门";
    dept.value=result.data;
  }else{
    ElMessage.error(result.msg);
  }
}

const deleteDept = async (id)=>{
  ElMessageBox.confirm('确认删除该部门吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const result = await deleteApi(id);
    if(result.code){
      ElMessage.success('删除部门成功');
      search();
    }else{
      ElMessage.error(result.msg);
    }
  }).catch(()=>{
    ElMessage.info('取消删除');
  })
}
//表单校验
const rules = ref({
  name:[
    {required:true,message:'部门名称不能为空',trigger:'blur'},
    {min:2,max:10,message:'部门名称长度必须在2-10之间',trigger:'blur'}
  ]
})
const deptFormRef=ref();
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
          <el-button type="primary" @click="editDept(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="deleteDept(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog :title="formTitle" v-model="dialogVisible" width="500">
    <!-- {{ dept }} -->
    <el-form :model="dept" :rules="rules" ref="deptFormRef">
      <el-form-item label="部门名称"label-width="120px"  prop="name">
        <el-input v-model="dept.name"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="info" @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.container {
  margin: 20px;
}
</style>
