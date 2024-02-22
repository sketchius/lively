<template>
  <div class="calendar">
    <div class="controls">
      <div class="control" @click="previousMonth">{{ "<" }}</div>
      <div class="label">{{ month }}</div>
      <div class="control" @click="nextMonth">{{ ">" }}</div>
      <div class="control" @click="previousYear">{{ "<" }}</div>
      <div class="label">{{ year }}</div>
      <div class="control" @click="nextYear">{{ ">" }}</div>
    </div>

    <div class="week headers">
      <div class="day header">SUN</div>
      <div class="day header">MON</div>
      <div class="day header">TUE</div>
      <div class="day header">WED</div>
      <div class="day header">THU</div>
      <div class="day header">FRI</div>
      <div class="day header">SAT</div>
    </div>
    <div class="week" v-for="week in weeks" :key="week">
      <div
        class="day"
        :class="{
          selected: day.date == selectedDay && day.monthOffset == 0,
          'in-month': day.monthOffset == 0,
        }"
        @click="handleDayClick(day)"
        v-for="day in week"
        :key="day"
      >
        {{ day.date }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  eachDayOfInterval,
  addDays,
  getDate,
  format,
  addMonths,
  subMonths,
} from "date-fns";

const selectedDay = ref();
const weeks = ref([]);
const month = ref("");
const monthId = ref(0);
const year = ref(0);

const emit = defineEmits(["update"]);

const buildCalendar = () => {
  const firstDayOfMonth = startOfMonth(new Date(year.value, monthId.value));
  const lastDayOfMonth = endOfMonth(firstDayOfMonth);

  let startOfCalendarView = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 });

  let endOfCalendarView = addDays(startOfCalendarView, 6 * 7 - 1);

  const days = eachDayOfInterval({
    start: startOfCalendarView,
    end: endOfCalendarView,
  });

  const dayData = days.map((day) => {
    let monthOffset = 0;
    if (day < firstDayOfMonth) {
      monthOffset = -1;
    } else if (day > lastDayOfMonth) {
      monthOffset = 1;
    }

    return {
      date: getDate(day),
      monthOffset,
    };
  });

  const weekData = [];
  for (let week = 0; week < 6; week++) {
    weekData.push(dayData.slice(week * 7, (week + 1) * 7));
  }

  weeks.value = weekData;
};

const initializeMonthAndYear = () => {
  const currentDate = new Date();
  selectedDay.value = currentDate.getDate();
  monthId.value = currentDate.getMonth();
  month.value = format(currentDate, "MMM");
  year.value = currentDate.getFullYear();
  emit("update", {
    type: "datePickerDate",
    date: new Date(year.value, monthId.value, selectedDay.value),
  });
  buildCalendar();
};

const previousMonth = () => {
  const currentDate = new Date(year.value, monthId.value);
  const updatedDate = subMonths(currentDate, 1);
  monthId.value = updatedDate.getMonth();
  month.value = format(updatedDate, "MMM");
  year.value = updatedDate.getFullYear();
  buildCalendar();
};

const nextMonth = () => {
  const currentDate = new Date(year.value, monthId.value);
  const updatedDate = addMonths(currentDate, 1);
  monthId.value = updatedDate.getMonth();
  month.value = format(updatedDate, "MMM");
  year.value = updatedDate.getFullYear();
  buildCalendar();
};

const nextYear = () => {
  year.value += 1;
  buildCalendar();
};

const previousYear = () => {
  year.value -= 1;
  buildCalendar();
};

const handleDayClick = (day) => {
  selectedDay.value = day.date;
  emit("update", {
    type: "datePickerDate",
    date: new Date(year.value, monthId.value, day.date),
  });
  if (day.monthOffset == 1) {
    nextMonth();
  } else if (day.monthOffset == -1) {
    previousMonth();
  }
};

initializeMonthAndYear();
</script>

<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  box-sizing: border-box;
}

.controls {
  background-color: var(--paper);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  font-size: 20px;
  border-bottom: 1px solid var(--ink);
}

.controls > * {
  padding: 10px 0;
}

.week {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  border-bottom: 1px solid var(--ink);
}

.day {
  border-right: 1px solid var(--ink);
}

.day:last-child {
  border-right: none;
}

.headers {
  border-bottom: none;
  border-top: 1px solid var(--ink);
}

.header {
  font-size: 12px;
  font-weight: 700;
  border-bottom: 3px double var(--ink);
}

.day {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  cursor: pointer;
}

.selected {
  background-color: var(--green);
}

.in-month {
  font-weight: 700;
}


.day:hover {
  background-color: var(--greenLight);
}
</style>
