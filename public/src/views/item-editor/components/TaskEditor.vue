<template>
  <div class="component">
    <TimeFrameEditor
      v-if="showTimeFrameEditor"
      @save="updateTimeFrame"
      @cancel="setTimeFrameEditorVisibility(false)"
    />
    <form v-if="!showTimeFrameEditor" @submit.prevent="handleSave">
      <div class="layout">
        <section>
          <div class="label-group">
            <label for="title" class="picker-label">TITLE</label
            ><HelpComponent :helpId="'title'" />
          </div>
          <div class="styled-input-container">
            <input
              type="text"
              name="title"
              id="title"
              v-model="title"
              class="styled-input"
            />
          </div>
        </section>

        <section>
          <div class="label-group">
            <label for="title" class="picker-label">DETAILS</label
            ><HelpComponent :helpId="'details'" />
          </div>
          <div class="textarea-container">
            <textarea
              v-model="details"
              ref="detailsTextarea"
              @input="resizeDetailsTextarea"
              :name="'details'"
              :id="'details'"
              :rows="3"
            ></textarea>
          </div>
        </section>
        <section>
          <div class="label-group">
            <label for="category" class="picker-label">CATEGORY</label
            ><HelpComponent :helpId="'category'" />
          </div>
          <div class="categories">
            <div
              class="category"
              v-bind:key="categoryData"
              :class="{ selected: category == categoryData.name }"
              @click="selectCategory(categoryData)"
              v-for="categoryData of categories"
            >
              <span>{{ categoryData.name }}</span
              ><span class="importance">{{ categoryData.importance }}</span>
            </div>
          </div>
        </section>
        <section v-if="itemType == 'Task'">
          <div class="label-group">
            <label for="duration" class="picker-label">DURATION</label
            ><HelpComponent :helpId="'duration'" />
          </div>
          <div class="duration-container">
            <input
              type="number"
              id="duration"
              name="duration"
              size="2"
              min="1"
              max="1440"
              v-model="duration"
            />
            minutes
          </div>
        </section>
        <section>
          <div class="label-group">
            <label for="picker" class="picker-label">IMPORTANCE</label
            ><HelpComponent :helpId="'relativeImportance'" />
          </div>
          <div class="importance-container">
            <div class="value">
              <div class="importance">
                {{ categoryImportance + parseInt(modifier) }}
              </div>
              <div class="math">
                ({{ categoryImportance }}{{ parseInt(modifier) < 0 ? "" : "+"
                }}{{ parseInt(modifier) }})
              </div>
            </div>
            <div class="flex-column">
              <div class="explanation">
                <p>Importance inherited from Category.</p>
                <p>
                  Adjust the slider to fine-tune the importance for this item.
                </p>
              </div>
              <div class="modifier-label">Modifier</div>
              <div class="slider-wrapper">
                <vue-slider
                  :data="['-3', '-2', '-1', '0', '+1', '+2', '+3']"
                  :marks="true"
                  :tooltip="'none'"
                  :process-style="{ backgroundColor: 'var(--green700)' }"
                  :step-style="{
                    width: '3px',
                    backgroundColor: 'var(--ink)',
                  }"
                  v-model="modifier"
                ></vue-slider>
              </div>
            </div>
          </div>
        </section>
        <section class="time-frame-slot">
          <div class="label-group">
            <label for="picker" class="picker-label">TIME FRAME</label
            ><HelpComponent :helpId="'timeFrame'" />
          </div>
          <div class="time-frame-container">
            <output class="time-frame-display">{{ timeFrame.display }}</output
            ><button
              class="standard compact"
              @click="setTimeFrameEditorVisibility(true)"
            >
              Edit
            </button>
          </div>
        </section>
        <section v-if="itemType == 'Task'">
          <div class="label-group">
            <label for="sub-actions" class="picker-label">STEPS</label
            ><HelpComponent :helpId="'steps'" />
          </div>
          <div class="children-list">
            <draggable
              v-model="children"
              class="draggable-list"
              group="steps"
              @start="drag = true"
              @end="drag = false"
              item-key="id"
            >
              <template #item="{ element, index }">
                <div class="child list-item">
                  {{ index + 1 + ") " + element }}
                </div>
              </template>
            </draggable>
            <input
              class="list-item"
              v-if="addingChild"
              v-focus
              @keydown="handleInput"
              type="text"
              name="newchild"
              id="newchild"
            />
            <button
              v-if="!addingChild"
              class="addChild minor"
              @click.prevent="addChild"
            >
              + ADD NEW
            </button>
          </div>
        </section>
      </div>

      <div class="buttons">
        <button class="submit major" @click.prevent="handleSave">SAVE</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { defineEmits, ref, onMounted, computed } from "vue";
import dataService from "@/services/dataService.js";
import { createUID } from "@/util/uuid";
import draggable from "vuedraggable";
import { format } from "date-fns";
import TimeFrameEditor from "./TimeFrameEditor.vue";

import HelpComponent from "@/components/help-component/HelpComponent.vue";

import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

const emit = defineEmits(["setTitle", "submit", "back"]);

const store = useStore();

const drag = ref("false");
const addingChild = ref(false);
const children = ref(store.state.formData.steps || []);

const itemType = computed(() => store.state.formData.type);

const title = ref(store.state.formData.title || "");
const duration = ref(store.state.formData.duration || "");
const category = ref(store.state.formData.category || "work");
const categories = [
  { name: "Work", importance: 8 },
  { name: "Household", importance: 6 },
  { name: "Errand", importance: 6 },
  { name: "Life Management", importance: 7 },
  { name: "Personal", importance: 3 },
  { name: "Wellness", importance: 7 },
];
const modifier = ref("0");
const currentDate = format(new Date(), "MMMM do, yyyy");

const detailsTextarea = ref(null);

const showTimeFrameEditor = ref(false);

const timeFrame = ref(
  store.state.formData.timeFrame || {
    date: currentDate,
    interval: "Day",
    type: "Flexible",
    display: `Around ${currentDate}`,
  }
);

const resizeDetailsTextarea = () => {
  detailsTextarea.value.style.height = "1rem";
  detailsTextarea.value.style.height = `${detailsTextarea.value.scrollHeight}px`;
};

const categoryImportance = ref(0);

categories.forEach((categoryItem) => {
  if (categoryItem.name == category.value) {
    categoryImportance.value = categoryItem.importance;
  }
});

onMounted(async () => {
  emit("setTitle", `New Task`);
  resizeDetailsTextarea();

  modifier.value = store.state.formData.importanceModifier || "0";

  itemType.value = store.state.formData.type;
});

const updateTimeFrame = async (newTimeFrame) => {
  store.commit("setFormDataField", {
    field: "timeFrame",
    payload: newTimeFrame,
  });
  timeFrame.value = newTimeFrame;
  setTimeFrameEditorVisibility(false);
};

const setTimeFrameEditorVisibility = (value) => {
  showTimeFrameEditor.value = value;
};

const handleSave = async () => {
  store.commit("setFormDataField", {
    field: "title",
    payload: title,
  });
  store.commit("setFormDataField", {
    field: "importanceModifier",
    payload: modifier,
  });
  store.commit("setFormDataField", {
    field: "importance",
    payload: categoryImportance.value + parseInt(modifier.value),
  });

  await dataService.createTask({
    id: createUID(),
    ...store.state.formData,
  });

  emit("submit");
};

const handleInput = (event) => {
  switch (event.key) {
    case "Enter":
      children.value.push({ title: event.target.value, id: createUID() });
      event.target.value = "";
      addingChild.value = false;
      break;

    case "Escape":
      event.target.value = "";
      addingChild.value = false;
      break;
  }
};

const addChild = () => {
  addingChild.value = true;
};

const selectCategory = (categoryData) => {
  category.value = categoryData.name;
  categoryImportance.value = categoryData.importance;
  store.commit("setFormDataField", {
    field: "category",
    payload: category.value,
  });
};
</script>

<style scoped>
.component {
  max-width: 1200px;
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: center;
}

.layout {
  max-height: 80vh;
  overflow-y: visible;
  padding: var(--size3) var(--size4);
  border: 5px solid var(--ink);
  border-radius: 6px;
  display: flex;
  gap: var(--size0);
  flex-direction: column;
}

.assistant-container {
  width: 650px;
}

.message p {
  margin: 0;
}

.column {
  display: flex;
  flex-direction: column;
  grid-gap: var(--size2);
}

.field {
  width: fit-content;
  font-size: 16px;
  font-weight: 500;
}

.duration-container {
  display: flex;
  grid-gap: 5px;
  border: 2px solid var(--ink);
  border-radius: 4px;
  border-top-left-radius: 0;
  padding: 15px 15px;
}

.children-list {
  border: 2px solid var(--ink);
  border-radius: 4px;
  border-top-left-radius: 0;
  padding: 15px 15px;
}

.importance-container {
  display: flex;
  grid-gap: 5px;
  border: 2px solid var(--ink);
  border-radius: 4px;
  border-top-left-radius: 0;
  padding: 5px 10px;
}

.value {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
}

.value .importance {
  margin: 10px;
  font-size: 48px;
  display: inline-flex;

  width: 1lh;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--ink);
  border-radius: 10px;
  font-weight: 600;
}

.math {
  font-style: italic;
}

.explanation {
  margin: 0;
  font-size: smaller;
}

.importance-container button {
  align-self: center;
}

.importance-container .slider-wrapper {
  height: 50px;
  width: 80%;
}

.field.type {
  border: 1px solid var(--ink);
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0 10px;
}

label {
  justify-self: flex-end;
}

form {
  display: flex;
  flex-direction: column;
  grid-gap: var(--size2);
}

.textarea-container {
  display: flex;
}

.timeframe-display {
  margin-bottom: 6px;
}

.timeframe-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: fit-content fit-content fit-content;
  grid-row-gap: 3px;
}

.timeframe-grid-item {
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
}

.timeframe-grid-item .container {
  width: 100%;
  padding: 2px;
}

.timeframe-grid-item.first .container {
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.timeframe-grid-item.middle .container {
  border-right: none;
  border-radius: 0;
}

.timeframe-grid-item.last .container {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.two-col {
  grid-column: span 2;
}
.time-frame-slot {
}

.schedule-type-selection,
.interval-selection {
  font-weight: 500;
  padding: 2px;
}

.buttons {
  display: flex;
  width: 100%;
}

.submit {
  margin-left: auto;
}

.help {
  margin-right: auto;
}
.skip {
  margin-right: var(--size1);
  margin-left: auto;
}

.time-frame-container {
  display: flex;
  border: 2px solid var(--ink);
  align-items: center;
  padding: 8px 16px;
  border-radius: 4px;
  border-top-left-radius: 0;
}

.time-frame-display {
  font-size: 16px;
  font-weight: 500;
}

.time-frame-container button {
  margin-left: auto;
}

.categories {
  border: 2px solid var(--ink);
  padding: 8px 16px;
  border-radius: 4px;
  border-top-left-radius: 0;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 5px;
}

.category {
  display: flex;
  grid-gap: 5px;
  text-transform: capitalize;
  font-weight: 500;
  width: fit-content;
  border: 3px solid var(--ink);
  border-radius: 3px;
  padding: 4px 6px;
}

.category.selected {
  background-color: var(--green500);
}

.category .importance {
  display: inline-flex;
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
  background-color: var(--yellow300);
  border: 1px dotted var(--ink);
  border-radius: 3px;
  font-weight: 600;
}

.category.selected .importance {
  background-color: var(--yellow500);
}

.label-group {
  display: flex;
}

.styled-input,
textarea {
  font-weight: 600;
  border-width: 2px;
  border-top-left-radius: 0;
}

textarea {
  overflow-y: hidden;
}
</style>
