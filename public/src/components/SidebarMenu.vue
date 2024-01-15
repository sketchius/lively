<template>
  <div class="sidebar">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/tasks">Tasks</router-link></li>
      <li><router-link to="/objectives">Objectives</router-link></li>
      <li><router-link to="/goals">Goals</router-link></li>
      <li><router-link to="/habits">Habits</router-link></li>
      <li><router-link to="/routines">Routines</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SidebarMenu",
};
</script>

<style scoped>
.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin: 10px 0;
}
</style>
