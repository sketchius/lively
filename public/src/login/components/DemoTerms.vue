<template>
  <div class="flex-container">
    <div class="terms">
      <h1>Demo Access Terms of Use</h1>
      <p>
        Before you begin exploring the features with our demo account, we need
        to share a few important points.
      </p>
      <p>
        <i
          >TL;DR: Demo access doesn't offer the security and privacy available
          to regular accounts, so don't enter any personal or sensitive info!</i
        >
      </p>
      <p>
        <strong>Demo Access Use:</strong> Demo access is designed for you to
        experience the functionalities of our application without the need to
        create a standard account. This is an unsecured account intended for
        demonstration purposes only.
      </p>
      <p>
        <strong>Privacy and Security:</strong> Please be aware that the demo
        account does not provide the same level of security and privacy as a
        standard account. Therefore, we strongly advise against entering any
        personal, sensitive, or confidential information while using this
        account.
      </p>
      <p>
        <strong>Agreement:</strong> By choosing to use demo access, you agree to
        refrain from entering personal or sensitive information. Lively is not
        responsible for the protection of any data entered into the application
        using demo access and cannot guarantee the security of such information.
      </p>
      <p>
        <strong>Data Use and Deletion:</strong> Data entered with demo access
        will be deleted after a period of two weeks of inactivity and may be
        subject to review for quality and security purposes. Please note that
        any data entered may be removed without notice.
      </p>
      <p>By clicking "Agree," you acknowledge and agree to these terms.</p>
      <p>Enjoy your experience with Lively!</p>
      <button class="minor" @click="handleAgree">Agree</button>
      <button class="minor" @click="handleDecline">Decline</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import userService from "@/services/userService";
import { signInAsDemoUser } from "@/services/authService";
import { useStore } from "vuex";

const store = useStore();

const router = useRouter();

if (userService.getAgreed) {
  store.commit('setAssistantEventData', { type: 'create-account', accountType: 'demo' });
  router.push('goals');
}

const handleDecline = () => {
  router.push({ name: `login` });
};

const handleAgree = async () => {
  await userService.fetchDemoUID();
  userService.setAgreed(true);
  await signInAsDemoUser();
  store.commit('setAssistantEventData', { type: 'create-account', accountType: 'demo' });
  router.push({ name: `Goals` });
};
</script>

<style scoped>
.flex-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.terms {
  width: 80ch;
}
button {
  margin-right: var(--size2);
}
</style>
