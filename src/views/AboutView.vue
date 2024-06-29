html
<template>
  <div class="task-manager">
    <header>
      <h1>Organizer</h1>
    </header>
    <main>
      <section class="important-dates-section">
        <ImportantDates />
      </section>
      <section class="countdown-section">
        <Countdown />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import ImportantDates from '../components/Important Dates.vue';
import Countdown from '../components/Countdown.vue';
</script>

<style scoped>
.task-manager {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

header {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

.important-dates-section, .countdown-section {
  padding: 20px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}
</style>