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
    <input v-model="newTaskTitle" type="text" placeholder="Neuer Titel hinzufügen">
    <input v-model="newTaskDescription" type="text" placeholder="Neue Beschreibung hinzufügen">
    <button @click="addTask">Hinzufügen</button>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

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
  const endpoint = "http://localhost:8080/ToDos"
  const requestOptions = {
    method: 'GET',
    redirect: 'follow' as RequestRedirect
  }
  const response = await fetch(endpoint, requestOptions);
  const result = await response.json();
  result.forEach((thing: any) => {
    tasks.value.push(thing);
  });
}

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

// Funktion zum Löschen einer Aufgabe
const deleteTask = (taskIndex: number) => {
  tasks.value.splice(taskIndex, 1);
};

// Laden der Aufgaben beim Mounten der Komponente
onMounted(loadThings);
</script>


<style scoped>
.welcome {
  text-align: center;
  margin-top: 2rem;
  padding: 2rem;
  background-color: #f3f4f6;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #333333;
}

.welcome h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.welcome p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.welcome ul {
  list-style: none;
  padding: 0;
}

.welcome li {
  font-size: 1.25rem;
  margin-top: 1rem;
  background-color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.welcome li:hover {
  background-color: #e2e8f0;
}
</style>
