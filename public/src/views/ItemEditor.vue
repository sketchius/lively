<template>
  <div class="layout">
    <div class="flex-wing"></div>
    <div class="content">
      <header>
        <div class="progress-container">
          <div class="progress"></div>
          <button class="cancel">X</button>
        </div>
      </header>
    </div>
    <div class="flex-wing"></div>
  </div>
</template>

<script setup></script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
}

.flex-wing {
  flex-grow: 1;
  flex-shrink: 1;
}

.content {
  flex-basis: 1200px;
}

.socket {
  flex-grow: 1;
  width: 100%;
}

header {
  display: flex;
  align-items: center;
}

.progress-container {
  display: flex;
  margin-top: var(--size6);
  margin-bottom: var(--size6);
  height: fit-content;
  width: 100%;
}

.progress {
  height: var(--size5);
  width: 600px;
}

button.cancel {
  height: var(--size5);
  width: var(--size5);
  background: none;
  border: 2px solid var(--ink);
  color: var(--ink);
  font-size: 20px;
  border-radius: 15px;
  margin-left: auto;
}
</style>
