<template>
  <div class="dialogue-container">
    <div class="icon-container"><div class="icon"></div></div>
    <div class="content" :class="{ gap: props.subtext }">
      <div class="message">
        {{ props.message }}
      </div>
      <div class="subtext">
        {{ props.subtext }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    message: String,
    subtext: String
})

</script>

<style scoped>

.dialogue-container {
  display: flex;
  align-items: center;
  margin-top: var(--size5);
  margin-bottom: var(--size4);
  border: 4px double var(--ink);
  border-radius: 8px;
  padding: 20px;
  width: 30ch;
}

.content {
    display: flex;
    flex-direction: column;
}

.content.gap {
    grid-gap: var(--size1)
}

.message {
  font-size: 18px;
  font-weight: 700;
}

.subtext {
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
}

.icon-container {
  margin-right: 20px;
  padding: 5px 0;
  border-right: 1px dashed var(--ink);
}

.icon-container .icon {
  width: 20px;
  height: 20px;
  margin-right: 9px;
  background: linear-gradient( 45deg, var(--red) 0%, var(--red) 20%, var(--yellow) 40%, var(--green) 60%, var(--blue) 80%, var(--blue) 90%);
  border: 3px solid var(--ink);
  transform: rotate(45deg);
}
</style>