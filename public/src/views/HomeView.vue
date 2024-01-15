<template>
    <div class="layout">
      <div class="left-panel">
      </div>
      <div class="right-panel"></div>
    </div>
  </template>
  
  <script>
  
  export default {
    setup() {
      return {};
    },
    components: {
    },
  };
  </script>
  
  <style scoped>
  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    padding: 10em;
    box-sizing: border-box;
    width: 60vw;
    height: 100%;
  }
  </style>
  