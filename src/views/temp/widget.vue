<template>
    <div class="widget" @mousedown="startDrag" ref="widget">
      Widget
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    methods: {
      startDrag(event: MouseEvent) {
        let offsetX = event.clientX - (this.$refs.widget as HTMLElement).offsetLeft;
        let offsetY = event.clientY - (this.$refs.widget as HTMLElement).offsetTop;
  
        const moveHandler = (e: MouseEvent) => {
          (this.$refs.widget as HTMLElement).style.left = e.clientX - offsetX + 'px';
          (this.$refs.widget as HTMLElement).style.top = e.clientY - offsetY + 'px';
        };
  
        const upHandler = () => {
          document.removeEventListener('mousemove', moveHandler);
          document.removeEventListener('mouseup', upHandler);
        };
  
        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', upHandler);
      }
    }
  });
  </script>
  
  <style scoped>
  .widget {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 100px;
    height: 100px;
    background-color: lightblue;
    border: 1px solid darkblue;
    cursor: grab;
  }
  </style>
  