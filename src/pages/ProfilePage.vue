<template>
    <main>
        <div class="container-page">
            <div class="container-profile">
                <div class="container_avatar" >
                    <img class="img_avartar" src="../assets/pngwing.com.png" alt="">
                    <img @click="changeImage" class="img_change_avatar" src="../assets/change_avatar.png" alt="">
                </div>
                <div class="container-info">
                    <p>Name: {{ user.name }}</p>
                    <p>Email: {{ user.email }}</p>
                    <p>Phone number: {{user.phone?user.phone:N/A}} </p>
                    <p>Address: {{ user.address?user.address:N/A }}</p>
                    <p class="edit-info"><IconPenclil class="img-pencil"/>Chỉnh sửa thông tin</p>
                    
                </div>
                <div class="container-trading">
                    <p>Tổng số đơn đã mua: {{ user.total_order }}</p>
                    <p>Tổng số tiền đã chi tiêu {{ user.total_spent }}</p>     
                    <p>Tổng số tiền đã tiết kiệm được {{ user.total_savings }}</p>
                </div>
            </div>
            <div class="container-inner">
                <div class="nav-tab">
                    <ul>
                        <li>Ưu đãi</li>
                        <li>Cá nhân</li>
                        <li>Địa chỉ</li>
                    </ul>
                </div>
                <div class="info">dispatch</div>
            </div>
        </div>
        
    </main>
</template>
<script setup>
import IconPenclil from '../components/icon/IconPenclil.vue';
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
.img-pencil{
    margin-right: 5px;
   
}

.container_avatar{
    position: relative;
}
.edit-info{
    display: flex; align-items: center;
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
    margin: 50px 20px;
}
.container-info{
    flex-direction: column;
    padding: 20px 40px;
}
.container-trading{
    flex-direction: column;
    padding: 20px 200px;
}
.container-page{
    margin: 20px 100px;
    background-color: white;
    
}
.nav-tab{
    margin: 20px 100px;
    min-width: 200px;
}
.info{
    flex: 1;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 10px 20px;
}
.container-inner{
    height: 500px;
    margin-top: 20px;
    display: flex;
}
ul{
    list-style: none
}
</style>