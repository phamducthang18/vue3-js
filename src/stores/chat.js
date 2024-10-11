import { ref,computed } from "vue";
import { defineStore } from "pinia";
import { sendMessage,getAllRoomChat,getRoomMessages } from "@/http/chat-api";


export const useChatStore = defineStore("chatStore",() => {
    const messages = ref([]);
    const detailRoom = ref({});
    const user = ref(null);
    const message = ref("");
    const error = ref(null); 
    const sending = ref(false);
    const allRoom = ref([]);


    const allMessages = computed(() =>messages.value);
    const unreadMessages = computed(() => messages.value.filter((msg) =>!msg.is_read));
    const fetchRoomMessages = async(roomId) =>{
        try {
            const { data } = await getRoomMessages(roomId);
            detailRoom.value = data;
            // console.log(detailRoom.value);
            
        } catch (e) {
            error.value = "Failed to fetch messages";
            console.error(e);
        }
    };

    const fetchAllRoomChat = async () => {
        try {
    
            const { data } = await getAllRoomChat();
            // console.log('Data from API:', data);  
            allRoom.value = data;
            // console.log('All rooms:', allRoom.value);
            
            
            
        } catch (e) {
            console.error(e);
        }
    }
    // const fetchMessages = async () => {
    //     try {
    //         const { data } = await getMessages();
    //         messages.value = data.data;
    //     }catch (e) {
    //         error.value = "failed to fetch messages";
    //         console.error(e);
    //     }
    // };

    const sendChatMessage = async (messageContent) => {
        const message =messageContent.message;
        const socketId = messageContent.socketId;
        const roomId = messageContent.roomId;
        if (!message) return;
        console.log(message);
        
        sending.value = true;
        error.value = null;
    
        try {
            const { data: newMessage } = await sendMessage({ message,roomId,socketId }); 
            messages.value.push(newMessage); 
        } catch (err) {
            // Xử lý lỗi chi tiết hơn
            error.value = err.response?.data?.message || "Failed to send message.";
            console.error("Error sending message:", err);
        } finally {
            sending.value = false;
        }
    };
    
    return {
        allRoom,
        detailRoom,
        messages,
        sending,
        allMessages,
        unreadMessages,
        // fetchMessages,
        fetchRoomMessages,
        fetchAllRoomChat,
        sendChatMessage,
      };
});



