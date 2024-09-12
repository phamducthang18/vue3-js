<template>
    <main class="auth-wrapper">
        <form action="" class="auth-form" @submit.prevent="handleSubmit">
            <h1>
                <span>Shoppe</span>
                <strong>Smart</strong>
            </h1>
            <h2 class="h3 mb-4 fw-normal">Register Pages</h2>
            
            <!-- Name input -->
            <div class="form-floating mb-2">
                <input type="text" class="form-control" id="name" v-model="form.name" placeholder="Name">
                <label for="name">Name</label>
            </div>

            <!-- Email input -->
            <div class="form-floating mb-2">
                <input type="email" class="form-control" id="email" v-model="form.email" placeholder="name@example.com">
                <label for="email">Email</label>
            </div>

            <!-- Password input -->
            <div class="password-container">
                <div class="form-floating input-password mb-3">
                    <input :type="isPasswordVisible ? 'text' : 'password'" class="form-control" id="password" v-model="form.password" placeholder="Password">
                    <label for="password">Password</label>
                    <img class="img-eye" :src="isPasswordVisible ? '/src/assets/eye.png' : '/src/assets/hide.png'" @click="togglePasswordVisibility">
                </div>
            </div>

            <!-- Confirm Password input -->
            <div class="password-container">
                <div class="form-floating input-password mb-3">
                    <input :type="isConfirmPasswordVisible ? 'text' : 'password'" class="form-control" id="password_confirmation" v-model="form.password_confirmation" placeholder="Confirm Password">
                    <label for="password_confirmation">Confirm Password</label>
                    <img class="img-eye" :src="isConfirmPasswordVisible ? '/src/assets/eye.png' : '/src/assets/hide.png'" @click="toggleConfirmPasswordVisibility">
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
    password_confirmation: ''
});

const isPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
};

const toggleConfirmPasswordVisibility = () => {
    isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value;
};

const handleSubmit = async () => {
    try {
        // Thực hiện đăng ký với store hoặc API
        // console.log('Submitted form data:', form);
        await store.handleRegister(form);

        // Điều hướng đến trang sau khi đăng ký thành công
        router.push('/home');
    } catch (error) {
        console.error('Đăng ký thất bại:', error);
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
