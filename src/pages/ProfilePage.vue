<template>
    <main>
        <div class="container-profile">
            <div class="container_avatar" >
                <img class="img_avartar" src="../assets/pngwing.com.png" alt="">
                <img @click="changeImage" class="img_change_avatar" src="../assets/change_avatar.png" alt="">
            </div>
            <div>
                <h1>{{ user.name }}</h1>
                <p></p>
                <!-- <button @click="changeImage">Change Avatar</button> -->
            </div>
        </div>
    </main>
</template>
<script setup>
    // import {fetchUser} from "@/stores/auth"
    import { useAuthStore } from '@/stores/auth'; 

    const store = useAuthStore();

    const user = await store.fetchUser(store);
    console.log("Fetched User:", user);

</script>
<style>
.img_avartar {
    width: 150px;
    margin: 0 auto;
    display: block;
    object-fit: contain;
    height: auto;
    transition: transform 0.5s ease;
    margin: 10px auto;
}
.container_avatar{
    position: relative;
}
.img_change_avatar{
    width: 30px;
    margin: 0 auto;
    display: block;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: 0;
}
.container-profile{
    display: flex;

}
</style>