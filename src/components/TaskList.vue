html
<template>
  <div class="task-list">
    <h2>To-Do Liste</h2>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        <input type="checkbox" v-model="task.done"/>
        <span :class="{ done: task.done }">{{ task.text }}</span>
        <button @click="removeTask(index)">Löschen</button>
      </li>
    </ul>
    <input v-model="newTask" placeholder="Neue Aufgabe"/>
    <button @click="addTask">Hinzufügen</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tasks = ref<{ text: string, done: boolean }[]>([]);
const newTask = ref('');

const addTask = () => {
  if (newTask.value.trim() !== '') {
    tasks.value.push({ text: newTask.value, done: false });
    newTask.value = '';
  }
};

const removeTask = (index: number) => {
  tasks.value.splice(index, 1);
};
</script>

<style scoped>
.task-list {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-list h2 {
  margin-bottom: 20px;
}

.task-list ul {
  list-style: none;
  padding: 0;
}

.task-list li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.task-list input[type="checkbox"] {
  margin-right: 10px;
}

.task-list span.done {
  text-decoration: line-through;
}

.task-list button {
  margin-left: 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 10px;
}

.task-list button:hover {
  background-color: #ff1a1a;
}
</style>