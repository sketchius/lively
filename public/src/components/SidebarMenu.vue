<template>
<nav class="menu">
  <router-link to="/">Home</router-link>
  <router-link to="/tasks">Tasks</router-link>
  <router-link to="/objectives">Objectives</router-link>
  <router-link to="/goals">Goals</router-link>
  <router-link to="/habits">Habits</router-link>
  <router-link to="/routines">Routines</router-link>
</nav>
</template>

<script>
export default {
  name: "SidebarMenu",
};
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-around; /* or space-between, depending on the desired spacing */
  align-items: center;
}



</style>
