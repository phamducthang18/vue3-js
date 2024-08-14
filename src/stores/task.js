import {ref,reactive,computed}from "vue"
import { defineStore } from "pinia";
import { allTasks ,createTask,updateTask,completeTask,deleteTask} from "@/http/task-api";

const tmp = {
    state: () => ({}),
    getters: {},
    actions: {},
  };
  export const useTaskStore = defineStore("taskStore", () => {
    const tasks = ref([]);
    const uncompletedTasks = computed(() =>
      tasks.value.filter((task) => !task.is_completed)
    );
    const completedTasks = computed(() =>
      tasks.value.filter((task) => task.is_completed)
    );
    const fetchAllTasks = async () => {
      const { data } = await allTasks();
      tasks.value = data.data;
    };
    const handleAddedTask = async(task) => {
        const {data : createdTask} = await createTask(task);
    
        tasks.value.unshift(createdTask.data);
    };
    const handleUpdatedTask  = async (task) => {
    
    
        const {data: updatedTask} = await updateTask(task.id,{
            name:task.name
        });
    
        const currentTask = tasks.value.find(item => item.id ===task.id);
        
        currentTask.name = updatedTask.data.name;
    }
    const handleCompletedTask =async (task) =>{
    
    
        const {data : updatedTask} = await completeTask(task.id,{
            is_completed:task.is_completed
        })
        const currentTask = tasks.value.find(item => item.id === task.id);
        currentTask.is_completed = updatedTask.data.is_completed;
    }
    const handleRemovedTask =async (task)=>{
        await deleteTask(task.id);
        const index = tasks.value.findIndex(item => item.id === task.id);
        tasks.value.splice(index,1);
    };
    
    return {
      tasks,
      completedTasks,
      uncompletedTasks,
      fetchAllTasks,
      handleAddedTask,
      handleUpdatedTask,
      handleCompletedTask,
      handleRemovedTask,
    };
});
