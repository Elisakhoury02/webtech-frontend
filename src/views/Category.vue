<template>
  <div>
    <h2>To-Dos für Kategorie: {{ categoryName }}</h2>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        <h3>{{ task.title }}</h3> <!-- Text als Überschrift -->
        <input type="checkbox" v-model="task.completed" />
        {{ task.description }} - Erledigt: {{ task.completed }}
        <h3>Deadline</h3> <!-- "Deadline" als Überschrift -->
        {{ task.deadline }}
        <button @click="deleteTask(index)">Löschen</button>
      </li>
    </ul>
    <div class="add-task">
      <h3>Neue Aufgabe</h3> <!-- Überschrift für das To-Do Eingabefeld -->
      <input v-model="newTaskTitle" type="text" >
      <h3>Neue Beschreibung</h3> <!-- Überschrift für das Beschreibung Eingabefeld -->
      <input v-model="newTaskDescription" type="text" >
      <h3>Deadline</h3> <!-- Überschrift für das Datum Eingabefeld -->
      <input v-model="newTaskDeadline" type="date" >
      <button @click="addTask">Hinzufügen</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

interface Task {
  title: string;
  description: string;
  completed: boolean;
  deadline: string;
}

const route = useRoute();
const categoryName = ref(route.params.categoryName);
const tasks = ref<Task[]>([]);
const newTaskTitle = ref('');
const newTaskDescription = ref('');
const newTaskDeadline = ref('');

const loadTasks = async () => {
  // Hier könnte ein API-Call stattfinden, um die Aufgaben für die Kategorie zu laden
  tasks.value = []; // Beispiel-Daten
};

const addTask = () => {
  const newTask: Task = {
    title: newTaskTitle.value,
    description: newTaskDescription.value,
    completed: false,
    deadline: newTaskDeadline.value
  };
  tasks.value.push(newTask);
  newTaskTitle.value = '';
  newTaskDescription.value = '';
  newTaskDeadline.value = '';
};

const deleteTask = (taskIndex: number) => {
  tasks.value.splice(taskIndex, 1);
};

onMounted(loadTasks);
</script>

<style scoped>
h2 {
  font-family: 'Arial', serif;
  font-size: 2rem;
  margin-bottom: 2rem; /* Erhöht den Abstand unter der Überschrift */
  color: #6d1681;
}

ul {
  list-style: none;
  padding: 0;

}

li {
  margin-top: 0.9rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;

}

h3 {
  font-family: 'Arial', sans-serif;
  font-size: 1rem;
  margin-top: 1.2rem;
  margin-bottom: 1rem;
}

</style>
