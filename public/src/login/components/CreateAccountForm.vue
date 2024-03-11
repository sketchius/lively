<template>
  <div class="flex-container">
    <div class="layout">
      <form @submit.prevent="createAccount">
        <h2>Create an Account</h2>

        <div class="input-group">
          <label for="email">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            name="email"
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

        <div class="input-group">
          <label for="confirm-password">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirm-password"
            name="confirm-password"
            required
          />
        </div>

        <div class="buttons">
          <button type="submit" class="standard">Create Account</button>
        </div>
        <aside>
          Have an account? Click <RouterLink to="login">here</RouterLink> to
          login.
        </aside>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// import { useRouter } from "vue-router";
// import { useStore } from "vuex";

// const store = useStore();
// const router = useRouter();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const createAccount = () => {
  // Add your logic here for account creation
  // This might include validation, calling an API to create the account, etc.
  console.log("Account creation logic goes here.");
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
