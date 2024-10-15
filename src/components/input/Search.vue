<template>
    <div class="search">
      <img src="../../assets/search.png" alt="Search Icon" />
      <input 
        type="search" 
        :placeholder="placeholder" 
        v-model="searchTerm" 
        @input="onSearch" 
      />
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  
  // Định nghĩa các props
  const props = defineProps({
    placeholder: String,
  });
  
  // Định nghĩa emit để phát sự kiện cho component cha
  const emit = defineEmits(['search']);
  
  // Biến để lưu giá trị tìm kiếm
  const searchTerm = ref('');
  
  // Hàm xử lý sự kiện tìm kiếm
  const onSearch = () => {
    emit('search', searchTerm.value); // Phát sự kiện với giá trị tìm kiếm
  };
  </script>
  
  <style>
  .search {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    margin: 20px;
    border-radius: 25px;
    padding: 5px 10px;
    width: 90%;
  }
  .search img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .search input {
    width: 100%;
    outline: none;
    border: none;
    flex-grow: 1;
    font-size: 14px;
  }
  </style>
  