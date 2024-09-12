<template>
    <main class="auth-wrapper">
        <form action="" class="auth-form" @submit.prevent="handleSubmit">
            <h1>
                <span>Shoppe</span>
                <strong>Smart</strong>
            </h1>
            <h2 class="h3 mb-4 fw-normal">Please sign in</h2>
            <div class="form-floating mb-2">
                <input type="email" class="form-control" id="email" v-model="form.email" placeholder="name@example.com">
                <label for="email">Email</label>
            </div>
            <div class="password-container">
                <div class="form-floating input-password mb-3">
                    <input :type="isPasswordVisible ? 'text' : 'password'" class="form-control" id="password" v-model="form.password" placeholder="Password">
                    <label for="password">Password</label>
                    <img class="img-eye" :src="isPasswordVisible ? 'src/assets/eye.png' : 'src/assets/hide.png'" @click="togglePasswordVisibility">
                </div>
            </div>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    </main>
</template>

<script setup>

import { ref } from 'vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; 

const router = useRouter();
const store = useAuthStore();

const form = reactive({
    email:'',
    password: '',

})
const isPasswordVisible = ref(false);
const togglePasswordVisibility = () =>{
    isPasswordVisible.value = !isPasswordVisible.value;
}
const handleSubmit = async () => {
    
    await store.handleLogin(form)
    
};
</script>

<style scoped>
.auth-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 60vh;
    margin-top: 2rem;  

}
.auth-form{
    width: 400px;
}
/* .password-container{
    display: flex;
} */
.input-password{
    display: flex;
    position: relative;
}
/* .btn-show{
    flex: 1;
} */
.img-eye{
    width: 30px;
    height: auto;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 3%;
    top: 50%;
    transform: translateY(-50%);
}

</style>
