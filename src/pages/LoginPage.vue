<template>
    <main class="auth-wrapper">
        <form action="" class="auth-form" @submit.prevent="handleSubmit">
            <h1>
                <span>Shoppe</span>
                <strong>Smart</strong>
            </h1>
            <h2 class="h3 mb-4 fw-normal">Please sign in</h2>

            <!-- Hiển thị lỗi toàn cục -->
            <div v-if="errors.general" :class="{'alert alert-danger': true, hidden: !showError}">
                {{ errors.general }}
            </div>

            <div class="form-floating mb-2">
                <input type="email" class="form-control" id="email" v-model="form.email" placeholder="name@example.com">
                <label for="email">Email</label>
                <!-- Hiển thị lỗi cho email -->
                <div v-if="errors.email" :class="{'text-danger': true, hidden: !showError}">
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
                <div v-if="errors.password" :class="{'text-danger': true, hidden: !showError}">
                    {{ errors.password }}
                </div>
            </div>
            
            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    </main>
</template>

<script setup>
import { ref, reactive } from 'vue';
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

// Biến để kiểm soát hiển thị lỗi
const showError = ref(false);

// Xử lý ẩn/hiện password
const isPasswordVisible = ref(false);
const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
};

// Hàm xử lý hiển thị lỗi và tự động ẩn sau 5 giây
const displayError = (errorMessage) => {
    showError.value = true;
    setTimeout(() => {
        showError.value = false;
    }, 5000); 
};

// Xử lý submit
const handleSubmit = async () => {
  try {
    
    const data = await store.handleLogin(form);

    // In ra kết quả trả về để kiểm tra
    console.log(data);

    // Chuyển hướng sau khi đăng nhập thành công
    router.push('/');

  } catch (error) {
    // Xử lý lỗi đăng nhập (nếu cần)
    errors.general = error.response.data.message;
    displayError(errors.general); // Hiển thị lỗi và ẩn sau 5 giây
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
.hidden {
    opacity: 0; /* Khi lỗi bị ẩn, giảm độ trong suốt */
    transition: opacity 0.5s ease-in-out; /* Hiệu ứng mượt khi ẩn */
}
.text-danger {
    color: red;
    font-size: 0.9em;
    margin-top: 0.25rem;
    opacity: 1;
    transition: opacity 0.5s ease-in-out; /* Hiệu ứng mượt khi hiển thị */
}
</style>
