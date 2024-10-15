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
            messages.value = data.messages;

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
        const content =messageContent.message;
        const conversation_id = messageContent.roomId;
        const userId = messageContent.userId;
        const userName = messageContent.userName;

        if (!message) return;
        console.log(messageContent);
        
        sending.value = true;
        error.value = null;
        messages.value.push({
            content: content,
            user:{
                id :userId,
                name : userName,
            }
        }); 
        //change conversation in allRoom 
        allRoom.value.forEach((room, index) => {

            if(room.id === conversation_id){
                room.latest_message ={
                    content: content,
                    created_at: Date.now(),
                    user:{
                        id : userId,
                        name : userName,
                    },
                    user_id: userId,
                }
                const updatedRoom = allRoom.value.splice(index, 1)[0];

        // Đẩy phòng chat vừa được cập nhật lên đầu mảng
            allRoom.value.unshift(updatedRoom);
            }
        });
        
        try {
            const { data: newMessage } = await sendMessage({ content,conversation_id }); 
           
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



