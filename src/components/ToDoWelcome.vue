
<template>
  <main class="welcome">
    <h2>Willkommen auf deiner To-Do-Liste :) </h2>
    <p>Beginne damit, deine Aufgaben zu organisieren:</p>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        {{ task }}
        <button @click="deleteTask(index)">Löschen</button>
      </li>
    </ul>
    <input v-model="newTask" type="text" placeholder="Neue Aufgabe hinzufügen">
    <button @click="addTask(newTask)">Hinzufügen</button>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// ref, die ein Array von Aufgaben enthält
const tasks = ref([
  'Erstelle eine neue Liste',
  'Füge Elemente hinzu',
  'Lösche Elemente, die erledigt sind'
]);

// ref für die neue Aufgabe
const newTask = ref('');

// Funktion zum Hinzufügen einer neuen Aufgabe
const addTask = (newTask: string) => {
  tasks.value.push(newTask);
};

// Funktion zum Löschen einer Aufgabe
const deleteTask = (taskIndex: number) => {
  tasks.value.splice(taskIndex, 1);
};
</script>

<style scoped>
.welcome {
  text-align: center;
  margin-top: 2rem;
  padding: 2rem;
  background-color: #f3f4f6; /* Hintergrundfarbe */
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #333333; /* Schriftfarbe auf Dunkelgrau ändern */
}

.welcome h2 {
  font-size: 2.5rem; /* Größere Schriftgröße für Überschrift */
  margin-bottom: 1.5rem; /* Größerer Abstand unter der Überschrift */
}

.welcome p {
  font-size: 1.5rem; /* Größere Schriftgröße für Text */
  margin-bottom: 2rem; /* Größerer Abstand unter dem Text */
}

.welcome ul {
  list-style: none;
  padding: 0;
}

.welcome li {
  font-size: 1.25rem;
  margin-top: 1rem; /* Größerer Abstand zwischen den Aufgaben */
  background-color: #ffffff; /* Hintergrundfarbe für Aufgaben */
  padding: 0.5rem 1rem; /* Abstand um die Aufgaben */
  border-radius: 5px; /* Abgerundete Ecken für Aufgaben */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Schatten für Aufgaben */
  transition: background-color 0.3s ease; /* Flüssiger Übergangseffekt */
}

.welcome li:hover {
  background-color: #e2e8f0;
}
</style>
