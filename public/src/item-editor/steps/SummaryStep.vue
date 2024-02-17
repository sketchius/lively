<template>
  <div class="component">
    <StepHeader :header="`${itemType || 'Item'} Details`" @back="handleBack" />
    <div class="assistant-container">
      <AssistantDialogue
        :subtext="`These details are used to help you track, organize, and prioritize your agenda.`"
      >
        <template #message
          ><div class="message">
            <p>
              The {{ `${itemType || "Item"}` }} fields have been filled in based
              on your description. Feel free to edit them to meet your needs and
              click the <span class="button-ref">SAVE</span> button when you are
              finished.
            </p>
          </div></template
        >
      </AssistantDialogue>
    </div>

    <form @submit.prevent="handleSave">
      <div class="layout">
        <div class="column">
          <section>
            <label for="title">TITLE</label>
            <input type="text" name="title" id="title" v-model="title" />
          </section>
          <section>
            <label for="category">CATEGORY</label>
            <div class="categories"><div class="category" v-bind:key="categoryData" :class="{'selected': category==categoryData.name}" v-for="categoryData of categories"><span>{{ categoryData.name }}</span><span class="importance">{{ categoryData.importance }}</span></div></div>
          </section>
          
          <section v-if="itemType == 'Goal'">
            <label for="title">GOAL STEPS</label>
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
                    {{ index + 1 + ") " + element.title }}
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
          <section v-if="itemType == 'Task'">
            <label for="duration">TASK DURATION</label>
            <div>{{ duration }} minutes</div>
          </section>
          <TextArea
            :label="'NOTES'"
            v-model="notes"
            :requirement="'optional'"
            :rows="3"
          />
        </div>
        <div class="column">
          <section>
            <label for="title">IMPORTANCE</label>
            <div class="importance-container">
              <div class="value">
                <div class="importance">{{ categoryImportance }}</div>
                <div class="math">(6+1)</div>
              </div>
              <div class="flex-column">
                <div class="explanation">
                  <p>Importance inherited from Category.</p>
                  <p>
                    Adjust the slider to fine-tune the importance for this item.
                  </p>
                </div>
                <button class="minor">Edit Modifer</button>
              </div>
            </div>
          </section>
          <section>
            <label for="title">TIMEFRAME</label>
            <div class="timeframe-display">Within {{ timeframe }} days</div>
            <div class="timeframe-grid">
              <div class="timeframe-grid-item two-col first">
                <FormOption
                  :data="'optionA'"
                  :color="'yellow'"
                  :selected="datePickerScheduleType == 'optionA'"
                  @click-event="handleDatePickerScheduleClick"
                  ><template #content>{{
                    datePickerInterval == "day" ? `By` : `By the Start of`
                  }}</template></FormOption
                >
              </div>
              <div class="timeframe-grid-item two-col last">
                <FormOption
                  :data="'optionB'"
                  :color="'yellow'"
                  :selected="datePickerScheduleType == 'optionB'"
                  @click-event="handleDatePickerScheduleClick"
                  ><template #content>{{
                    datePickerInterval == "day" ? `On` : `By the End of`
                  }}</template></FormOption
                >
              </div>
              <div class="timeframe-grid-item first">
                <FormOption
                  :data="'day'"
                  :selected="datePickerInterval == 'day'"
                  @click-event="handleDateIntervalClick"
                  ><template #content>Day</template></FormOption
                >
              </div>
              <div class="timeframe-grid-item middle">
                <FormOption
                  :data="'week'"
                  :selected="datePickerInterval == 'week'"
                  @click-event="handleDateIntervalClick"
                  ><template #content>Week</template></FormOption
                >
              </div>
              <div class="timeframe-grid-item middle">
                <FormOption
                  :data="'month'"
                  :selected="datePickerInterval == 'month'"
                  @click-event="handleDateIntervalClick"
                  ><template #content>Month</template></FormOption
                >
              </div>
              <div class="timeframe-grid-item last">
                <FormOption
                  :data="'year'"
                  :selected="datePickerInterval == 'year'"
                  @click-event="handleDateIntervalClick"
                  ><template #content>Year</template></FormOption
                >
              </div>
              <div class="picker"></div>
            </div>
          </section>
        </div>
      </div>

      <div class="buttons">
        <button class="submit major" @click.prevent="handleSave">SAVE</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import StepHeader from "../components/StepHeader.vue";
import AssistantDialogue from "@/components/AssistantDialogue.vue";
import { useStore } from "vuex";
import { defineEmits, ref } from "vue";
import { useRouter } from "vue-router";
import dataService from "@/services/dataService.js";
import { createUID } from "@/util/uuid";
import TextArea from "@/components/TextArea.vue";
import FormOption from "@/components/FormOption.vue";
import draggable from "vuedraggable";

const emit = defineEmits(["submit"]);

const store = useStore();
const router = useRouter();


const drag = ref("false");
const addingChild = ref(false);
const children = ref(store.state.formData.children || []);

const itemType = ref(store.state.formData.type);

// const type = ref(store.state.formData.type || "");
const title = ref(store.state.formData.title || "");
// const details = ref(store.state.formData.details || "");
// const priority = ref(store.state.formData.priority || "");
const duration = ref(store.state.formData.duration || "");
const timeframe = ref(store.state.formData.timeframe || "");
const category = ref(store.state.formData.category || "work");
const categories = [{name:"work",importance:8},{name:"household",importance:6},{name:"errand",importance:6},{name:"life management",importance:7},{name:"fun",importance:3},];

const categoryImportance = ref("");

categories.forEach( categoryItem => {
  if (categoryItem.name == category.value) {
    categoryImportance.value = categoryItem.importance;
  }
})

const datePickerScheduleType = ref("optionA");
const datePickerInterval = ref("day");

const handleSave = async () => {
  console.log("handleSave");
  await dataService.createGoal({ id: createUID(), ...store.state.formData });
  if (store.state.formData.type == "task") {
    router.push({ name: `Goals` });
    store.commit("resetFormData");
  } else {
    if (store.state.formData.type == "goal") {
      store.commit("setFormDataField", {
        field: "done",
        payload: true,
      });
    }
  }

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

// const save = async () => {
//     if (editing) {
//       await dataService.updateGoal(goal.value.id, goal.value);
//     } else {
//       await dataService.createGoal(goal.value);
//     }
//     router.back();
//   };

const handleDatePickerScheduleClick = (data) => {
  datePickerScheduleType.value = data.selection;
};

const handleDateIntervalClick = (data) => {
  datePickerInterval.value = data.selection;
};

const handleBack = () => {
  router.push({ name: `item-editor-5` });
};
</script>

<style scoped>
.component {
  max-width: 800px;
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: center;
}

.layout {
  padding: 20px;
  border: 5px solid var(--ink);
  border-radius: 6px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--size3);
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

.importance-container {
  display: flex;
  border: 1px solid var(--ink);
  padding: 5px;
}

.value {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 24px;
}

.value .importance {
  font-size: 48px;
  display: inline-flex;
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--ink);
  border-radius: 60px;
  font-weight: 600;
}

textarea {
  width: 20px !important;
}

.math {
  font-style: italic;
}

.explanation {
  font-size: smaller;
}

.importance-container button {
  align-self: center;
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
.picker {
  grid-column: span 4;
  border: 1px solid var(--ink);
  height: 250px;
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

.categories {
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
  background-color: var(--green);
}

.category .importance {
  display: inline-flex;
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--ink);
  border-radius: 10px;
  font-weight: 600;
}
</style>
