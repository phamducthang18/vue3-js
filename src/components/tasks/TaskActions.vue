<template>
    <div class="task-actions">
        <button class="btn btn-sm btn-circle btn-outline-secondary me-1"  @click="emit('edit')">
            <IconPenclil />
        </button>
        <button class="btn btn-sm btn-circle btn-outline-danger" @click="emit('remove')">
            <IconTrash />
        </button>
    </div>
</template>
<script setup>
import IconPenclil from '../icon/IconPenclil.vue';
import IconTrash from '../icon/IconTrash.vue';

const emit = defineEmits(['edit','remove'])

</script>