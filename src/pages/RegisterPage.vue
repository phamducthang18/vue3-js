<template>
    <main class="auth-wrapper">
        <form action="" class="auth-form" @submit.prevent="handleSubmit">
            <h1>
                <span>Shoppe</span>
                <strong>Smart</strong>
            </h1>
            <h2 class="h3 mb-4 fw-normal">Register Pages</h2>
            <div v-if="errors.general" :class="{'alert alert-danger': true, hidden: !showError}">
                {{ errors.general }}
            </div>
            <!-- Name input -->
             <div class="input-container">
                <div class="form-floating mb-2">
                    <input type="text" class="form-control" id="name" v-model="form.name" placeholder="Name">
                    <label for="name">Name</label>
                </div>
             </div>
            <!-- Email input -->
            <div class="input-container">
                <div class="form-floating mb-2">
                    <input type="email" class="form-control" id="email" v-model="form.email" placeholder="name@example.com">
                    <label :style="{ color: errors.email ? 'red' : 'black' }" for="email">Email</label>
                   
                </div>
                <div v-if="errors.email" :class="{'text-danger': true, hidden: !showError}">
                    {{ errors.email }}
                </div>
            </div>
            <!-- Password input -->
            <div class="input-container password-container">
                <div class="form-floating input-password">
                    <input :type="isPasswordVisible ? 'text' : 'password'" class="form-control" id="password" v-model="form.password" placeholder="Password">
                    <label :style="{ color: errors.password ? 'red' : 'black' }" for="password"> Password</label>
                    <img class="img-eye" :src="isPasswordVisible ? '/src/assets/eye.png' : '/src/assets/hide.png'" @click="togglePasswordVisibility">
                </div>
                <div v-if="errors.password" :class="{'text-danger': true, hidden: !showError}">
                    {{ errors.password }}
                </div>
            </div>

            <!-- Confirm Password input -->
            <div class="input-container password-container">
                <div class="form-floating input-password">
                    <input :type="isConfirmPasswordVisible ? 'text' : 'password'" class="form-control" id="password_confirmation" v-model="form.password_confirmation" placeholder="Confirm Password">
                    <label :style="{ color: errors.password_confirmation ? 'red' : 'black' }" for="password_confirmation">Confirm Password</label>
                    <img class="img-eye" :src="isConfirmPasswordVisible ? '/src/assets/eye.png' : '/src/assets/hide.png'" @click="toggleConfirmPasswordVisibility">
                </div>
                <div v-if="errors.password_confirmation" :class="{'text-danger': true, hidden: !showError}">
                    {{ errors.password_confirmation }}
                </div>
            </div>

            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
        </form>
    </main>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; 

const router = useRouter();
const store = useAuthStore();

const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    
});
const errors = reactive({
    general: null,
    email: null,
    password: null,
    password_confirmation: null,
});
const isPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);
const showError = ref(false);

const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
};

const toggleConfirmPasswordVisibility = () => {
    isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value;
};
const displayError = (errorMessage) => {
    showError.value = true;
    setTimeout(() => {
        showError.value = false;
    }, 5000); 
};
const handleSubmit = async () => {
    if(form.password !== form.password_confirmation){
        errors.password_confirmation ="Mật khẩu xác nhận không khớp.";
        return;
    }
    try {
        await store.handleRegister(form);
        router.push('/');
    } catch (error) {
        
        errors.email = error.response.data.errors.email?error.response.data.errors.email[0]:null;
        errors.password = error.response.data.errors.password?error.response.data.errors.password[0]:null;
        errors.password_confirmation = error.response.data.errors.password_confirmation?error.response.data.errors.password_confirmation[0]:null;
        displayError(errors); 
    }

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

.auth-form {
    width: 400px;
}

.input-password {
    position: relative;
}
.input-container{
    margin-bottom: 1rem;
}
.img-eye {
    width: 25px;
    height: auto;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}
</style>
