import api from "./api"

export const getMessages = () => api.get("/api/messages"); 
export const sendMessage = (message) => api.post("/api/send-message", message);

//get room chat messages
export const getAllRoomChat = () => api.get("/api/conversation");


export const getRoomMessages = (roomId) => api.get(`/api/conversation/${roomId}`);