import { defineStore } from "pinia";
import { ref,computed } from "vue"
import { login,register,logout,getUser } from "@/http/auth-api"

export const useAuthStore = defineStore('authStore',() => {
    const user = ref(null)

    const isLoggedIn = computed(() =>!!user.value);

    const fetchUser = async() => {
        try {
            const {data} = await getUser(user)
            user.value = data
        } catch (error) {
            user.value =null
        }
    }

    const handleLogin = async (credentials) => {
      
        try {
            await login(credentials).then(response => {

                const token = response.data.access_token;
                if (!token ) {
                    throw new Error('Invalid credentials');
                }
                localStorage.setItem('token', token)});
            await fetchUser();
            return response.data;
            errors.value = {};
          } catch (error) {
            if (error.response) {
                // Xử lý lỗi từ API, ví dụ 422 Unprocessable Entity (lỗi xác thực)
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors;
                }
                // Xử lý lỗi đăng nhập không đúng (401 Unauthorized)
                else if (error.response.status === 401) {
                    errors.value = { login: 'Invalid credentials. Please try again.' };
                }
            } else {
                // Xử lý các lỗi khác (như lỗi mạng, server không phản hồi, v.v.)
                errors.value = { general: 'An error occurred during login. Please try again later.' };
            }
            throw error;
          }
      };
    
    const handleRegister = async(newUser) => {
        await register(newUser)
        await handleLogin({
            email: newUser.email,
            password:  newUser.password
        })
    }

    const handleLogout = async() => {
        await logout()
        user.value = null
        localStorage.removeItem('token');
    }
    return {
        user,
        isLoggedIn,
        fetchUser,
        handleLogin,
        handleRegister,
        handleLogout,
    }
});