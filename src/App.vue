<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

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


    <main>
      <div class="todo-list">
        <h1>Meine To-Do-Liste</h1>
      </div>
    </main>


    <RouterView />
  </div>
</template>

<style scoped>
.todo-app {
  text-align: center;
}

.todo-list {
  margin-top: 2rem;
}

.todo-list h1 {
  font-family: 'Arial', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.todo-list ul {
  list-style: none;
  padding: 0;
}

.todo-list li {
  margin-top: 0.5rem;
  font-family: 'Times New Roman', serif;
  font-size: 1.2rem;
}
</style>