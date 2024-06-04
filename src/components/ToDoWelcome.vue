<template>
  <main class="welcome">
    <h2>Willkommen auf deiner To-Do-Liste :) </h2>
    <p>Beginne damit, deine Aufgaben zu organisieren:</p>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        {{ task.title }} - {{ task.description }} - Erledigt: {{ task.completed }}
        <button @click="deleteTask(index)">Löschen</button>
      </li>
    </ul>
    <input v-model="newTaskTitle" type="text" placeholder="Neue Aufgabe hinzufügen">
    <input v-model="newTaskDescription" type="text" placeholder="Neue Beschreibung hinzufügen">
    <button @click="addTask(newTaskTitle, newTaskDescription)">Hinzufügen</button>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
interface Task {
  title: string;
  description: string;
  completed: boolean;
}

const tasks = ref<Task[]>([]);
const newTaskTitle = ref('');
const newTaskDescription = ref('');

const addTask = (title: string, description: string) => {
  const newTask: Task = {
    title: title,
    description: description,
    completed: false
  };
  tasks.value.push(newTask);
  newTaskTitle.value = '';
  newTaskDescription.value = '';
};

const deleteTask = (taskIndex: number) => {
  tasks.value.splice(taskIndex, 1);
};
</script>