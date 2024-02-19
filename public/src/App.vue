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
  --paper: #fffcf2;
  --ink: #5a6798;
  --inkLight: #a7a8c4;
  --white: #ffffff;
  --red: #ffcaca;
  --blue: #8ae3f5;
  --green: #b0ffcb;
  --yellow: #fff6a5;
  --redLight: #ffebeb;
  --blueLight: #daf9ff;
  --greenLight: #e1ffeb;
  --yellowLight: #fffad1;
  --redDark: #da8c8c;
  --blueDark: #4b90be;
  --greenDark: #55c47c;
  --yellowDark: #e4da82;
  --size00: 3px;
  --size0: 5px;
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
  background-color: var(--paper);
}


textarea::placeholder {
  font-weight: 200;
}

h1 {
  font-size: 36px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  margin-top: 0px;
  font-size: 24px;
  font-weight: 600;
}

h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

button.minor {
  background: none;
  border: 1px solid var(--ink);
  border-radius: 12px;
  color: var(--ink);
  font-size: 14px;
  font-weight: 400;
  padding: 4px 24px;
}

button.standard {
  background: none;
  border: 2px solid var(--ink);
  border-radius: 12px;
  color: var(--ink);
  font-size: 18px;
  font-weight: 600;
  padding: 4px 24px;
}

button.major {
  background: none;
  border: 4px solid var(--ink);
  border-radius: 12px;
  color: var(--ink);
  font-size: 18px;
  font-weight: 600;
  padding: 4px 24px;
}

button {
  text-transform: uppercase;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}




b {
  font-weight: 600;
  color: var(--blueDark)
}

.button-ref {
  border: 1px solid var(--ink);
  padding: 1px 5px;
  margin: 1px;
  border-radius: 7px;
  font-size: smaller;
  font-weight: 500;
}


.flex {
  display: flex;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

button:hover {
  background-color: var(--blueLight);
}

button:disabled {
  border-color: var(--inkLight);
  color: var(--inkLight);
}

button:hover {
  background: none;
}

label {
  display: block;
  margin-left: var(--size2);
  margin-bottom: var(--size1);
  font-size: 16px;
  font-weight: 700;
  width: fit-content;
  padding: 2px 8px;
  border-bottom: 1px dashed var(--ink);
  background-color: var(--blueLight);
}

label.horizontal {
  margin: 0;
  border-bottom: none;
  border-right: 1px dashed var(--ink);
}

.label-container {
  display: flex;
  align-items: center;
}

.explanation {
  display: inline;
  margin-left: 12px;
  margin-bottom: var(--size1);
  font-size: 16px;
  font-weight: 400;
  width: fit-content;
}

.label-required {
  display: inline;
  margin-left: 8px;
  margin-bottom: var(--size1);
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
  color: var(--redDark);
  width: fit-content;
}


.label-optional {
  display: inline;
  margin-left: 8px;
  margin-bottom: var(--size1);
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
  color: var(--greenDark);
  width: fit-content;
}

textarea {
  position: relative;
  font-family: "Inter", sans-serif;
  color: var(--ink);
  font-size: 20px;
  font-weight: 400;
  width: 100%;
  border: 3px solid var(--ink);
  border-radius: 3px;
  padding: 18px 20px;
  background: transparent;
  resize: none;
  box-sizing: border-box;
}

input:focus,
textarea:focus {
  outline: none !important;
  border: 3px solid var(--blueDark);
}

.textarea-container {
  width: 100%;
  position: relative;
}
.textarea-container::before {
  content: "";
  position: absolute;
  z-index: 0;
  top: 12px;
  left: 12px;
  right: 12px;
  bottom: 12px;
  background: var(--white);
  pointer-events: none;
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
