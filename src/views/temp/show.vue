<template>
    <div v-if="show" class="popup">
      <div class="popup-content">
        <span class="close" @click="close">&times;</span>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  export default defineComponent({
    props: {
      show: {
        type: Boolean as PropType<boolean>,
        default: false
      }
    },
    methods: {
      close() {
        this.$emit('close');
      }
    }
  });
  </script>
  
  <style scoped>
  .popup {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid black;
    padding: 20px;
    z-index: 1000;
  }
  
  .popup-content {
    position: relative;
  }
  
  .close {
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
  }
  </style>
  