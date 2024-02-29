<template>
  <div class="dialogue">
    <div class="layout">
      <main :class="{ 'has-subtext': props.subtext }">
        <div class="icon-container" @click="startAnimation">
          <div class="icon">
            <div class="gradient" :class="{ 'animate-once': animate }"></div>
          </div>
        </div>
        <div class="content">
          <slot name="message"></slot>
        </div>
        <div class="subtext">{{ props.subtext }}</div>
      </main>
      <footer v-if="props.button">
        <button class="minor" @click.prevent="props.onButtonClick">
          <div class="icon-container" @click="startAnimation">
            <div class="icon">
              <div class="gradient" :class="{ 'animate-once': animate }"></div>
            </div>
          </div>
          {{ props.button }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

const animate = ref(false);

const props = defineProps({
  subtext: String,
  button: String,
  onButtonClick: Function,
});

const startAnimation = () => {
  if (!animate.value) {
    animate.value = true;
    setTimeout(() => {
      animate.value = false;
    }, 3000);
  }
};
</script>

<style scoped>
.dialogue {
  display: flex;
  align-items: center;
  margin-top: var(--size5);
  margin-bottom: var(--size4);
  margin-left: 0;
  margin-right: 0;
  border: 4px double var(--ink);
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
}

.layout {
  display: flex;
  grid-gap: 10px;
  flex-direction: column;
}

main {
  display: flex;
}

main.has-subtext {
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: fit-content fit-content;
  grid-row-gap: 10px;
}

.subtext {
  grid-column: 2;
  font-size: 14px;
  font-style: italic;
  font-weight: 400;
}

footer {
  flex-shrink: 1;
  display: flex;
  width: 100%;
  justify-content: center;
}

.vertical {
  flex-direction: column;
}

.content {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
}

.content ::v-deep button {
  align-self: center;
}

.content.gap {
  grid-gap: var(--size1);
}

.message {
  font-size: 18px;
  font-weight: 700;
}

.icon-container {
  margin-right: 20px;
  margin-left: 10px;
  padding: 5px 0;
  border-right: 1px dashed var(--ink);
  align-self: center;
}

.icon-container .icon {
  width: 20px;
  height: 20px;
  margin-right: 14px;
  transform: rotate(45deg);
  border: 5px solid var(--ink);
}

.gradient {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    var(--red500) 0%,
    var(--yellow500) 12.5%,
    var(--green500) 25%,
    var(--blue500) 37.5%,
    var(--red500) 50%,
    var(--yellow500) 62.5%,
    var(--green500) 75%,
    var(--blue500) 87.5%,
    var(--red500) 100%
  );
  background-position: 110% 32.5%;
  background-size: 230% 200%;
}

.animate-once {
  background-size: 230% 200%;
  background-position: -50% 0%;
  animation: gradient 3s ease-in-out reverse;
}

@keyframes gradient {
  0% {
    background-position: -245% 32.5%;
    background-size: 230% 200%;
  }

  100% {
    background-position: 375% 130%;
  }
}
/* @keyframes gradient {
  0% {
    background-position: 400% 130%;
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(405deg);
  }
} */

button {
  display: flex;
  align-items: center;
  grid-gap: 10px;
}
button .icon-container {
  margin: 0;
  padding: 0;
  border: none;
  align-self: center;
}

button .icon-container .icon {
  width: 10px;
  height: 10px;
  margin: 0;
  transform: rotate(45deg);
  border: 2px solid var(--ink);
}
</style>
