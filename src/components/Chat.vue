<template>
  <div class="container-chat">
    <!-- Danh sách phòng chat (allRoom) -->
    <div class="container-list-friend">
      <div class="list-header">
        <h3 class="titel">Đoạn chat</h3>
        <div class="function">
          <div class="icon">
            <img src="../assets/3dots.png" class="three_dots" alt="" />
          </div>
          <div class="icon">
            <img src="../assets/newChat.png" class="three_dots" alt="" />
          </div>
        </div>
      </div>
      <div>
        <div class="search">
          <img class="" src="../assets/search.png" alt="" />
          <input type="text" placeholder="Tìm kiếm" />
        </div>
      </div>

      <!-- Hiển thị danh sách phòng chat -->
      <div v-if="allRoom && allRoom.length > 0" class="list_box">
        <ul>
          <li v-for="(room, index) in allRoom" :key="index" v-on:click="selectBoxChat(room.id)">
            <div class="container_list_chat">
              <div class="container_avatar">
                    <img class="avatar_chat" src="../assets/pngwing.com.png" alt="">
                </div>
              <div class="inner_chat">
                <strong>{{ room.name }}</strong>
               <div class="">
                <div v-if="room.messages.length === 0">
                  Chưa có tin nhắn nào
                </div>
                <div class="infor_last_messages" v-else-if="userId === room.messages[0].user_id">
                 <div class="messages_content"> Bạn: {{ room.messages[0].content }}</div>
                 <div class="time_last_message">{{  formatTime(room.messages[0].created_at)  }}</div>
                </div>
                <div class="infor_last_messages" v-else>
                  <div class="messages_content">
                    {{ room.messages[0].user.name }}: {{ room.messages[0].content }}
                  </div>
                  <div class="time_last_message">{{  formatTime(room.messages[0].created_at)  }}</div>
                </div>   
                
               </div>             <!-- <p v-if="userId == room.messages[0].user_id" >bạn : </p> -->
              </div>
            </div>
          </li>
        </ul>
      </div>
      <p v-else>Không có phòng chat nào.</p>
    </div>

    <!-- Khung chat -->
    <div  class="container-box-chat">
     <div class="header_box_chat" v-if="detailRoom">
        <div>
          <img class="img_avatar" src="../assets/pngwing.com.png" alt="" />
        </div>
        <div class="header_chat_name">
          {{ detailRoom?.conversation?.name || '' }}
        </div>
      
    
      </div>
      <div class="body_box_chat" v-if="detailRoom">
       <div v-for="message in detailRoom.messages">
          <div v-if="message.user.id ==userId" >
            <p class="my_message">{{ message.content}}</p>
          </div>
          <div v-else>
            <p class="orther_message">{{message.user.name}}: {{ message.content}}</p>
          </div>
       </div>
        
     </div>
     <div v-else>
       <p>Chưa có tin nhắn nào.</p>
     </div>
     <div class="input_chat">
            <input
            v-model="newMessage"
            @keyup.enter="sendChatMessage"
            placeholder="Type a message"
            :disabled="sending"
            />
          </div>
      <!-- <div class="container_chat_messages"></div>
      <div v-for="(msg, index) in chatStore.messages" :key="index">
        <strong v-if="msg.user && msg.user.name">{{ msg.user.name }}:</strong>
        {{ msg.message }}
      </div> -->
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useChatStore } from "@/stores/chat";
import { useAuthStore } from "@/stores/auth";
import socket from '../socket';
// import {formatTime} from '../utils.js';

const chatStore = useChatStore();
const authStore = useAuthStore();
const userId = authStore.user.id;
const userName = authStore.user.name;
const AllMessages = ref([]);
const newMessage = ref('');
const onlineUsers = ref([]);
const sending = ref(false);
const room = ref(null);


// Lấy danh sách phòng chat từ chatStore
const allRoom = computed(() => chatStore.allRoom);
const detailRoom = computed(() => chatStore.detailRoom );

// console.log(detailRoom.value);

const formatTime = (timestamp) => {
  if (!timestamp) return '';

  const date = new Date(timestamp);
  const now = new Date();
  const diff = Math.abs(now.getTime() - date.getTime());

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) {
    return 'Vừa xong';
  } else if (minutes < 60) {
    return `${minutes} phút trước`;
  } else if (hours < 24) {
    return `${hours} giờ trước`;
  } else {
    return `${days} ngày trước`;
  }
};
const selectBoxChat =async (roomId)=>{
  await chatStore.fetchRoomMessages(roomId)
  
  
  // const detailRoom = computed(()=>chatStore.detailRoom);
  console.log(chatStore.detailRoom);
  
}
const sendChatMessage = async () => {
  // console.log(room.value);
  const message = newMessage.value.trim();
  console.log();
  const roomId = room.value;
  if (!message) return;

  sending.value = true; // Đánh dấu trạng thái đang gửi
  newMessage.value = ''; // Reset giá trị input

  // Gửi tin nhắn cùng với socket ID
  const socketId = socket.id; // Lấy socket ID hiện tại
  await chatStore.sendChatMessage({ message,roomId, socketId }); // Gọi hàm gửi tin nhắn từ chatStore

  sending.value = false; // Kết thúc trạng thái gửi
  
  
};

onMounted(async () => {
  console.log('Component mounted');
  await chatStore.fetchAllRoomChat();
  if(allRoom){
    await chatStore.fetchRoomMessages(allRoom.value[0].id);
    // console.log();
    room.value =allRoom.value[0].id;
    
  }

  // Kiểm tra kết nối socket
  if (socket.connected) {
    const rooms = await allRoom.value.map(room => room.id);
    console.log(rooms);
    
    
    socket.emit('joinRooms', rooms);
    console.log('Socket.IO connected!');
  } else {
    console.log('Socket.IO not connected.');
  }

  // Đăng ký sự kiện khi socket kết nối
  
  socket.on('connect', () => {
    socket.emit('register', { id: userId, name: userName });
    console.log('Socket.IO registered with user ID and name!');
  });

  // Cập nhật danh sách người dùng online
  socket.on('updateOnlineUsers', (newOnlineUsers) => {
    onlineUsers.value = newOnlineUsers;
    console.log('Updated online users:', onlineUsers.value);
  });

  // Lắng nghe sự kiện nhận tin nhắn mới
  socket.on('chat:App\\Events\\MessageSent', (data) => {
    console.log('Received message:', data.message);
    chatStore.messages.push({
      user: data.user,
      message: data.message,
    });
  });
});

onBeforeUnmount(() => {
  socket.off('chat:App\\Events\\MessageSent'); // Gỡ bỏ sự kiện khi component unmount
});
</script>

<style>
.container-chat {
  display: flex;
  background-color: white;
  height: auto;
}
.container-list-friend {
  width: 400px;
  border: 1px solid #ccc;
  height: 650px;
}
.container-box-chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  position: relative;
}
.header_box_chat{
  position: absolute;
  display: flex;
  border-bottom: 1px solid #ccc;
  width: 100%;
  height: 80px;
}
.container-infomation {
  flex: 2;
  border: 1px solid #ccc;
}
.list-header {
  display: flex;
  justify-content: space-between;
}
.function {
  display: flex;
}
.three_dots {
  width: 20px;
  height: 20px;
}
.avatar_chat{
  width: 50px;
}
/* .list_box{
  height: 100px;
  width: 200px;
} */
.container_box_chat{
  display: flex;
  margin: 10px 5px;
  cursor: pointer; 
}
.container_list_chat{
  display: flex;
  margin: 10px 5px;
  cursor: pointer; 
  width: 100%;
  
}
.container_list_chat:hover{
  border: 1 solid ;
  border-radius: 2px;
  width: 95%;
  background-color: #ccc;
}
.container_chat_messages {
  display: flex;
  flex-direction: column; /* Giữ nguyên chiều dọc */
  padding: 10px;
  max-height: 400px; /* Chiều cao tối đa của khu vực tin nhắn */
  overflow-y: auto; /* Cho phép cuộn theo chiều dọc */
}
.my_message{
  background-color: #d5e3e1;
  margin-right: 10px;
  max-width: 500px;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
  color: white;
}
.other_message{
  background-color: #87c9c0;
  margin-left: 10px;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
}

.messages_content{
  width: 250px;
  text-overflow: ellipsis;
  flex-grow: 1;
  text-align: left;
  font-size: 14px;
}
.img_avatar{
  margin-left: 10px;
  height: 75px;
  width: auto;
}
.header_chat_name{
  font-size: 20px;
  /* font-weight: bold; */
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.inner_chat{
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.infor_last_messages{
  display: flex;
  justify-content: space-between;
   width: 100%;
  
}
.infor_last_messages div {
  flex: 1; /* Đảm bảo các phần tử con giãn đều nhau */
  white-space: nowrap; /* Đảm bảo nội dung không bị xuống dòng */
  overflow: hidden; /* Ẩn nội dung nếu quá dài */
  text-overflow: ellipsis; /* Thêm dấu "..." nếu nội dung quá dài */
}
.time_last_message{
  padding-left:15px ;
  color: gray; 
  flex-shrink: 0;
}
.titel {
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon {
  width: 35px;
  height: 35px;
  background-color: #ccc;
  border: 1px solid #ccc;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 5px;
  cursor: pointer;
}
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
}.input_chat{
  width: 100%;
  padding: 10px;
  border-radius: 25px;
  border: 1px solid #ccc;
  resize: none;
  margin-bottom: 0px;
  outline: none;

}
.input_chat input {
  width: 100%;
  outline: none;
  border: none;
  flex-grow: 1;
  font-size: 14px;
}
.body_box_chat{
  flex: 1;
  margin-top: 80px;
  height: 100%;
  width: 100%;
}
</style>
