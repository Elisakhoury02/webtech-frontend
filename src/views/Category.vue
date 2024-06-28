<template>
  <div>
    <h2>To-Dos für Kategorie: {{ categoryName }}</h2>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        <input type="checkbox" v-model="task.completed" />
        {{ task.title }} - {{ task.description }} - Erledigt: {{ task.completed }} - Deadline: {{ task.deadline }}
        <button @click="deleteTask(index)">Löschen</button>
      </li>
    </ul>
    <div class="add-task">
      <input v-model="newTaskTitle" type="text" placeholder="Neue Aufgabe">
      <input v-model="newTaskDescription" type="text" placeholder="Neue Beschreibung">
      <input v-model="newTaskDeadline" type="date" placeholder="Deadline">
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
  font-family: 'Times New Roman', serif;
  font-size: 1.8rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-top: 0.5rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
}

</style>
