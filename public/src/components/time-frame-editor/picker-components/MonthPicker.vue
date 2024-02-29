<template>
  <div class="calendar">
    <div class="controls">
      <div class="control" @click="previousYear">{{ "<" }}</div>
      <div class="label">{{ year }}</div>
      <div class="control" @click="nextYear">{{ ">" }}</div>
    </div>
    <div class="months">
      <div
        class="month"
        :class="{ selected: selectedMonth == index }"
        v-for="(month, index) in months"
        :key="index"
        @click="handleMonthClick(index)"
      >
        {{ month }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { format, getMonth, addYears, subYears } from "date-fns";

const months = ref(
  Array.from({ length: 12 }, (_, i) => format(new Date(0, i), "MMMM"))
);
const year = ref(new Date().getFullYear());
const selectedMonth = ref(getMonth(new Date()));
const emit = defineEmits(["update"]);

emit("update", {
  type: "monthPickerDate",
  date: new Date(year.value, selectedMonth.value),
});

const handleMonthClick = (monthIndex) => {
  selectedMonth.value = monthIndex;
  emit("update", {
    type: "monthPickerDate",
    date: new Date(year.value, selectedMonth.value),
  });
};

const previousYear = () => {
  year.value = subYears(new Date(year.value, 0), 1).getFullYear();
};

const nextYear = () => {
  year.value = addYears(new Date(year.value, 0), 1).getFullYear();
};
</script>

<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

.controls {
  display: flex;
  justify-content: center;
  gap: var(--size3);
  width: 100%;
  padding: 10px 0;
  font-size: 20px;
}

.months {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  border-top: 2px solid var(--ink);
}

.month {
  min-height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 700;
  border-bottom: 1px solid var(--ink);
  border-right: 1px solid var(--ink);
  cursor: pointer;
}
.selected {
  background-color: var(--green);
}
</style>
