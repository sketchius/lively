<template>
  <nav class="menu">
    <!-- <router-link class="menu-item display-text" to="/">Home</router-link> -->
    <router-link class="menu-item display-text" to="/notes">Notes</router-link>
    <router-link class="menu-item display-text" to="/tasks">Tasks</router-link>
    <router-link class="menu-item display-text" to="/to-do-list"
      >To-Do List</router-link
    >
    <!-- <router-link class="menu-item display-text" to="/goals">Goals</router-link> -->
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
  gap: var(--size3);
  background-color: var(--paper700);
  min-height: 4vh;
  flex-basis: 4vh;
  flex-grow: 0;
  flex-shrink: 0;
}

.menu-item {
  text-decoration: none;
  font-weight: 600;
  color: var(--ink);
}

.menu-item:visited {
  color: var(--ink);
}

.menu-item:hover {
  text-decoration: underline;
}
</style>
