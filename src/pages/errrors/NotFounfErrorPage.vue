<template>
    <div>
        <h1>404</h1>
        <p>Sorry,the page <code> {{$route.params.notFound}}</code> you're looking for is not found</p>
        <route-link :to="{name:'tasks'}">Back to your task</route-link>
    </div>
</template>