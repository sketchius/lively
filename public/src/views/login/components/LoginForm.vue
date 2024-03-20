<template>
  <div class="flex-container">
    <div class="layout">
      <form @submit.prevent="">
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
        <caption class="error">
          {{
            errorMessage
          }}
        </caption>

        <div class="buttons">
          <button type="submit" @click="handleLogIn" class="standard">
            Log In
          </button>
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
import { logIn } from "@/services/authService";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const errorMessage = ref("");

const store = useStore();

const router = useRouter();

const demoUser = store.state.user?.isDemoUser;

console.log('demoUser', demoUser);

const email = ref("");
const password = ref("");

const handleLogIn = async () => {
  try {
    await logIn(email.value, password.value);
    console.log("Logged in. Attempting to reroute.");
    store.commit("setAssistantEventData", {
      type: "log-in",
    });
    router.push({ name: "Home" });
  } catch (error) {
    console.log("Error: ");
    console.log(error);
    errorMessage.value = getErrorMessage(error.code);
  }
};

function getErrorMessage(code) {
  switch (code) {
    case "auth/wrong-password":
      return "The password is invalid or the user does not have a password.";
    case "auth/user-not-found":
      return "No user found with this email address.";
    case "auth/user-disabled":
      return "This user account has been disabled by an administrator.";
    case "auth/invalid-email":
      return "The email address is not valid.";
    case "auth/too-many-requests":
      return "We have blocked all requests from this device due to unusual activity. Try again later.";
    case "auth/network-request-failed":
      return "A network error (such as timeout, interrupted connection, or unreachable host) has occurred.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
}

const handleTryDemoAccess = () => {
  console.log("handleTryDemoAccess()");
  router.push({ name: `demo-terms` });
};

const handleUseDemoAccess = () => {
  console.log("handleUseDemoAccess()");
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
  display: flex;
  flex-direction: column;
  gap: var(--size0);
}
.error {
  margin: 0;
  text-align: left;
  font-size: 12px;
  min-height: 14px;
  color: var(--red700);
}
button {
  width: 100%;
}
</style>
