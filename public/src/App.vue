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
body {
  margin: 0;
  padding: 0;
}

#app {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
