<template>
    <div class="horizontal-layout">
      <div class="margin-spacer"></div>
      <div class="inner-padding-spacer border-left"></div>
      <div class="vertical-layout">
        <MenuBar v-if="!route.meta.interfaceHidden" />
        <div v-if="!route.meta.interfaceHidden" class="vertical-spacer"></div>
        <main class="viewport">
            <router-view></router-view>
        </main>
        <MessageInterface v-if="!route.meta.interfaceHidden" />
      </div>
      <div class="inner-padding-spacer border-right"></div>
      <div class="margin-spacer"></div>
    </div>
</template>

<script setup>
import MenuBar from "@/components/MenuBar.vue";
import MessageInterface from "@/components/message-interface/MessageInterface.vue";
import { observeAuthState, signInAsDemoUser } from "@/services/authService";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import userService from "./services/userService";

const route = useRoute();
const router = useRouter();

const store = useStore();

const currentUser = ref(store.state.user);

if (!currentUser.value.uid) {
  if (userService.getDemoUID()) {
    signInAsDemoUser();
  } else {
    router.push("/login");
  }
}

onMounted(() => {
  observeAuthState(async (authState) => {
    console.log("auth state changed");
    console.log(authState.user);
    if (authState) {
      let demoUID;
      if (authState.isDemoUser) {
        demoUID = await userService.getDemoUID();
      }
      store.commit("setUser", {
        ...authState.user,
        isDemoUser: authState.isDemoUser,
        demoUID,
      });
      currentUser.value = {
        ...authState.user,
        isDemoUser: authState.isDemoUser,
        demoUID,
      };
    } else {
      store.commit({});
    }
  });
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Saira:wght@100;200;400;500;600;700;800&display=swap");

* {
  box-sizing: border-box;
}

#app,
body {
  position: relative;
  margin: 0;
  padding: 0;
  overflow: hidden;
  --white: #ffffff;
  --paper300: #fffefa;
  --paper: #fffcf2;
  --paper700: hsl(42, 100%, 96%);
  --ink: #5a6798;
  --ink300: #a7a8c4;

  --red100: #fff7f7;
  --red300: #ffebeb;
  --red400: #ffdbdb;
  --red500: #ffcaca;
  --red700: #da8c8c;

  --yellow100: #fffde6;
  --yellow300: #fffad1;
  --yellow400: #fff8bd;
  --yellow500: #fff6a5;
  --yellow700: #948b3b;

  --green100: #f1fff6;
  --green300: #e0ffeb;
  --green400: #ccffde;
  --green500: #b0ffcb;
  --green700: #55c47c;

  --blue100: #f3fdff;
  --blue300: #dbf9ff;
  --blue400: #b1effc;
  --blue500: #8ae3f5;
  --blue700: #4b90be;

  --orange100: #fffaee;
  --orange300: #fff2de;
  --orange400: #ffe9cc;
  --orange500: #ffe0b7;
  --orange700: #b78b63;

  --teal100: #f2fefa;
  --teal300: #ddfcf5;
  --teal400: #bef7ed;
  --teal500: #9df1e0;
  --teal700: #50aa9d;

  --purple100: #f7f5ff;
  --purple300: #eee3ff;
  --purple400: #e1d1fc;
  --purple500: #ccc1f7;
  --purple700: #8c84b4;

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
  background-color: var(--paper700);
}

.horizontal-layout {
  margin: 0;
  padding: 0;
  width: 100vw;
  justify-items: center;
  align-items: center;
  min-height: 100vh;
  display: flex;
  align-items: stretch;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
}

.vertical-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.viewport {
  min-width: 90ch;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  border-top: none;
  border-bottom: none;
  padding: 0;
  background: var(--paper700);
  justify-self: center;
  align-items: center;
  justify-content: flex-start;
  flex-basis: auto;
  max-height: 65vh;
}

.margin-spacer {
  flex-shrink: 1;
  flex-basis: 15vw;
  background: linear-gradient(
    to bottom,
    var(--ink300) 10%,
    var(--paper700) 10.0000001%
  );
  background-position: 0px 4px;
  background-size: 100% 8px;
}

ul {
  list-style-type: square;
}

.padding-spacer {
  flex-shrink: 1;
  flex-basis: 9.2vw;
  min-width: var(--size4);
}

.inner-padding-spacer {
  min-width: var(--size5);
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 9.2vw;
  background: var(--paper700);
}

.gap-spacer {
  min-width: var(--size3);
  flex-shrink: 1;
  flex-basis: 5.7vw;
}

.border-left {
  border-left: 3px double var(--ink);
}

.border-right {
  border-right: 3px double var(--ink);
}

.vertical-spacer {
  flex-shrink: 1;
  flex-basis: 10vh;
}


button,
h1,
h2,
h3,
.display-text {
  font-family: "Saira", sans-serif;
}

textarea::placeholder {
  font-weight: 200;
  color: var(--ink300);
}

h1 {
  font-size: 36px;
  margin: 0;
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

a {
  color: var(--blue700);
  text-decoration: none;
  font-weight: 600;
}

a:hover {
  color: var(--blue700);
  text-decoration: underline;
}

a:visited {
  color: var(--blue700);
}

a:active {
  color: var(--green700);
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

button.compact {
  padding: 0px 8px;
}

button {
  text-transform: uppercase;
  box-sizing: border-box;
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
  font-family: "Saira", sans-serif;
  display: block;
  font-size: 16px;
  font-weight: 700;
  width: fit-content;
  line-height: 20px;
  padding: 0 8px;
  border: 1px dashed var(--ink);
  border-top-right-radius: 4px;
  border-bottom: none;
  padding-top: 2px;
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

.styled-input,
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

input:focus,
textarea:focus {
  outline: none !important;
  border: 3px solid var(--blue700);
}

.styled-input-container,
.textarea-container {
  width: 100%;
  display: flex;
  position: relative;
}

.styled-input-container::before,
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

*::-webkit-scrollbar {
  width: 10px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background: var(--ink);
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb:hover {
  background: var(--ink);
}

* {
  scrollbar-width: thin;
  scrollbar-color: var(--ink300) transparent;
}
</style>
