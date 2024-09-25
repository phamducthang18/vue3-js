<template>
  <div>
    <!-- <div v-for="(msg, index) in messages" :key="index">
      <strong>{{ msg.user.name }}:</strong> {{ msg.message }}
    </div>
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message" /> -->
  </div>
</template>

<script setup>
// import { ref, onMounted } from 'vue';
// import socket from '../socket';
// import axios from 'axios';

// // Khai báo state sử dụng ref
// const messages = ref([]);
// const newMessage = ref('');
// // 
// // Hàm gửi tin nhắn
// const sendMessage = () => {
//   const message = newMessage.value;
//   newMessage.value = '';

//   axios.post('http://localhost:8000/api/send-message', { message })
//     .then(response => {
//       console.log('Message sent!');
//     })
//     .catch(error => {
//       console.error(error);
//     });
// };

// // Lắng nghe sự kiện khi component được mount
// onMounted(() => {
//   socket.on('chat:App\\Events\\MessageSent', (data) => {
//     messages.value.push({
//       user: data.user,
//       message: data.message,
//     });
//   });
// });
</script>
