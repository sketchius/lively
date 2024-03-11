<template>
  <div class="flex-container">
    <div class="layout">
      <form @submit.prevent="signIn">
        <h2>Have an Account?</h2>

        <div class="input-group">
          <label for="username">Username</label>
          <input
            v-model="email"
            type="text"
            id="username"
            name="username"
            required
          />
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>

        <div class="buttons">
          <button type="submit" class="standard">Log In</button>
          <button type="submit" class="standard">Sign In With Google</button>
          <button type="submit" class="minor">Forgot Password</button>
        </div>
      </form>
      <div class="create-account">
        <section>
          <h2>New User?</h2>
          <h3>Demo Access</h3>
          <p v-if="!demoUser">
            Try out Lively without needing to sign up by using using a temporary
            demo account. Data saved with demo access will be erased after two
            weeks of inactivity.
          </p>
          <p v-if="demoUser">
            You are currently enjoying demo access. Data saved with demo access
            will be erased after two weeks of inactivity.
          </p>
          <button
            v-if="!demoUser"
            class="standard"
            @click="handleTryDemoAccess"
          >
            Try Demo Access
          </button>
          <button v-if="demoUser" class="standard" @click="handleUseDemoAccess">
            Use Demo Access
          </button>
        </section>
        <section>
          <h3>Standard Account</h3>
          <p>
            Get access to basic features. Your data will be securely stored and
            accessible across multiple devices.
          </p>
          <button class="standard" @click="handleCreateAccount">
            Create Account
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();

const router = useRouter();

const demoUser = store.state.user?.isDemoUser;

const email = ref("");
const password = ref("");

const signIn = () => {};

const handleTryDemoAccess = () => {
  router.push({ name: `demo-terms` });
};

const handleUseDemoAccess = () => {
  store.commit("setAssistantEventData", {
    type: "create-account",
    accountType: "demo",
  });
  router.push(`goals`);
};

const handleCreateAccount = () => {
  router.push(`create-account`);
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 0;
  margin-bottom: var(--size2);
}
.flex-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.layout {
  display: flex;
}
form {
  display: flex;
  flex-direction: column;
  gap: var(--size2);
  padding: var(--size4);
  width: 30ch;
  border-right: 1px dashed var(--ink);
}
input {
  width: 100%;
  box-sizing: border-box;
}
.create-account {
  padding: var(--size3);
  width: 40ch;
  display: flex;
  flex-direction: column;
  gap: var(--size3);
}
.buttons {
  margin-top: var(--size1);
  display: flex;
  flex-direction: column;
  gap: var(--size0);
}
button {
  width: 100%;
}
</style>
