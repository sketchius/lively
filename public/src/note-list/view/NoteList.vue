<template>
  <div class="container">
    <h1 class="display-text">|| Notes<HelpComponent :helpId="'note'" /></h1>
    <div class="rows">
      <div class="row headers display-text">
        <div class="title">Note Title</div>
        <div>Actions</div>
      </div>
      <NoteListItem
        v-for="(note, index) in notes"
        :key="note.id"
        :note="note"
        :index="index"
        :dist="0"
        :top="true"
        @set-collapsed="handleChildCollapse"
      />
      <div class="empty" v-if="notes.length == 0">No notes saved.</div>
    </div>
    
    <button class="standard" @click="handleNewItem">New Note</button>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import NoteListItem from "../components/NoteListItem.vue";

// import { useRouter } from "vue-router";
import HelpComponent from '@/components/help-component/HelpComponent.vue';

// const router = useRouter();

const store = useStore();

const notes = computed(() => store.state.notes || []);
const noteListNeedsRefresh = computed(() => store.state.noteListNeedsRefresh);


onMounted(() => {
    store.dispatch("fetchNotes");
});


const handleNewItem = () => {
  store.dispatch("createNote",{title: "Go to the grocery store"});
  // router.push({ name: `item-editor-1` });
};

watch(noteListNeedsRefresh, (newValue) => {
  if (newValue) {
    store.dispatch("fetchNotes");
  }
});


// const deleteNote = async (noteId) => {
//   await store.dispatch('deleteNote', noteId);
// };

// const editNote = (note) => {
//   store.commit('pushCommand', 'updateNote');
//   store.commit('updateEditorNote', note);
//   router.push('/note-editor');
// };

// const createNote = () => {
//   store.commit('pushCommand', 'createNote');
//   store.commit('resetEditorNote');
//   router.push('/note-editor');
// };
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  grid-gap: var(--size1);
  width: 100%;
}

.container button {
  align-self: flex-start;
}


.title {
  padding-left: var(--size2);
  width: 100%;
}

h3 {
  margin: 0;
  margin-right: auto;
}


.rows {
  display: grid;
  position: relative;  
  grid-template-columns: 1fr 1fr;
  position: relative;
  flex-direction: column;
  align-items: flex-end;
  align-content: start;
  width: 100%;
  border: 4px solid var(--ink);
  border-radius: 10px;
  padding-top: 5px;
  padding-bottom: 15px;
  min-height: 150px;

}


.row {
  width: 100%;
  display: contents;
  padding-bottom: 2px;
  font-weight: 600;
  font-size: 18px;
  color: var(--ink);
}

.empty {
  position: absolute;
  font-size: 24px;
  font-weight: 300;
  top: calc(50% + 14px);
  left: 50%;
  transform: translate(-50%, -50%);
}

.row div {
  border-bottom: 3px double var(--ink);
}



.title {
  margin-right: auto;
}
</style>
