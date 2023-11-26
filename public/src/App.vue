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
  mounted() {
    this.preloadImages();
  },

  methods: {
    preloadImages() {
      const imagesToPreload = [
        "@/assets/images/profile/profile6.png",
        "@/assets/images/profile/generic.png",
      ];

      imagesToPreload.forEach((imageSrc) => {
        const img = new Image();
        img.src = this.requireAsset(imageSrc);
      });
    },
    requireAsset(path) {
      return require(`${path}`);
    },
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
  background-color: white;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f5f5ff;
}

::-webkit-scrollbar-thumb {
  background: #d0cde4;
}

::-webkit-scrollbar-thumb:hover {
  background: #bcb6ec;
}
</style>
