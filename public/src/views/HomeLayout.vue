<template>
  <div class="layout">
    <div class="left-panel">
      <!-- Center panel content -->
      <GoalList />
      <GoalForm />
    </div>
    <div class="right-panel"></div>
  </div>
</template>

<script>
import GoalForm from "@/components/GoalForm.vue"; // Adjust the path as necessary
import GoalList from "@/components/GoalList.vue";

export default {
  setup() {
    return {};
  },
  components: {
    GoalForm,
    GoalList,
  },
};
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
  padding: 10em;
  box-sizing: border-box;
  width: 60vw;
  height: 100%;
}
</style>
