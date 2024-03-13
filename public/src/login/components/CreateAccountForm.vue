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
            @input="handleInput"
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
            @input="handleInput"
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
            @input="handleInput"
            required
          />
        </div>

        <caption class="error">
          {{
            errorMessage
          }}
        </caption>
        <div class="buttons">
          <button type="submit" class="standard">Create Account</button>
        </div>
        <aside>
          Have an account? Click <RouterLink to="login">here</RouterLink> to
          login.
        </aside>
      </form>
      <section class="password-requirements">
        <h3>Password Requirements</h3>
        <ul>
          <li :class="passReqLength">Must be at least 6 characters.</li>
          <li :class="passReqUppercase">Must have an uppercase letter.</li>
          <li :class="passReqNumber">Must have a number.</li>
          <li :class="passReqSpecial">Must have a special character.</li>
          <li :class="passReqMatch">Passwords must match.</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { register } from "@/services/authService";
import userService from "@/services/userService";
import { useRouter } from "vue-router";
// import { useStore } from "vuex";

// const store = useStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
let inputTimer = null;

const passReqLength = ref("bullet");
const passReqUppercase = ref("bullet");
const passReqNumber = ref("bullet");
const passReqSpecial = ref("bullet");
const passReqMatch = ref("bullet");

const createAccount = async () => {
  if (
    passReqLength.value == "pass" &&
    passReqUppercase.value == "pass" &&
    passReqNumber.value == "pass" &&
    passReqSpecial.value == "pass" &&
    passReqMatch.value == "pass"
  ) {
    try {
      const uid = await register(email.value, password.value);
      console.log("registered user. uid = ", uid);
      await userService.createUser(uid);
      userService.removeDemoUser();
      router.push('/notes');
    } catch (error) {
      console.log("Error Creating Account:");
      console.log(error);
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage.value = "The email address is not valid.";
          break;
        case "auth/weak-password":
          errorMessage.value =
            "The password must have at least 6 characters, with at least one number, one uppercase letter, and one special character.";
          break;
        case "auth/email-already-in-use":
          errorMessage.value =
            "The email address is already in use by another account. Try <RouterLink :to='{ path: login}'>logging in</RouterLink>.";
          break;
        case "auth/operation-not-allowed":
          errorMessage.value = "Email/password accounts are not enabled.";
          break;
        case "auth/network-request-failed":
          errorMessage.value =
            "A network error has occurred. Check your network connection.";
          break;
        default:
          errorMessage.value = "Registration error: " + error.message;
      }
    }
  } else {
    errorMessage.value = "Password requirements not met.";
  }
};

const handleInput = () => {
  if (inputTimer !== null) {
    clearTimeout(inputTimer);
  }
  inputTimer = setTimeout(validateInput, 50);
};

const validateInput = () => {
  if (password.value) {
    if (password.value.length < 6) {
      passReqLength.value = "fail";
    } else {
      passReqLength.value = "pass";
    }
    const hasUppercase = /[A-Z]/.test(password.value);
    if (hasUppercase) {
      passReqUppercase.value = "pass";
    } else {
      passReqUppercase.value = "fail";
    }
    const hasNumber = /\d/.test(password.value);
    if (hasNumber) {
      passReqNumber.value = "pass";
    } else {
      passReqNumber.value = "fail";
    }
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password.value);
    if (hasSpecialChar) {
      passReqSpecial.value = "pass";
    } else {
      passReqSpecial.value = "fail";
    }
    if (confirmPassword.value) {
      if (password.value != confirmPassword.value) {
        passReqMatch.value = "fail";
      } else {
        passReqMatch.value = "pass";
      }
    } else {
      passReqMatch.value = "bullet";
    }
  } else {
    passReqLength.value = "bullet";
    passReqUppercase.value = "bullet";
    passReqNumber.value = "bullet";
    passReqSpecial.value = "bullet";
    passReqMatch.value = "bullet";
  }
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
button {
  width: 100%;
}
.error {
  margin: 0;
  text-align: left;
  font-size: 12px;
  min-height: 14px;
  color: var(--red700);
}
.password-requirements {
  align-self: center;
  padding: var(--size4);
}
.password-requirements h3 {
  margin: var(--size1) 0;
}
.password-requirements ul {
  display: flex;
  padding-left: var(--size1);
  flex-direction: column;
  gap: var(--size0);
  margin: 0;
  list-style-type: none;
}

li {
  display: flex;
  align-items: center;
  min-height: 22px;
}

li.bullet:before {
  display: inline-block;
  text-align: center;
  width: 8px;
  content: "•";
  padding-right: 12px;
}
li.fail:before {
  display: inline-block;
  text-align: center;
  width: 8px;
  content: "X";
  padding-right: 12px;
  color: var(--red700);
}
li.pass:before {
  display: inline-block;
  text-align: center;
  width: 8px;
  content: "✔";
  padding-right: 12px;
  color: var(--green700);
  transform: translateX(-1px) translateY(-1px);
}
</style>
