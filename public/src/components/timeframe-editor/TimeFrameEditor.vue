<template>
  <div class="container">
    <label for="picker" class="picker-label">TIME FRAME</label>
    <output class="display">
      <div class="type">{{ selectedTypeText }}:</div>
      <div class="date">{{ date }}</div>
      <!-- dynamic display text -->
    </output>
    <div class="buttons">
      <div class="radio">
        <input
          type="radio"
          id="option1"
          value="Flexible"
          name="type"
          v-model="selectedType"
        />
        <label for="option1">Flexible</label>
        <caption>
          Should be done around the time frame.
        </caption>

        <input
          type="radio"
          id="option2"
          value="Deadline"
          name="type"
          v-model="selectedType"
        />
        <label for="option2">Deadline</label>
        <caption>
          Must be done by the end of the time frame.
        </caption>

        <input
          type="radio"
          id="option2"
          value="Scheduled"
          name="type"
          v-model="selectedType"
        />
        <label for="option2">Scheduled</label>
        <caption>
          Can only be done during the time frame.
        </caption>
      </div>
      <div class="row">
        <div
          class="tab"
          :class="{ selected: selectedInterval == 'Day' }"
          @click="handleIntervalTabClick('Day')"
        >
          Day
        </div>
        <div
          class="tab"
          :class="{ selected: selectedInterval == 'Week' }"
          @click="handleIntervalTabClick('Week')"
        >
          Week
        </div>
        <div
          class="tab"
          :class="{ selected: selectedInterval == 'Month' }"
          @click="handleIntervalTabClick('Month')"
        >
          Month
        </div>
        <div
          class="tab"
          :class="{ selected: selectedInterval == 'Year' }"
          @click="handleIntervalTabClick('Year')"
        >
          Year
        </div>
      </div>
    </div>
    <div class="picker">
      <component :is="pickerComponent" @update="handlePickerUpdate"></component>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { format, startOfWeek, endOfWeek } from "date-fns";
import DayPicker from "./picker-components/DayPicker.vue";
import WeekPicker from "./picker-components/WeekPicker.vue";
import MonthPicker from "./picker-components/MonthPicker.vue";
import YearPicker from "./picker-components/YearPicker.vue";

const selectedInterval = ref("Day");
const selectedTypeText = ref("");
const selectedType = ref("Flexible");

const date = ref("null");

const handleIntervalTabClick = (tab) => {
  selectedInterval.value = tab;
  updateTypeDisplay();
};

const updateTypeDisplay = () => {
  console.log(selectedType.value);
  switch (selectedType.value) {
    case "Flexible":
      selectedTypeText.value = "Sometime around";
      break;
    case "Deadline":
      selectedTypeText.value = "By the end of";
      break;
    case "Scheduled":
      switch (selectedInterval.value) {
        default:
        case "Day":
          selectedTypeText.value = "On";
          break;
        case "Week":
        case "Month":
        case "Year":
          selectedTypeText.value = "During";
          break;
      }
      break;
  }
};

const handlePickerUpdate = (updateData) => {
  switch (selectedInterval.value) {
    default:
    case "Day": {
      const dateData = updateData.date;
      const formattedDate = format(dateData, "MMMM do, yyyy");
      date.value = formattedDate;
      break;
    }
    case "Week": {
      const dateData = updateData.date;
      const firstDayOfWeek = startOfWeek(dateData, { weekStartsOn: 0 });
      const lastDayOfWeek = endOfWeek(dateData, { weekStartsOn: 0 });

      const formatDate = (dataData) => format(dataData, "MMM do");
      date.value = `Week of ${formatDate(firstDayOfWeek)} - ${formatDate(
        lastDayOfWeek
      )}`;
      break;
    }
    case "Month": {
      const dateData = updateData.date;
      const formattedDate = format(dateData, "MMMM, yyyy");
      date.value = formattedDate;
      break;
    }
    case "Year": {
      const dateData = updateData.date;
      const formattedDate = format(dateData, "yyyy");
      date.value = formattedDate;
      break;
    }
  }
};

const pickerComponent = computed(() => {
  switch (selectedInterval.value) {
    default:
    case "Day":
      return DayPicker;
    case "Week":
      return WeekPicker;
    case "Month":
      return MonthPicker;
    case "Year":
      return YearPicker;
  }
});

watch(selectedType, () => {
  updateTypeDisplay();
});

updateTypeDisplay();
</script>

<style scoped>
.picker-label {
 margin-top: 15px; 
}

output {
  width: fit-content;
  font-size: 24px;
  padding: 5px;
  margin-left: 10px;
  /* background-color: var(--white); */
}

output .type {
  font-size: 18px;
  text-transform: uppercase;
  margin-left: 10px;
  font-weight: 400;
}

output .date {
  font-size: 22px;
  padding: 5px;
  font-weight: 700;
  margin: 5px;
  background-color: var(--greenLight);
}
.container {
  display: flex;
  flex-direction: column;
  width: 600px;
  height: fit-content;
  border: 4px solid var(--ink);
}

.buttons {
  display: flex;
  flex-direction: column;
  grid-gap: 2px;
  padding: 3px 0;
}

.row {
  width: 100%;
  display: flex;
  grid-gap: 2px;
  border-top: 2px solid var(--ink);
  border-bottom: 2px solid var(--ink);
  background-color: var(--ink);
}

.tab {
  display: flex;
  justify-items: center;
  justify-content: center;
  background-color: var(--paper);
  flex-grow: 1;
  padding: 3px 0;
}

.radio {
  background: none;
  display: grid;
  align-items: center;
  grid-template-columns: auto auto 1fr;
  grid-template-rows: 1fr 1fr;
  padding: 10px;
  row-gap: 5px;
  column-gap: 5px;
}

.radio label {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  display: inline;
}

.radio caption {
  font-size: 14px;
  text-align: left;
  margin-left: 5px;
}

.tab.selected {
  background-color: var(--green);
}
</style>
