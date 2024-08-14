<template>
    <li class="list-group-item py-3">
        <div class="d-flex justify-content-start align-items-center">
            <input class="form-check-input mt-0 " 
                type="checkbox" 
                :class="completedClass" 
                :checked="task.is_completed"
                @change="markTaskAsCompleted"
                />
            <div class="ms-2 flex-grow-1 " 
                :class="completedClass"
                title="Double click the text to edit or remove"
                @dblclick="isEdit =true"
            >
                <div class="relative" v-if="isEdit">
                    <input 
                    class="editable-task" 
                    type="text" 
                    v-focus
                    @keyup.esc="undo" 
                    @keyup.enter="updateTask"
                    v-model="editingTask"
                    />
                </div>
                <span v-else>{{ task.name }}</span>
            </div>
            <!-- <div class="task-date">{{ task.created_at}}</div> -->
        </div>
        <TaskActions 
            @edit="isEdit = true" v-show="!isEdit"
            @remove="removeTask"        
        />
    </li>
</template>
<script setup>
    import { computed,ref } from 'vue';
    import TaskActions from './TaskActions.vue';
    import{useTaskStore} from '../../stores/task'

    const store = useTaskStore()

    const {handleUpdatedTask,handleCompletedTask,handleRemovedTask} =store
    const props = defineProps({
        task: { type: Object, required: true },
    })

    const isEdit =ref(false)
    const emit =defineEmits(['updated','completed','removeTask'])
    const completedClass = computed(() => props.task.is_completed ? 'completed' : '');
    const vFocus = {
        mounted: (el) => el.focus()
    }
    const updateTask = async(event) =>{

        const updatedTask ={
            ...props.task,
            name: event.target.value,
        }
        isEdit.value = false
        await handleUpdatedTask(updatedTask);
    }
    const markTaskAsCompleted = async(event) =>{
        const updatedTask ={
            ...props.task,
            is_completed: !props.task.is_completed,
        }
       
        handleCompletedTask(updatedTask)
    }
    const editingTask = ref(props.task.name)
    const undo = () => {
        editingTask.value = props.task.name
        isEdit.value = false
    }
    const removeTask = () => {
        if(confirm("Are you sure you want to remove")){
            handleRemovedTask(props.task)
        }
    }
</script>