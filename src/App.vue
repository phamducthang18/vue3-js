<script setup>
  import Navbar from "./components/Navbar.vue";
  import Footer from "./components/Footer.vue";


</script>

<template>
 <div class="app-container">
  <Navbar/>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
  <Footer/>
 </div>
</template>

<style scoped>
.app-container {
    /* background-color: #a1c3d1; */
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>