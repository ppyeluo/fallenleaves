<template>
    <div class="logo">
        <img v-if="!isCustomized" src="@/assets/images/logo.png">
        <img v-if="isCustomized" src="@/assets/images/logo_dark.png">
    </div>
</template>

<script setup lang='ts'>
defineOptions({ name: 'Logo' })
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isCustomized = computed(() => route.path == '/customized' ? true : false)
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