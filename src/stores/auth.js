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
                localStorage.setItem('token', token)});
            await fetchUser();
            errors.value = {};
          } catch (error) {
            if (error.response && error.response.status === 422) {
              errors.value = error.response.data.errors;
            }
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