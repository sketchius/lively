<template>
  <div class="container">
    <h2>TIME FRAME</h2>
    <output class="display">
      <div class="type">{{ timeFrame.typeDisplay }}</div>
      <div class="date">{{ timeFrame.date }}</div>
      <!-- dynamic display text -->
    </output>
    <div class="ratio-buttons">
      <div class="radio">
        <input
          type="radio"
          id="option1"
          value="Flexible"
          name="type"
          v-model="timeFrame.type"
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
          v-model="timeFrame.type"
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
          v-model="timeFrame.type"
        />
        <label for="option2">Scheduled</label>
        <caption>
          Can only be done during the time frame.
        </caption>
      </div>
      <div class="row">
        <div
          class="tab"
          :class="{ selected: timeFrame.interval == 'Day' }"
          @click="handleIntervalTabClick('Day')"
        >
          Day
        </div>
        <div
          class="tab"
          :class="{ selected: timeFrame.interval == 'Week' }"
          @click="handleIntervalTabClick('Week')"
        >
          Week
        </div>
        <div
          class="tab"
          :class="{ selected: timeFrame.interval == 'Month' }"
          @click="handleIntervalTabClick('Month')"
        >
          Month
        </div>
        <div
          class="tab"
          :class="{ selected: timeFrame.interval == 'Year' }"
          @click="handleIntervalTabClick('Year')"
        >
          Year
        </div>
      </div>
    </div>
    <div class="picker">
      <component :is="pickerComponent" @update="handlePickerUpdate"></component>
    </div>
    <div class="buttons">
      <button class="minor" @click="handleCancel">Cancel</button
      ><button class="standard" @click="handleSave">Save</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from "vue";
import { format, startOfWeek } from "date-fns";
import DayPicker from "./DayPicker.vue";
import WeekPicker from "./WeekPicker.vue";
import MonthPicker from "./MonthPicker.vue";
import YearPicker from "./YearPicker.vue";

const emit = defineEmits(["cancel", "save"]);

const timeFrame = reactive({
  date: undefined,
  type: "Flexible",
  typeDisplay: "",
  interval: "Day",
});

const handleIntervalTabClick = (tab) => {
  console.log("Interval Click");
  timeFrame.interval = tab;
  updateTypeDisplay();
};

const updateTypeDisplay = () => {
  switch (timeFrame.type) {
    case "Flexible":
      timeFrame.typeDisplay = "Around";
      break;
    case "Deadline":
      timeFrame.typeDisplay = "By";
      break;
    case "Scheduled":
      switch (timeFrame.interval) {
        default:
        case "Day":
          timeFrame.typeDisplay = "On";
          break;
        case "Week":
        case "Month":
        case "Year":
          timeFrame.typeDisplay = "During";
          break;
      }
      break;
  }
};

const handlePickerUpdate = (updateData) => {
  switch (timeFrame.interval) {
    default:
    case "Day": {
      const dateData = updateData.date;
      const formattedDate = format(dateData, "MMMM do, yyyy");
      timeFrame.date = formattedDate;

      break;
    }
    case "Week": {
      const dateData = updateData.date;
      const firstDayOfWeek = startOfWeek(dateData, { weekStartsOn: 0 });
      const formatDate = (dataData) => format(dataData, "MMM do");
      timeFrame.date = formatDate(firstDayOfWeek);
      break;
    }
    case "Month": {
      const dateData = updateData.date;
      const formattedDate = format(dateData, "MMMM, yyyy");
      timeFrame.date = formattedDate;
      break;
    }
    case "Year": {
      const dateData = updateData.date;
      const formattedDate = format(dateData, "yyyy");
      timeFrame.date = formattedDate;
      break;
    }
  }

};

const handleCancel = () => {
  emit("cancel");
}

const handleSave = () => {
  emit("save", {
    date: timeFrame.date,
    type: timeFrame.type,
    interval: timeFrame.interval,
    display: `${timeFrame.typeDisplay} ${timeFrame.date}`,
  });
}

const pickerComponent = computed(() => {
  switch (timeFrame.interval) {
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

watch(
  () => timeFrame.type,
  () => {
    updateTypeDisplay();
  }
);

updateTypeDisplay();
</script>

<style scoped>
.label-group {
  margin-top: 15px;
  display: flex;
}

h2 {
  margin: 0;
  margin-left: var(--size2);
  margin-top: var(--size2);
  text-align: left;
}

output {
  width: fit-content;
  font-size: 24px;
  padding: 5px 15px;
  margin-left: 10px;
  display: flex;
  gap: var(--size1);
  align-items: baseline;
  border: 3px double var(--ink);
}

output .type {
  font-size: 18px;
  font-weight: 400;
}

output .date {
  font-size: 22px;
}
.container {
  display: flex;
  flex-direction: column;
  width: 600px;
  height: fit-content;
  border: 4px solid var(--ink);
}

.ratio-buttons {
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
  background-color: var(--green500);
}

.buttons {
  display: flex;
  max-height: 40px;
  margin: var(--size1);
  gap: var(--size0);
  justify-content: flex-end;
}
</style>
./DayPicker.vue./WeekPicker.vue./MonthPicker.vue./YearPicker.vue
