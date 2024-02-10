<template>
  <div class="dialogue" :class="{ 'vertical': props.layout == 'vertical'}">
    <div class="icon-container" @click="startAnimation">
      <div class="icon">
        <div class="gradient" :class="{ 'animate-once': animate }"></div>
      </div>
    </div>
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
import { defineProps, ref } from "vue";

const animate = ref(false);

const props = defineProps({
  message: String,
  subtext: String,
  layout: String
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

.vertical {
  flex-direction: column;
}

.content {
  display: flex;
  flex-direction: column;
}

.content.gap {
  grid-gap: var(--size1);
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
  margin-left: 10px;
  padding: 5px 0;
  border-right: 1px dashed var(--ink);
}

.vertical .icon-container {
  margin-bottom: 10px;
  padding: 5px 0;
  border-right: none;
  border-bottom: 1px dashed var(--ink);
}

.icon-container .icon {
  width: 20px;
  height: 20px;
  margin-right: 14px;
  transform: rotate(45deg);
  border: 5px solid var(--ink);
}


.vertical .icon-container .icon {
  margin-left: 7px;
  margin-right: 7px;
  margin-bottom: 3px;
}

.gradient {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    var(--red) 0%,
    var(--yellow) 12.5%,
    var(--green) 25%,
    var(--blue) 37.5%,
    var(--red) 50%,
    var(--yellow) 62.5%,
    var(--green) 75%,
    var(--blue) 87.5%,
    var(--red) 100%
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
</style>
