import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import About from '@/views/AboutView.vue';
import Category from '@/views/Category.vue';
import TaskManager from '@/views/AboutView.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/category/:categoryName', component: Category },
  { path: '/tasks', component: TaskManager },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;