<template>
    <main class="auth-wrapper">
        <form action="" class="auth-form" @submit.prevent="handleSubmit">
            <h1>
                <span>Shoppe</span>
                <strong>Smart</strong>
            </h1>
            <h2 class="h3 mb-4 fw-normal">Please sign in</h2>

            <!-- Hiển thị lỗi toàn cục -->
            <div v-if="errors.general" class="alert alert-danger">
                {{ errors.general }}
            </div>

            <div class="form-floating mb-2">
                <input type="email" class="form-control" id="email" v-model="form.email" placeholder="name@example.com">
                <label for="email">Email</label>
                <!-- Hiển thị lỗi cho email -->
                <div v-if="errors.email" class="text-danger">
                    {{ errors.email }}
                </div>
            </div>
            
            <div class="password-container">
                <div class="form-floating input-password mb-3">
                    <input :type="isPasswordVisible ? 'text' : 'password'" class="form-control" id="password" v-model="form.password" placeholder="Password">
                    <label for="password">Password</label>
                    <img class="img-eye" :src="isPasswordVisible ? 'src/assets/eye.png' : 'src/assets/hide.png'" @click="togglePasswordVisibility">
                </div>
                <!-- Hiển thị lỗi cho password -->
                <div v-if="errors.password" class="text-danger">
                    {{ errors.password }}
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

// Khởi tạo form và lỗi
const form = reactive({
    email: '',
    password: '',
});

// Biến lưu lỗi từ API
const errors = reactive({
    email: null,
    password: null,
    general: null,
});

// Xử lý ẩn/hiện password
const isPasswordVisible = ref(false);
const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
};

// Xử lý submit
const handleSubmit = async () => {
    try {

        await store.handleLogin(form);

        errors.email = null;
        errors.password = null;
        errors.general = null;
        

        router.push('/home');
    } catch (error) {
  
        if (error.response && error.response.status === 422) {
     
            errors.email = error.response.data.errors.email ? error.response.data.errors.email[0] : null;
            errors.password = error.response.data.errors.password ? error.response.data.errors.password[0] : null;
        } else if (error.response && error.response.status === 401) {
            
            errors.general = 'Invalid credentials. Please try again.';
        } else {
            // Các lỗi khác
            errors.general = 'Tài khoản hoặc mật khẩu không đúng.';
        }
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
    display: flex;
    position: relative;
}
.img-eye {
    width: 30px;
    height: auto;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 3%;
    top: 50%;
    transform: translateY(-50%);
}
.text-danger {
    color: red;
    font-size: 0.9em;
    margin-top: 0.25rem;
}
</style>
