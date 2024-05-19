<template>
    <div class="header">
        <Search v-show="!isCustomized" />
        <User />
    </div>
</template>

<script setup lang='ts'>
defineOptions({ name: 'Header' })
import Search from './search/index.vue'
import User from './user/index.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isCustomized = computed(() => route.path == '/customized' ? true : false)
</script>

<style scoped lang='scss'>
.header{
    display: flex;
    justify-content: right;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    padding-right: 15px;
    padding-bottom: 15px;
}
</style>