<template>
  <div class="todo-app">
    <!-- Header -->
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>

    <!-- Logo Bereich -->
    <section class="logo-section">
      <img src="@/assets/logo.svg" alt="Logo" class="logo" />
    </section>


    <main class="welcome">
      <h2>Willkommen auf deiner To-Do-Liste :)</h2>
      <p>Beginne damit, deine Aufgaben zu organisieren:</p>
      <ul>
        <li v-for="(task, index) in tasks" :key="index">
          {{ task.title }} - {{ task.description }} - Erledigt: {{ task.completed }}
          <button @click="deleteTask(index)">Löschen</button>
        </li>
      </ul>
      <div class="add-task">
        <input v-model="newTaskTitle" type="text" placeholder="Neue Aufgabe ">
        <input v-model="newTaskDescription" type="text" placeholder="Neue Beschreibung ">
        <button @click="addTask">Hinzufügen</button>
      </div>
    </main>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

interface Task {
  title: string;
  description: string;
  completed: boolean;
}

const tasks = ref<Task[]>([]);
const newTaskTitle = ref('');
const newTaskDescription = ref('');
const newTask = ref<Task>({ title: '', description: '', completed: false });

// Funktion zum Laden der Aufgaben vom Backend
const loadThings = async () => {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const endpoint = `${baseURL}/ToDos`;
  const requestOptions = {
    method: 'GET',
    redirect: 'follow' as RequestRedirect,
  };
  const response = await fetch(endpoint, requestOptions);
  const result = await response.json();
  tasks.value = result;
};

// Funktion zum Hinzufügen von Aufgaben
const addTask = async () => {
  const newTask: Task = {
    title: newTaskTitle.value,
    description: newTaskDescription.value,
    completed: false,
  };

  // POST-Anforderung an das Backend senden
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const endpoint = `${baseURL}/ToDos`;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTask),
  };
  const response = await fetch(endpoint, requestOptions);
  const result = await response.json();

  // Überprüfen, ob die Anforderung erfolgreich war
  if (response.ok) {
    tasks.value.push(result); // Die vom Backend zurückgegebene Aufgabe hinzufügen
    newTaskTitle.value = '';
    newTaskDescription.value = '';
  } else {
    console.error('Fehler beim Hinzufügen der Aufgabe:', result);
  }
};

const deleteTask = (taskIndex: number) => {
  tasks.value.splice(taskIndex, 1);
};

// Laden der Aufgaben beim Mounten der Komponente
onMounted(loadThings);
</script>

<style>
.todo-app {
  text-align: center;
}

body {
  background-color: #e9c7ef;
}

.header {
  margin-top: 2rem;
}

.header h1 {
  font-family: 'Arial', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.logo-section {
  margin: 20px auto;
}

.logo {
  max-width: 200px;
}

.welcome ul {
  list-style: none;
  padding: 0;
}

.welcome li {
  margin-top: 0.5rem;
  font-family: 'Times New Roman', serif;
  font-size: 1.2rem;
}

.add-task {
  margin-top: 1rem;
}

.add-task input {
  margin-right: 1rem;
}
</style>