<template>
  <article>
    <h1>|| Lively Assistant Capabilities</h1>
    <ul>
      <li>
        <strong>Taking Notes:</strong> Tell Lively about things you need to do
        or remember, and it will save them as <RouterLink to="user-guide/notes">Notes</RouterLink>.
      </li>
      <li>
        <strong>Creating Tasks and Goals:</strong> You can quickly create new
        <RouterLink to="user-guide/tasks">Tasks</RouterLink> or <RouterLink to="user-guide/goals">Goals</RouterLink> by describing what you need to do in natural language.
        Lively can fill in any missing details with smart suggestions.
      </li>
      <li>
        <strong>Smart Planning:</strong> Check-in with Lively each day to plan
        your <RouterLink to="user-guide/to-do-list">To-Do List</RouterLink>. The assistant will make suggestions based on the
        urgency and importance of each item.
      </li>
      <li>
        <strong>Ask Questions:</strong> Lively can explain any of the features
        in the application.
      </li>
      <li>
        <strong>Search:</strong> Quickly find any item you've created for speedy
        reference.
      </li>
    </ul>
  </article>
</template>

<script setup></script>

<style scoped>
article {
  width: 60ch;
}

ul {
  display: flex;
  flex-direction: column;
  gap: var(--size2);
}
</style>
