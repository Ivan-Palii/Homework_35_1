<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
	<div class="wrapper">
		<header class="header">
			<h1 class="header__title">Gallery</h1>
		</header>
		<main class="main">
			<RouterView /> <!-- сюда автоматично вбудовується компонент HomePage -->
		</main>
	</div>
</template>
<style scoped lang="scss">
.header {
	&__title {
		font-size: 72px;
		font-weight: 700;
		text-align: center;
		text-shadow: 4px 4px 8px rgba(3, 174, 160, 0.8);
		letter-spacing: 0.75em;
	}
}
</style>
