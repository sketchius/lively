<template>
  <div class="calendar">
    <div class="controls">
      <div class="control" @click="previousDecade">{{ "<" }}</div>
      <div class="label">{{ startYear }} - {{ endYear }}</div>
      <div class="control" @click="nextDecade">{{ ">" }}</div>
    </div>
    <div class="years">
      <div
        class="year"
        :class="{ selected: selectedYear == year }"
        v-for="year in decadeYears"
        :key="year"
        @click="handleYearClick(year)"
      >
        {{ year }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const currentYear = new Date().getFullYear();
const selectedYear = ref(currentYear);
const startYear = ref(Math.floor(currentYear / 10) * 10);
const endYear = ref(startYear.value + 9);
const decadeYears = ref(
  Array.from({ length: 10 }, (_, i) => startYear.value + i)
);
const emit = defineEmits(["update"]);

emit("update", {
  type: "yearPickerDate",
  date: new Date(currentYear, 0),
});

const handleYearClick = (year) => {
  selectedYear.value = year;
  emit("update", {
    type: "yearPickerDate",
    date: new Date(year, 0),
  });
};

const previousDecade = () => {
  startYear.value -= 10;
  endYear.value = startYear.value + 9;
  decadeYears.value = Array.from({ length: 10 }, (_, i) => startYear.value + i);
};

const nextDecade = () => {
  startYear.value += 10;
  endYear.value = startYear.value + 9;
  decadeYears.value = Array.from({ length: 10 }, (_, i) => startYear.value + i);
};
</script>

<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 2px solid var(--ink);
}

.controls {
  display: flex;
  justify-content: center;
  gap: var(--size3);
  width: 100%;
  padding: 10px 0;
  font-size: 20px;
}

.years {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  border-top: 2px solid var(--ink);
}

.year {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70px;
  font-weight: 700;
  border-bottom: 1px solid var(--ink);
  border-right: 1px solid var(--ink);
  cursor: pointer;
}

.selected {
  background-color: var(--green500);
}
</style>
