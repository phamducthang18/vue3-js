<template>
    <div class="card mt-2" v-if="tasks.length && show">
        <ul class="list-group list-group-flush">
            <Task v-for="task in tasks" 
            :task="task" 
            :key="task.id" 
            
            />
        </ul>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Task from './Task.vue'

defineProps({
    tasks: {
        type: Array,
    },
    show: {
        type: Boolean,
        default: true,
    },
})
// const emit = defineEmits(['updated','completed']);
// const handleUpdatedTask = (updatedTask) => {
//     emit('updated', updatedTask); // Phát sự kiện với dữ liệu task đã cập nhật
// };

// const handleCompletedTask = (completedTask) => {
//     emit('completed', completedTask); // Phát sự kiện với dữ liệu task đã hoàn thành
// };
// const handleRemovedTask =() => {
//     if(confirm('Are you sure you want to remove')){
//         console.log('hehe');
        
//     }
// };
</script>
