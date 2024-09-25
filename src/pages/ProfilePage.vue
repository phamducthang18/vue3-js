<template>
    <main>
        <div class="container">
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
            <div class="container-inner">
                <div>
                    <ul>
                        <li>Ưu đãi</li>
                        <li>Cá nhân</li>
                        <li>Địa chỉ</li>
                    </ul>
                </div>
                <div>dispatch</div>
            </div>
        </div>
        
    </main>
</template>
<script setup>
    // import {fetchUser} from "@/stores/auth"
    import { useAuthStore } from '@/stores/auth'; 
    
    const store = useAuthStore();
    const user = store.user;
 
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
.container{
    margin-top: 20px;
}
.container-inner{
    margin-top: 20px;
    display: flex;
}
ul{
    list-style: none
}
</style>