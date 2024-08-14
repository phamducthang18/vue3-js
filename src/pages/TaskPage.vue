<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <NewTask  />
                    <Tasks :tasks="uncompletedTasks" 
                    
                    />
                    <div class="text-center my-3" v-show="showToggleCompletedBtn">
                        <button class="btn btn-sm btn-secondary" 
                            @click="showCompletedTasks = !showCompletedTasks">
                            <span v-if="!showCompletedTasks">Show Completed</span>
                            <span v-else>Hide Completed</span>
                        </button>
                    </div>

                    <Tasks :tasks="completedTasks" v-if="shouldShowCompletedTasks" 
                     
                    />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useTaskStore } from "@/stores/task";
import { storeToRefs } from "pinia";
import NewTask from "@/components/tasks/NewTask.vue";
import Tasks from "../components/tasks/Tasks.vue";

const tasks = ref([]);
const store =useTaskStore();
const {completedTasks,uncompletedTasks} =storeToRefs(store)
const {fetchAllTasks} = store
onMounted(async () => {
    await fetchAllTasks()
    
    
});

// const uncompletedTasks = computed(() => tasks.value.filter(task => !task.is_completed));
// const completedTasks = computed(() => tasks.value.filter(task => task.is_completed));

const showToggleCompletedBtn = computed(() => 
    uncompletedTasks.value.length > 0 && completedTasks.value.length > 0
);

const shouldShowCompletedTasks = computed(() =>
    (uncompletedTasks.value.length === 0 || completedTasks.value.length > 0) && showCompletedTasks.value
);

const showCompletedTasks = ref(false);



const handleUpdatedTask  = async (task) => {
    
    
    const {data: updatedTask} = await updateTask(task.id,{
        name:task.name
    });

    const currentTask = tasks.value.find(item => item.id ===task.id);
    console.log(currentTask);
    
    // currentTask.name = updatedTask.data.name;
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
}

</script>
