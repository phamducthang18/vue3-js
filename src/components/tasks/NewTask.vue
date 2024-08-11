<template>
    <div class="relative">
        <input 
            type="text" 
            class="form-control form-control-lg padding-right-lg"
            placeholder="+ Add new task. Press enter to save." 
            @keydown.enter="addNewTask"
        />
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const newTask = reactive({
    name: '',
    is_completed: false,
})

const emit = defineEmits(['added'])

const addNewTask = (event) => {
    const taskName = event.target.value.trim();
    if(taskName) {
        emit('added', { name: taskName, is_completed: false });
        event.target.value = '';  // Reset input field
    }
}
</script>
