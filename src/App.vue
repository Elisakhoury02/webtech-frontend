<template>
  <div class="todo-app">
    <!-- Header -->
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">Organizer</RouterLink>
        </nav>
      </div>
    </header>

    <!-- Logo Bereich -->
    <section class="logo-section">
      <img src="@/assets/logo.svg" alt="Logo" class="logo" />
    </section>

    <!-- Hauptinhalt -->
    <main class="content">
      <div class="todo-section">
        <RouterView />
      </div>
      <div class="notes-section">
        <h2>Notizen</h2>
        <textarea v-model="notes" placeholder="Hier ist Platz für deine Notizen ..." />
        <div class="calendar-section">
          <h3>Kalender</h3>
          <input type="date" v-model="calendarDate" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const notes = ref('');
const calendarDate = ref('');
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Times+New+Roman:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Arial:wght@400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #efddf3;
  font-family: 'Arial', sans-serif;
  color: #333;
}

header {
  width: 100%;
  background-color: #fff;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

header .wrapper {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

header nav {
  display: flex;
  gap: 3rem;
}

header a {
  text-decoration: none;
  color: #333;
  font-size: 1.2rem;
}

.logo-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25vh; /* Optional: Setzen Sie die Höhe auf 100% des Viewport, wenn Sie das Logo in der Mitte des gesamten Bildschirms zentrieren möchten */
  margin: 18px auto;
}

.logo {
  max-width: 140px;
}

.content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.todo-section {
  flex: 2;
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.notes-section {
  flex: 1;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: 1rem;
}

.notes-section h2 {
  font-family: 'Arial'  ;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.notes-section textarea {
  width: 100%;
  height: 150px;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f0f0f0;
  font-size: 1rem;
  resize: none;
}

.notes-section textarea:focus {
  outline: none;
  background-color: #e0e0e0;
}

.calendar-section {
  margin-top: 2rem;
}

.calendar-section h3 {
  font-family: 'Arial', serif;
  font-size: 1.2rem;
}

.calendar-section input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1.3rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
