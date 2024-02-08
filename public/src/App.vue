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
  --ink: #5a6798;
  --white: #ffffff;
  --red: #ffcaca;
  --blue: #8ae3f5;
  --green: #b0ffcb;
  --yellow: #fff6a5;
  --redLight: #ffebeb;
  --blueLight: #daf9ff;
  --greenLight: #e1ffeb;
  --yellowLight: #fffad1;
  --size1: 9px;
  --size2: 14px;
  --size3: 23px;
  --size4: 37px;
  --size5: 60px;
  --size6: 97px;
  --size7: 157px;
  color: var(--ink);
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

h1 {
  font-size: 36px;
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

button.minor {
  background: none;
  border: 2px solid var(--ink);
  border-radius: 12px;
  color: var(--ink);
  font-size: 18px;
  font-weight: 600;
  padding: 6px 24px;
}

button.major {
  background: none;
  border: 4px solid var(--ink);
  border-radius: 12px;
  color: var(--ink);
  font-size: 18px;
  font-weight: 800;
  padding: 3px 24px;
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
