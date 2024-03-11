<template>
  <component :is="component"></component>
</template>

<script setup>
import DemoTerms from "../components/DemoTerms.vue";
import LoginForm from "../components/LoginForm.vue";
import CreateAccountForm from "../components/CreateAccountForm.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
let component = computed(() => {
  switch (route.meta.component) {
    case "DemoTerms":
      return DemoTerms;
    default:
    case "Login":
      return LoginForm;
    case "CreateAccount":
      return CreateAccountForm;
  }
});
</script>
