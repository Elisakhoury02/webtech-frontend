<template>
  <div class="countdown">
    <h2>Countdowns</h2>
    <ul>
      <li v-for="(cd, index) in countdowns" :key="index">
        {{ cd.event }} -
        <span v-if="cd.time">{{ formatCountdown(cd.time) }}</span>
        <span v-else>Abgelaufen</span>
        <button @click="removeCountdown(index)">Löschen</button>
      </li>
    </ul>
    <input v-model="newCountdownEvent" placeholder="Name des Ereignisses" />
    <input type="datetime-local" v-model="newCountdownTime" />
    <button @click="addCountdown">Hinzufügen</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { intervalToDuration, formatDuration } from 'date-fns';

const countdowns = ref<{ event: string, time: Date | null }[]>([]);
const newCountdownEvent = ref('');
const newCountdownTime = ref<Date | null>(null);
let timer: ReturnType<typeof setInterval> | null = null; // Typ hinzugefügt

const addCountdown = () => {
  if (newCountdownEvent.value.trim() !== '' && newCountdownTime.value) {
    countdowns.value.push({ event: newCountdownEvent.value, time: new Date(newCountdownTime.value) });
    newCountdownEvent.value = '';
    newCountdownTime.value = null;
  }
};

const removeCountdown = (index: number) => {
  countdowns.value.splice(index, 1);
};

const formatCountdown = (targetDate: Date) => {
  const now = new Date();
  const duration = intervalToDuration({ start: now, end: targetDate });
  return formatDuration(duration);
};

onMounted(() => {
  timer = setInterval(() => {
    countdowns.value = countdowns.value.map(cd => ({
      ...cd,
      time: cd.time && new Date(cd.time) > new Date() ? cd.time : null
    }));
  }, 1000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped>
.countdown {
  padding: 20px;
}

.countdown h2 {
  margin-bottom: 20px;
}

.countdown ul {
  list-style: none;
  padding: 0;
}

.countdown li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.countdown input {
  margin-right: 10px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: calc(100% - 120px);
}

.countdown button {
  margin-left: 10px;
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.countdown button:hover {
  background-color: #45a049;
}
</style>