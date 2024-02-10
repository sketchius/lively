<template>
  <div class="component">
    <StepHeader :header="'Item Type'" @back="handleBack" />
    <div class="assistant">
      <AssistantDialogue
        :message="`Great! Now let's decide on a timeframe for completing this ${
          itemType || 'task'
        }.`"
      />
    </div>
    <form>
      <div class="form-layout">
        <div class="form-options">
          <div class="form-option-row">
            <div class="type-options">
              <FormOption
                :title="'On'"
                :set="'dayType'"
                :data="'on'"
                :fullWidth="true"
                :disabled="selectedUnitOption != 'day'"
                :padding="'10px 16px'"
                @click-event="handleClickEvent"
                :selected="selectedDayTypeOption == 'on'"
              />
              <FormOption
                :title="'By'"
                :set="'dayType'"
                :data="'by'"
                :fullWidth="true"
                :disabled="selectedUnitOption != 'day'"
                :padding="'10px 16px'"
                @click-event="handleClickEvent"
                :selected="selectedDayTypeOption == 'by'"
              />
            </div>
            <div class="unit-option">
              <FormOption
                :title="'Day'"
                :set="'unit'"
                :data="'day'"
                :fullWidth="true"
                :padding="'10px 16px'"
                @click-event="handleClickEvent"
                :selected="selectedUnitOption == 'day'"
              />
            </div>
          </div>
          <div class="form-option-row">
            <div class="type-options">
              <FormOption
                :title="'By the start of'"
                :set="'otherType'"
                :data="'start'"
                :fullWidth="true"
                :disabled="selectedUnitOption != 'week'"
                :padding="'10px 16px'"
                @click-event="handleClickEvent"
                :selected="selectedOtherTypeOption == 'start'"
              />
              <FormOption
                :title="'By the end of'"
                :set="'otherType'"
                :data="'end'"
                :fullWidth="true"
                :disabled="selectedUnitOption != 'week'"
                :padding="'10px 16px'"
                @click-event="handleClickEvent"
                :selected="selectedOtherTypeOption == 'end'"
              />
            </div>
            <div class="unit-option">
              <FormOption
                :title="'Week'"
                :set="'unit'"
                :data="'week'"
                :fullWidth="true"
                :padding="'10px 16px'"
                @click-event="handleClickEvent"
                :selected="selectedUnitOption == 'week'"
              />
            </div>
          </div>
          <div class="form-option-row">
            <div class="type-options">
              <FormOption
                :title="'By the start of'"
                :set="'otherType'"
                :data="'start'"
                :fullWidth="true"
                :disabled="selectedUnitOption != 'month'"
                :padding="'10px 16px'"
                @click-event="handleClickEvent"
                :selected="selectedOtherTypeOption == 'start'"
              />
              <FormOption
                :title="'By the end of'"
                :set="'otherType'"
                :data="'end'"
                :fullWidth="true"
                :disabled="selectedUnitOption != 'month'"
                :padding="'10px 16px'"
                @click-event="handleClickEvent"
                :selected="selectedOtherTypeOption == 'end'"
              />
            </div>
            <div class="unit-option">
              <FormOption
                :title="'Month'"
                :set="'unit'"
                :data="'month'"
                :fullWidth="true"
                :padding="'10px 16px'"
                @click-event="handleClickEvent"
                :selected="selectedUnitOption == 'month'"
              />
            </div>
          </div>
          <div class="form-option-row">
            <div class="type-options">
              <FormOption
                :title="'By the start of'"
                :set="'otherType'"
                :data="'start'"
                :fullWidth="true"
                :disabled="selectedUnitOption != 'year'"
                :padding="'10px 16px'"
                @click-event="handleClickEvent"
                :selected="selectedOtherTypeOption == 'start'"
              />
              <FormOption
                :title="'By the end of'"
                :set="'otherType'"
                :data="'end'"
                :fullWidth="true"
                :disabled="selectedUnitOption != 'year'"
                :padding="'10px 16px'"
                @click-event="handleClickEvent"
                :selected="selectedOtherTypeOption == 'end'"
              />
            </div>
            <div class="unit-option">
              <FormOption
                :title="'Year'"
                :set="'unit'"
                :data="'year'"
                :fullWidth="true"
                :padding="'10px 16px'"
                @click-event="handleClickEvent"
                :selected="selectedUnitOption == 'year'"
              />
            </div>
          </div>
        </div>
        <div class="date-picker"></div>
      </div>
      <button class="major" @click.prevent="handleNext">NEXT</button>
    </form>
  </div>
</template>

<script setup>
import StepHeader from "../components/StepHeader.vue";
import AssistantDialogue from "@/components/AssistantDialogue.vue";
import FormOption from "@/components/FormOption.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
import { defineEmits } from "vue";


const emit = defineEmits(["submit"]);

const store = useStore();
const router = useRouter();

const selectedDayTypeOption = ref("on");
const selectedOtherTypeOption = ref("start");
const selectedUnitOption = ref("day");

const existingData = store.state.formData.timeframe;

const handleClickEvent = (data) => {
  switch (data.set) {
    case "dayType":
      if (selectedDayTypeOption.value != data.selection) {
        selectedDayTypeOption.value = data.selection;
      }
      break;
    case "otherType":
      if (selectedOtherTypeOption.value != data.selection) {
        selectedOtherTypeOption.value = data.selection;
      }
      break;

    case "unit":
      if (selectedUnitOption.value != data.selection) {
        selectedUnitOption.value = data.selection;
      }
      break;
  }
};

const handleNext = () => {
  store.commit("setFormDataField", {
    field: "timeframe",
    payload: "set",
  });
  emit("submit");
};

const handleBack = () => {
  if (!existingData) {
    store.commit("setFormDataField", {
      field: "timeframe",
      payload: "set",
    });
  }
  router.push({ name: `item-editor-4` });
};
</script>

<style scoped>
.component {
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  grid-gap: var(--size2);
}

.form-layout {
  display: flex;
  width: fit-content;
  grid-gap: var(--size3);
}

.type-options {
  display: flex;
  flex-direction: column;
  grid-gap: var(--size1);
}

.form-options {
  display: flex;
  flex-direction: column;
  width: fit-content;
  grid-gap: var(--size2);
}

.form-option-row {
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: var(--size1);
}

.date-picker {
  width: 600px;
  border: 1px solid var(--ink);
}

.unit-option .container {
  height: 100%;
}

.assistant {
  width: 450px;
}

textarea {
  width: 60ch;
  border: 2px solid var(--ink);
  border-radius: 3px;
}

form button {
  align-self: flex-end;
}
</style>
