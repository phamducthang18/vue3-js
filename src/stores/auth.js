import { defineStore } from "pinia";
import { ref,computed } from "vue"
import { login,register,logout,getUser } from "@/http/auth-api"

export const useAuthStore = defineStore('authStore',() => {
    const user = ref(null)
    const errors = ref({});
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
          const response = await login(credentials);
      
          const token = response.data.access_token;
          if (!token) {
            throw new Error('Invalid credentials');
          }
      
          document.cookie = `token=${token}; path=/; max-age=604800; secure; SameSite=Lax`;
      
          await fetchUser();
      
          errors.value = {};
      
          return response.data;
      
        } catch (error) {
          if (error.response) {
            if (error.response.status === 422) {
              errors.value = error.response.data.errors;
            }
            else if (error.response.status === 401) {
              errors.value = { login: 'Invalid credentials. Please try again.' };
            }
          } else {
            errors.value = { general: 'An error occurred during login. Please try again later.' };
          }
          throw error;
        }
      };
      
    
    const handleRegister = async(newUser) => {
        try {
            const response = await register(newUser)
            
            await handleLogin({
            email: newUser.email,
            password:  newUser.password
        })
        } catch (error) {
            
        }
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