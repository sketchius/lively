<template>
  <div class="tag">
    <div class="level">
      {{ $props.level }}
    </div>
    <div
      class="display"
      :class="{
        minimal: props.level == 1,
        low: props.level == 2,
        medium: props.level == 3,
        high: props.level == 4,
        critical: props.level == 5,
      }"
    >
      {{ displayName }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
const props = defineProps({
  level: Number,
});

const displayName = computed(() => {
  switch (props.level) {
    case 1:
      return "MINIMAL";
    case 2:
      return "LOW";
    default:
    case 3:
      return "MEDIUM";
    case 4:
      return "HIGH";
    case 5:
      return "CRITICAL";
  }
});
</script>

<style scoped>
.tag {
  display: flex;
  font-size: 14px;
  width: fit-content;
  background-color: #5a6798;
  border-radius: 3px;
  margin: 0;
}
.level {
  width: 10px;
  padding: 0 1px 0 2px;
  font-weight: 700;
  text-align: center;
  color: #fffcf2;
  background-color: #5a6798;
  border: 1.5px solid #5a6798;
  border-radius: 3px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.display {
  padding: 0 7px 0 5px;
  font-weight: 700;
  color: #5a6798;
  border: 1.5px solid #5a6798;
  border-radius: 3px;
}

.minimal {
  background-color: #ffffff;
  color: #8592c1;
}

.low {
  background-color: #efefef;
}

.medium {
  background-color: #b0ffcb;
}

.high {
  background-color: #fff6a5;
}

.critical {
  background-color: #ffcaca;
}
</style>
