<template>
  <div class="component">
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
      <div class="input">
        <label for="description">DESCRIPTION</label>

        <div class="textarea-container">
          <textarea
            v-model="description"
            :placeholder="`Describe the ${
              itemType || 'Item'
            } in 1-3 sentences.`"
            :name="'description'"
            :id="'description'"
            :rows="3"
          ></textarea>
        </div>
        <div class="error-text">{{ errorText }}</div>
      </div>
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
        <button class="skip minor" @click.prevent="handleSkip">SKIP</button>
        <button
          class="submit major"
          @click.prevent="handleSubmit"
          :disabled="submitDisabled"
        >
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
import AssistantDialogue from "@/components/AssistantDialogue.vue";
import { useStore } from "vuex";
import { defineEmits, ref, onMounted } from "vue";
import assistantService from "@/services/assistantService";

const emit = defineEmits(["setTitle","submit","back","cancel"]);
emit;

const store = useStore();

const itemType = ref(store.state.formData.type);
const description = ref(store.state.formData.description || "");

const errorText = ref("");

const submitDisabled = ref(false);

const handleSubmit = async () => {
  submitDisabled.value = true;
  if (description.value != "") {
    errorText.value = "";
    let result;
    try {
      result = await assistantService.getItemFromDescription(description.value, itemType.value);
    } catch (error) {
      errorText.value = `An error occured while processing the description. Please try again.`;
      submitDisabled.value = false;
    }
    const item = result.data;
    if (!item || !item.valid) {
      errorText.value = `A ${itemType.value} could not be determined. Please include a specific objective.`;
      submitDisabled.value = false;
    } else {
      console.log(item);
      store.commit("setFormDataField", {
        field: "description",
        payload: description,
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
      store.commit("setFormDataField", {
        field: "auto",
        payload: true,
      });
      emit("submit");
    }
  } else {
    errorText.value = "You must provide a description.";
    await sleep(750);
    submitDisabled.value = false;
  }
};

onMounted(() => {
  emit('setTitle', `Auto${itemType.value}`);
});

const handleSkip = () => {
  emit("submit");
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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

.button-text {
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

.error-text {
  min-height: 18px;
  margin-top: var(--size0);
  margin-left: var(--size2);
  color: var(--redDark);
  font-size: 14px;
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

button:disabled .icon-container .icon {
  animation: spin 1.5s ease-in-out forwards;
  animation-iteration-count: infinite;
}

@keyframes spin {
  0% {
    transform: rotate(45deg);
  }
  50% {
    transform: rotate(405deg);
  }
  100% {
    transform: rotate(405deg);
  }
}
</style>
