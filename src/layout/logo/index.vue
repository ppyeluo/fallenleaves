<template>
    <div class="logo">
        <img src="@/assets/images/logo.png">
    </div>
</template>

<script setup lang='ts'>
defineOptions({
    name: 'Logo'
})
</script>

<style scoped lang='scss'>
.logo{
    width: 100%;
    height: $base-sidebar-logo-height;
    padding-top: 25px;

    img{
        display: block;
        height: 100%;
        margin: 0 auto;
    }
}
</style>