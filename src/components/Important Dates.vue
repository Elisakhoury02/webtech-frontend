html
<template>
  <div class="important-dates">
    <h2>Wichtige Termine</h2>
    <ul>
      <li v-for="(date, index) in dates" :key="index">
        {{ date.event }} - {{ date.date }}
        <button @click="removeDate(index)">Löschen</button>
      </li>
    </ul>
    <input v-model="newEvent" placeholder="Name des Ereignisses" />
    <input type="date" v-model="newDate" />
    <button @click="addDate">Hinzufügen</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dates = ref<{ event: string, date: string }[]>([]);
const newEvent = ref('');
const newDate = ref('');

const addDate = () => {
  if (newEvent.value.trim() !== '' && newDate.value) {
    dates.value.push({ event: newEvent.value, date: newDate.value });
    newEvent.value = '';
    newDate.value = '';
  }
};

const removeDate = (index: number) => {
  dates.value.splice(index, 1);
};
</script>

<style scoped>
.important-dates {
  padding: 20px;
}

.important-dates h2 {
  margin-bottom: 20px;
}

.important-dates ul {
  list-style: none;
  padding: 0;
}

.important-dates li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.important-dates input {
  margin-right: 10px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: calc(100% - 120px);
}

.important-dates button {
  margin-left: 10px;
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.important-dates button:hover {
  background-color: #45a049;
}
</style>