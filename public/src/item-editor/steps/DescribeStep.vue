<template>
  <div class="component">
    <h1>Description</h1>
    <AssistantDialogue
      :message = "'Message'"
      :subtext = "'Subtext'"
    />
    <form>
      <textarea name="description" id="description" rows="4"></textarea>
      <button class="major">NEXT</button>
    </form>
  </div>
</template>

<script setup>
import AssistantDialogue from '@/components/AssistantDialogue.vue';
</script>

<style scoped>
.component {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  margin: 0;
  padding: 0px 12px;
  background: linear-gradient(
    to top,
    transparent 25%,
    var(--blueLight) 25%,
    var(--blueLight) 75%,
    transparent 75%
  );
}

form {
  display: flex;
  flex-direction: column;
  grid-gap: var(--size2);
}

textarea {
  width: 60ch;
  border: 2px solid var(--ink);
  border-radius: 3px;
}

form button {
  align-self: flex-end;
}
</style>
