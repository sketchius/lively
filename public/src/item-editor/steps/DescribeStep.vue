<template>
  <div class="component">
    <StepHeader :header="`Auto${itemType || 'Fill'}`" @back="handleBack" />
    <div class="assistant">
      <AssistantDialogue
        :subtext="`You can skip this step.`"
        :button="`Help me write`"
      >
        <template #message
          ><div class="message">
            <p>
              Please tell me about the
              {{ itemType || "Item" }}
              in your own words.
            </p>
            <p>
              AutoGoal converts your written description into a Goal item by
              automatically filling in the form!
            </p>
          </div></template
        >
      </AssistantDialogue>
    </div>

    <form>
      <TextArea
        :label="'DESCRIPTION'"
        v-model="description"
        :requirement="'optional'"
        :placeholder="`Enter a ${itemType || 'Item'} description.`"
        :rows="3"
      />
      <div class="helper-text">
        <h2>For best results, include:</h2>
        <ul>
          <li>
            <div class="row">
              <div class="item">What the main objective is</div>
              <div class="help-icon">?</div>
            </div>
          </li>
          <li>
            <div class="row">
              <div class="item">
                The timeframe in which you'd like to complete the Goal
              </div>
              <div class="help-icon">?</div>
            </div>
          </li>
          <li>
            <div class="row">
              <div class="item">Any challenges or obstacles you anticipate</div>
              <div class="help-icon">?</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="buttons">
        <button class="skip minor" @click.prevent="handleNext">SKIP</button>
        <button class="submit major" @click.prevent="handleNext">
          <div class="icon-container" @click="startAnimation">
            <div class="icon">
              <div class="gradient" :class="{ 'animate-once': animate }"></div>
            </div>
          </div>
          <span class="button-text">CONVERT</span>
        </button>
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
import TextArea from "@/components/TextArea.vue";
import assistantService from "@/services/assistantService";

const emit = defineEmits(["submit"]);
emit;

const store = useStore();
const router = useRouter();

const itemType = ref(store.state.formData.type);
const description = ref(store.state.formData.description || "");

const existingData = store.state.formData.description;

const handleNext = async () => {
  const result = await assistantService.getItemFromDescription(
    description.value
  );

  const item = result.data;
  console.log(item);
  if (!item || !item.valid) {
    // TODO Add error text.
    console.log("ERROR!");
  } else {
    console.log(item);
    store.commit("setFormDataField", {
      field: "description",
      payload: "set",
    });
    store.commit("setFormDataField", {
      field: "title",
      payload: item.title,
    });
    store.commit("setFormDataField", {
      field: "timeframe",
      payload: item.timeframe,
    });
    store.commit("setFormDataField", {
      field: "category",
      payload: item.category,
    });
    store.commit("setFormDataField", {
      field: "duration",
      payload: item.duration,
    });
    emit("submit");
  }
};

const handleBack = () => {
  if (!existingData) {
    store.commit("setFormDataField", {
      field: "description",
      payload: description.value,
    });
  }
  router.push({ name: `item-editor-1` });
};
</script>

<style scoped>
.component {
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: center;
}

.assistant {
  width: 600px;
}

.message {
  display: flex;
  flex-direction: column;
  grid-gap: 7px;
}

.message p {
  margin: 0;
}

.step {
  padding: 2px;
  margin-right: 4px;
  padding-right: 4px;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 600;
  text-decoration: underline;
}

.helper-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 12px;
}

.helper-text h2 {
  margin: 0;
  margin-left: var(--size2);
  font-size: 18px;
}

button {
  display: flex;
  align-items: center;
  grid-gap: 10px;
}


button .icon-container {
  margin: 0;
  padding: 0;
  border: none;
  align-self: center;
}

button .icon-container .icon {
  width: 12px;
  height: 12px;
  margin: 0;
  transform: rotate(45deg);
  border: 3px solid var(--ink);
}

.gradient {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    var(--red) 15%,
    var(--yellow) 30%,
    var(--green) 70%,
    var(--blue) 85%
  );
}

.button-text{
  display: grid;
  align-items: center;
  height: 20px;
}

.helper-text ul {
  margin: 0;
}

.helper-text .row {
  display: flex;
  grid-gap: 5px;
}

.help-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  font-size: 14px;
  font-weight: 900;
  border: solid 2px var(--ink);
  border-radius: 100px;
}

form {
  width: 500px;
  display: flex;
  flex-direction: column;
  grid-gap: var(--size2);
}

.textarea-container {
  display: flex;
}

.textarea-container {
  width: 600px;
}

.buttons {
  display: flex;
  width: 100%;
}

.help {
  margin-right: auto;
}
.skip {
  margin-right: var(--size1);
  margin-left: auto;
}
</style>
