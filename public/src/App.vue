<template>
  <div id="layout">
    <SidebarMenu />
    <ChatView />
    <router-view></router-view>
  </div>
</template>

<script>
import SidebarMenu from "./components/SidebarMenu.vue";
import ChatView from "./assistant-chat/view/ChatView.vue";

export default {
  name: "App",
  components: {
    SidebarMenu,
    ChatView,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;400;500;600;700;800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Saira:wght@100;200;400;500;600;700;800&display=swap");

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#layout {
  --white: #ffffff;
  --paper: #fffcf2;
  --ink: #5a6798;
  --ink300: #a7a8c4;

  --red300: #ffebeb;
  --red400: #ffdbdb;
  --red500: #ffcaca;
  --red700: #da8c8c;

  --yellow300: #fffad1;
  --yellow400: #fff8bd;
  --yellow500: #fff6a5;
  --yellow700: #e4da82;

  --green300: #e0ffeb;
  --green400: #ccffde;
  --green500: #b0ffcb;
  --green700: #55c47c;

  --blue300: #dbf9ff;
  --blue400: #b1effc;
  --blue500: #8ae3f5;
  --blue700: #4b90be;
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
  font-family: "Roboto", sans-serif;
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  margin: 0;
  width: 100vw;
  justify-items: center;
  align-items: center;
  min-height: 100vh;

  display: flex;
  padding: 2rem;
  background-color: var(--paper);
}

.display-text {
  font-family: "Saira", sans-serif;
}

textarea::placeholder {
  font-weight: 200;
  color: var(--ink300);
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

input[type="radio"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid var(--ink);
  margin: 0;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
}

input[type="radio"]:checked {
  background-color: var(--green500);
}

input[type="radio"]:focus {
  outline: 4px solid var(--ink);
  outline-offset: 2px;
  border: 4px solid var(--ink);
}

b {
  font-weight: 600;
  color: var(--blue700);
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
  background-color: var(--green300);
}

button:disabled {
  border-color: var(--ink300);
  color: var(--ink300);
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
  background-color: var(--blue300);
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
  color: var(--red700);
  width: fit-content;
}

.label-optional {
  display: inline;
  margin-left: 8px;
  margin-bottom: var(--size1);
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
  color: var(--green700);
  width: fit-content;
}

textarea {
  position: relative;
  font-family: "Inter", sans-serif;
  color: var(--ink);
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  border: 3px solid var(--ink);
  border-radius: 3px;
  padding: 12px 18px;
  background: transparent;
  resize: none;
  box-sizing: border-box;
}

.textarea-container {
  display: flex;
}

input:focus,
textarea:focus {
  outline: none !important;
  border: 3px solid var(--blue700);
}

.textarea-container {
  width: 100%;
  position: relative;
}
.textarea-container::before {
  content: "";
  position: absolute;
  z-index: 0;
  top: 8px;
  left: 8px;
  right: 8px;
  bottom: 8px;
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
