<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from "axios";

interface Task {
  title: string;
  description: string;
  completed: boolean;
}

const tasks = ref<Task[]>([]);
const newTaskTitle = ref('');
const newTaskDescription = ref('');

// Funktion zum Laden der Aufgaben vom Backend
const loadTasks = async () => {
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
    newTaskTitle.value = '';
    newTaskDescription.value = '';
    await loadTasks(); // Aufgabenliste nach dem Hinzufügen einer neuen Aufgabe aktualisieren
  } else {
    console.error('Fehler beim Hinzufügen der Aufgabe:', result);
  }
};

const deleteTask = (taskIndex: number) => {
  deleteTodo(taskIndex)
}

async function deleteTodo(id: number) {
  const url = 'https://webtech-backend-6ifr.onrender.com/deleteTodos'
  const endpoint = url + '/' + id
  console.log('delete url', endpoint)
  const response = await axios.delete(endpoint)
  console.log('Success:', response.data)
  return response.data;
}

// Laden der Aufgaben beim Mounten der Komponente
onMounted(loadTasks);
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