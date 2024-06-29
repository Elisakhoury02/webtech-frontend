<template>
  <div>
    <h2>Willkommen auf deiner To-Do-Liste :)</h2>
    <p>Wähle eine bereits vorhandene Kategorie aus oder erstelle eine neue:</p>
    <div class="categories">
      <ul>
        <li v-for="(category, index) in categories" :key="index">
          <RouterLink :to="`/category/${category.name}`">{{ category.name }}</RouterLink>
        </li>
      </ul>
      <div class="add-category">
        <input v-model="newCategoryName" type="text" placeholder="Neue Kategorie">
        <button @click="addCategory">Hinzufügen</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const categories = ref([{ name: 'Arbeit' }, { name: 'Persönlich' }]);
const newCategoryName = ref('');

const addCategory = () => {
  if (newCategoryName.value.trim() !== '') {
    categories.value.push({ name: newCategoryName.value });
    newCategoryName.value = '';
  }
};
</script>

<style scoped>
h2 {
  font-family: 'Arial';
  font-size: 2.2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #6d1681;
}

p {
  font-family: 'Arial', sans-serif;
  text-align: center;
  font-size: 1.1rem;
}

.categories {
  margin-top: 1.8rem;
  background-color: #f9f9f9;
  padding: 1rem;
}

.categories ul {
  list-style: none;
  padding: 0;
  text-decoration: #e9c7ef;
}

.categories li {
  margin-top: 1.2rem;
  text-decoration: #e9c7ef;
  font-size: 1.1rem;
}

.categories li a {
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  background-color: #e9c7ef;
}

.add-category {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
}

.add-category input {
  margin-right: 5rem;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
}

.add-category button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #6d1681;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.add-category button:hover {
  background-color: #45a049;
}
</style>
