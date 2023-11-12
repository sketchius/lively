<template>
  <div id="app">
    <ChatView />
  </div>
</template>

<script>
import ChatView from "./views/ChatView.vue";

export default {
  name: "App",
  components: {
    ChatView,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lora&display=swap");

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Lora", "Times New Roman", Times, serif;
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
