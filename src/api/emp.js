import request from "@/utils/request";
//查询
export const queryPageApi = (name,gender,begin,end,page,pageSize) => 
 request.get(`/emps?name=${name}&gender=${gender}&begin=${begin}&end=${end}&page=${page}&pageSize=${pageSize}`);
//新增
export const addApi = (data) => request.post('/emps',data);
//根据id查询
export const queryByIdApi = (id) => request.get(`/emps/${id}`);
//删除
export const deleteApi = (id) => request.delete(`/emps?id=${id}`);
//修改
export const updateApi = (data) => request.put('/emps',data);
