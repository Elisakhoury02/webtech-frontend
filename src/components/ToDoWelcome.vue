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
    <button @click="addTask">Hinzufügen</button>
  </main>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
interface Task {
  title: string;
  description: string;
  completed: boolean;
}

const tasks = ref<Task[]>([]);
const newTaskTitle = ref('');
const newTaskDescription = ref('');
const newTask = ref<Task>({ title: newTaskTitle.value, description: newTaskDescription.value, completed: false });

// Funktion zum Laden der Aufgaben vom Backend
const loadThings = async () => {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const endpoint = "http://localhost:8080/ToDos"
  const requestOptions = {
    method: 'GET',
    redirect: 'follow' as RequestRedirect
  }
  const response = await fetch(baseURL, requestOptions);
  const result = await response.json();
  result.forEach((thing: any) => {
    tasks.value.push(thing);
  });
};

// Funktionen zum Hinzufügen und Löschen von Aufgaben
const addTask = async () => {
  const newTask: Task = {
    title: newTaskTitle.value,
    description: newTaskDescription.value,
    completed: false
  };
  tasks.value.push(newTask);
  newTaskTitle.value = '';
  newTaskDescription.value = '';
};

const deleteTask = (taskIndex: number) => {
  tasks.value.splice(taskIndex, 1);
};

// Laden der Aufgaben beim Mounten der Komponente
onMounted(loadThings);


</script>