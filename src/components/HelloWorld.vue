<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
defineProps<{
  msg: string
}>()

const ToDos = ref<any[]>([]);

axios.get("localhost:8080/ToDos")
    .then(function (response: any) {
      console.log(response);
      ToDos.value = response.data
    })
    .catch(function (error: any) {
      console.log(error);
    })
    .finally(function () {
    });

</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
