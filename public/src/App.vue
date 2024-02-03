<template>
  <div id="layout">
    <SidebarMenu />
    <router-view></router-view>
  </div>
</template>

<script>
import SidebarMenu from "./components/SidebarMenu.vue";

export default {
  name: "App",
  components: {
    SidebarMenu,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;400;500;600;800&display=swap");

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#layout {
  --primaryteal: rgb(63, 204, 214);
  --primaryviolet: rgb(192, 178, 255);
  --primaryteallight: rgb(119, 246, 255);
  --primaryvioletlight: rgb(192, 169, 255);
  font-family: "Inter", sans-serif;
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  margin: 0;
  width: 100vw;
  justify-items: center;
  align-items: center;
  min-height: 100vh;

  display: grid;
  grid-template-columns: 10ch 1fr;
  padding: 2rem;
  background-color: white;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  margin-top: 0px;
  color: #626886;
  font-size: 24px;
  font-weight: 600;
}

h3 {
  color: #363242;
  font-size: 18px;
  font-weight: 600;
}

.button {
  display: block;
  width: 100%;
  padding: 10px 15px;
  color: #b2adcc; /* Adjusted to match the screenshot */
  background-color: white;
  border: 3px solid #b2adcc; /* Adjusted to match the screenshot */
  cursor: pointer;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 18px;
  /* border-left: 3px solid #87a0e6;
  border-right: 3px solid #9878b3;
  border-top: 3px solid #a3bbb6;
  border-bottom: 3px solid #a386a1; */
}

.icon {
  width: fit-content;
  height: fit-content;
}

.button:hover {
  background-color: #7c83a3;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #9792a5;
  font-size: 16px;
  font-weight: 600;
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
