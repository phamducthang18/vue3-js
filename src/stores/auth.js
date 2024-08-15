import { defineStore } from "pinia";
import { ref,computed } from "vue"
import { csrfCookie,login,register,logout,getUser } from "@/http/auth-api";

export const useAuthStore = defineStore('authStore',() => {
    const user = ref(null)

    const isLoggedIn = computed(() =>!!user.value);

    const fectchUser = async() => {
        const {data} = await getUser(user)
        user.value = data
    }

    const handleLogin = async(credentails) =>{
        await csrfCookie()
        await login(credentails)
        await fectchUser()
    }
    
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
        fectchUser,
        handleLogin,
        handleRegister,
        handleLogout,
    }
});