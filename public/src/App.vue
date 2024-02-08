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
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;400;500;600;700;800&display=swap");

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#layout {
  --ink: #5A6798;
  --white: #FFFFFF;
  --red: #FFCACA;
  --blue: #8AE3F5;
  --green: #B0FFCB;
  --yellow: #FFF6A5;
  --redLight: #FFEBEB;
  --blueLight: #DAF9FF;
  --greenLight: #E1FFEB;
  --yellowLight: #FFFAD1;
  --size1: 9px;
  --size2: 14px;
  --size3: 23px;
  --size4: 37px;
  --size5: 60px;
  --size6: 97px;
  --size7: 157px;
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
  background-color: #fffcf2;
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
