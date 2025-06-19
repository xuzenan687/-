import request from "@/utils/request";
//查询
export const queryAllApi = () => request.get('/depts');
//新增
export const addApi = (data) => request.post('/depts',data);
//根据id查询
export const queryByIdApi = (id) => request.get(`/depts/${id}`);
//删除
export const deleteApi = (id) => request.delete(`/depts?id=${id}`);
//修改
export const updateApi = (data) => request.put('/depts',data);
