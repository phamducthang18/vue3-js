<template>
     <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div class="container py-2">
            <a href="#" class="navbar-brand">
                <span>Shoppe</span>
                <strong>Smart</strong>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav" v-if="store.isLoggedIn">
                    <li class="nav-item">
                        <!-- <router-link to="/tasks" class="nav-link">Tasks</router-link > -->
                            <a href="#" @click.prevent="$router.push('/tasks')"  class="nav-link">Tasks</a>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name :'summary'}" class="nav-link">Summary</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto">
                    <template v-if="!store.isLoggedIn">
                        <li class="nav-item">
                            <router-link to="/login" class="btn btn-outline-secondary ms-2">Login</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name :'register'}" class="btn btn-danger ms-2">Register</router-link>
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item">
                            <a href="#" class="btn btn-outline-secondary ms-2" @click.prevent="Logout">Logout</a>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const router = useRouter();

const Logout = async() =>{
    await store.handleLogout();
    router.push({
        name: 'login'
    });
}

</script>
<style scoped>
.nav-link.router-link-active {
    color: rgba(0, 0, 0, .9);
}
</style>