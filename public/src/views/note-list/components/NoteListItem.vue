<template>
  <div
    :style="{
      '--dist': props.dist,
    }"
    class="row"
    :class="{ top: props.top, bottom: props.bottom }"
  >
    <summary
      :style="{ marginLeft: `${15 + depth * 30}px` }"
      :class="{ child: depth > 0, subsequent: index > 0 && dist == 1 }"
    >
      <div class="title-container">
        <div class="title">{{ note.title }}</div>
      </div>
    </summary>
    <div class="cell actions"></div></div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  note: Object,

  index: Number,
  top: Boolean,
  bottom: Boolean,
});


</script>

<style scoped>
.tree {
  --spacing: 1.5rem;
  --radius: 10px;
}

summary {
  display: flex;
  position: relative;
  align-items: center;
  min-height: 30px;
  padding-left: var(--size2);
}

.row {
  display: contents;
  width: 100%;
  position: relative;
  align-items: center;
  max-height: 35px;
}


.title-container {
  min-height: 30px;
  min-width: 5px;
  display: flex;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 1;
  border-bottom: 1px solid var(--ink);
}

.title {
  margin-left: 5px;
  font-weight: 600;
  font-size: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #5a6798;
  width: 90%;
}

.collapsible-icon {
  width: 20px;
  height: 20px;
  z-index: 1;
  min-width: 20px;
}
.collapsible-icon.collapsed {
  background-image: url("@/assets/images/icons/expand-icon.svg");
  background-size: 20px 20px;
}

.collapsible-icon.expanded {
  background-image: url("@/assets/images/icons/collapse-icon.svg");
  background-size: 20px 20px;
}

.collapsible-icon.childless {
  background-image: url("@/assets/images/icons/childless-icon.svg");
  background-size: 12px 12px;
  background-repeat: no-repeat;
  background-position: center;
}
summary.child::before {
  content: "";
  display: block;
  position: absolute;
  left: -22px;
  top: calc(((30px * var(--dist)) * -1) + 15px);
  width: 25px;
  height: calc((30px * var(--dist)));
  border: solid var(--ink);
  border-width: 0 0 2px 2px;
  border-bottom-left-radius: 12px;
  z-index: 0;
}
summary.child.subsequent::before {
  top: calc(((40px * var(--dist)) * -1) + 15px);
  height: calc((40px * var(--dist)));
}

input[type="checkbox"] {
  margin-left: 10px;
  margin-top: 0;
  margin-bottom: 0;
  width: 20px;
  height: 20px;
}

.cell {
  display: flex;
  align-items: center;
  min-height: 30px;
  border-bottom: 1px var(--ink) solid;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.importance .tag {
  position: relative;
  width: 16px;
  height: 16px;
  margin-left: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 13px;
}

.importance .tag::before {
  content: "";
  position: absolute;
  border: 2px solid var(--ink);
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transform: rotate(45deg);
}

.category .tag {
  border: 1px solid var(--ink);
  padding: 1px 4px;
}

</style>
