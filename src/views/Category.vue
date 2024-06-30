<template>
  <div class="todo-container">
    <h2>To-Dos für Kategorie: {{ categoryName }}</h2>
    <ul>
      <li v-for="(task, index) in tasks" :key="index" class="task-item">
        <div class="task-header">
          <h3>{{ task.title }}</h3>
          <button @click="deleteTask(index)" class="delete-button">Löschen</button>
        </div>
        <input type="checkbox" v-model="task.completed" class="task-checkbox" />
        <p>{{ task.description }} - Erledigt: {{ task.completed }}</p>
        <div class="task-deadline">
          <h4>Deadline</h4>
          <p>{{ task.deadline }}</p>
        </div>
      </li>
    </ul>
    <div class="add-task">
      <h3>Neue Aufgabe</h3>
      <input v-model="newTaskTitle" type="text" class="input-field">
      <h3>Neue Beschreibung</h3>
      <input v-model="newTaskDescription" type="text" class="input-field">
      <h3>Deadline</h3>
      <input v-model="newTaskDeadline" type="date" class="input-field">
      <button @click="addTask" class="add-button">Hinzufügen</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios, { type AxiosResponse } from 'axios'

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
  const data = await getTodos();
  data.forEach((task: Task) => {
    tasks.value.push(task);
  });
};

async function getTodos(){
  const url = 'https://webtech-backend-6ifr.onrender.com/ToDos'
  const response = await axios.get(url)
  const responseData: Task[] = response.data;
  console.log('Success:', response.data)
  return responseData;
}

const addTask = () => {
  const newTask: Task = {
    title: newTaskTitle.value,
    description: newTaskDescription.value,
    completed: false,
    deadline: newTaskDeadline.value
  };
  postTodo(newTask);
  newTaskTitle.value = '';
  newTaskDescription.value = '';
  newTaskDeadline.value = '';
};

async function postTodo(task: Task){
  const url = 'https://webtech-backend-6ifr.onrender.com/ToDos'
  const response: AxiosResponse = await axios.post(url, task)
  console.log('Success:', response.data)
  return response.data;
}

const deleteTask = (taskIndex: number) => {
  tasks.value.splice(taskIndex, 1);
};

onMounted(loadTasks);
</script>

<style scoped>
.todo-container {
  font-family: 'Arial', sans-serif;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  max-width: 800px;
  margin: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: #6d1681;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

li.task-item {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  font-size: 1.2rem;
  margin: 0;
  color: #333;
}

h4 {
  font-size: 1rem;
  margin: 1rem 0 0.5rem;
  color: #555;
}

p {
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #666;
}

.task-checkbox {
  margin-right: 0.5rem;
}

.delete-button {
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  cursor: pointer;
}

.delete-button:hover {
  background: #ff1a1a;
}

.add-task {
  margin-top: 2rem;
}

.input-field {
  width: calc(100% - 1rem);
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-button {
  background: #6d1681;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  cursor: pointer;
}

.add-button:hover {
  background: #4a0d5f;
}
</style>
