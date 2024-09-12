import api from "./api"

const apiPath =import.meta.env.VITE_API_PATH
const resource =apiPath+'/tasks'
const token = localStorage.getItem('token');
const authHeader = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  
export const allTasks = () => api.get(resource,authHeader)

export const createTask = task => api.post(resource, task,authHeader)

export const updateTask = (id, task) => api.put(`${resource}/${id}`, task,authHeader)

export const deleteTask = id => api.delete(`${resource}/${id}`,authHeader)

export const completeTask = (id,task) => api.patch(`${resource}/${id}/complete`,task,authHeader)
