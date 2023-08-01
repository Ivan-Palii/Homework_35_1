import { createRouter, createWebHistory } from 'vue-router';

const HomePage = () => import('../pages/HomePage.vue');

const router = createRouter({ // налаштування роутера
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'HomePage',
			component: HomePage
		}
	]
});

export default router;
