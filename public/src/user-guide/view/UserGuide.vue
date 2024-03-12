<template>
  <component :is="component"></component>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import LivelyCapabilities from "../components/LivelyCapabilities.vue";

const route = useRoute();
let component = computed(() => {
  switch (route.meta.component) {
    case "Capabilities":
      return LivelyCapabilities;
    default:
      return undefined;
  }
});
</script>
