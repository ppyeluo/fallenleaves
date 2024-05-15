<template>
    <div class="header">
        <Search />
        <User />
    </div>
</template>

<script setup lang='ts'>
defineOptions({ name: 'Header' })
import Search from './search/index.vue'
import User from './user/index.vue'

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