<template>
  <div class="component">
    <div class="assistant">
      <AssistantDialogue>
        <template #message
          ><div>
            Please <b>choose a type</b> for the new item. Your choice will
            determine how we organize and complete the item.
          </div></template
        >
        <template #button
          ><button class="minor">HELP ME DECIDE</button></template
        >
      </AssistantDialogue>
    </div>
    <form>
      <div class="options">
        <FormOption
          :data="'Goal'"
          :text="'A singular action that you need to complete.'"
          @click-event="handleClickEvent"
          :selected="selectedOption == 'Goal'"
          ><template #content
            ><article>
              <div class="icon"></div>
              <h2>Goal</h2>
              <p class="option-description">
                Something that you would like to achieve.
              </p>
              <section>
                <h3>Key Characteristics</h3>
                <ul class="key-point-list">
                  <li>Expressed as an objective</li>
                  <li>Requires concerted effort</li>
                  <li>Can be made up of multiple steps</li>
                </ul>
              </section>
              <section class="examples-container">
                <h3>Examples</h3>
                <ul class="examples-list">
                  <li>"Purchase a new car"</li>
                  <li>"Lose 20 pounds"</li>
                  <li>"Set up a home office space"</li>
                </ul>
              </section>
            </article></template
          >
        </FormOption>
        <FormOption
          :data="'Task'"
          :text="'Something you want to accomplish that requires a series of steps.'"
          @click-event="handleClickEvent"
          :selected="selectedOption == 'Task'"
          ><template #content
            ><article>
              <div class="icon"></div>
              <h2>Task</h2>
              <p class="option-description">Something that you need to do.</p>
              <section>
                <h3>Key Characteristics</h3>
                <ul class="key-point-list">
                  <li>Expressed as an action</li>
                  <li>Achievable in one sitting</li>
                  <li>Has an estimated duration</li>
                </ul>
              </section>
              <section class="examples-container">
                <h3>Examples</h3>
                <ul class="examples-list">
                  <li>"Make a shopping list"</li>
                  <li>"Visit the dentist"</li>
                  <li>"Clean the kitchen"</li>
                </ul>
              </section>
            </article></template
          >
        </FormOption>
      </div>
      <button class="major" @click.prevent="handleNext">NEXT</button>
    </form>
  </div>
</template>

<script setup>
import AssistantDialogue from "@/components/AssistantDialogue.vue";
import FormOption from "@/components/FormOption.vue";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { defineEmits } from "vue";

const emit = defineEmits(["setTitle", "submit"]);

const store = useStore();

const selectedOption = ref("Goal");

const handleClickEvent = (data) => {
  selectedOption.value = data.selection;
};

onMounted(() => {
  emit("setTitle", "Item Type");
});

const handleNext = () => {
  store.commit("setFormDataField", {
    field: "type",
    payload: selectedOption.value,
  });
  emit("submit", "type");
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

.assistant {
  width: 450px;
}

.icon {
  width: 40px;
  height: 40px;
  background-color: rgba(107, 107, 107, 0.3);
  border-radius: 100px;
  align-self: center;
  justify-self: center;
}

p.option-description {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.key-point-list,
.examples-list {
  margin: 0;
  margin-top: 10px;
}

.examples-container {
  padding: 16px 20px;
  border: 1px solid var(--ink);
}

.examples-list {
  padding: 0;
  display: flex;
  flex-direction: column;
  grid-gap: 3px;
}

.examples-list li {
  list-style-type: none;
  padding: 0;
  color: var(--blue700);
  font-style: italic;
  font-weight: 400;
  font-size: 18px;
}

article {
  width: 28ch;
  padding: 35px;
  padding-bottom: 45px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px 50px 3lh 6.5lh 1fr;
  justify-content: flex-start;
}

article section {
  display: flex;
  flex-direction: column;
}

h2 {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  padding: 0px 10px;
  display: inline-block;
  width: fit-content;
  align-self: center;
  justify-self: center;
  background-color: var(--blue300);
  border-bottom: 1px dashed var(--ink);
}

.selected h2 {
  background-color: var(--green300);
}

h3 {
  font-size: 18px;
  font-weight: 600;
}

.option-name {
  align-self: center;
  font-size: 20px;
  font-weight: 600;
}

.text {
  font-size: 16px;
  font-weight: 500;
}

.options {
  width: 100%;
  display: flex;
  grid-gap: var(--size4);
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
