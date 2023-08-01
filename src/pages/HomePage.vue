<script setup>
import axios from 'axios';
import ImageItem from '../components/ImageItem.vue';
import { computed, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';
const MAX_PAGE = 625;

const router = useRouter(); // для переходу по сторінкам (в даному випадку тільки для query)
const route = useRoute(); // для витягування інформації про сторінку

const images = ref([]);

const isQueryValid = computed(() => { // валідація query-параметрів, почитай про computed
	return (
		route.query?._page > 0 &&
		route.query?._page <= MAX_PAGE &&
		route.query?._limit <= 20 &&
		route.query?._limit > 0
	);
});

const params = reactive({ // reactive - аналог реф, але тільки для об'єктів, почитай про це
	page: isQueryValid.value ? route.query?._page : 1,
	limit: isQueryValid.value ? route.query?._limit : 8
});

if (!isQueryValid.value) goTo(); // якщо query не валідні - перенаправляємо на дефолтну сторінку

watch( // для слідкування за змінами params, почитай про це
	params,
	async () => {
		
		goTo();
		await getImages();
	},
	{ immediate: true } // для запуску watch під час рендеру сторінки
);

const goTo = () =>
	router.push({ query: { _page: params.page, _limit: params.limit } });

async function getImages() {
	try {
		const response = await axios.get(BASE_URL + 'photos', {
			params: {
				_page: params.page,
				_limit: params.limit
			}
		});
		images.value = response.data;
	} catch (error) {
		console.error(error);
	}
}
</script>

<template>
	<div class="container">
		<ImageItem v-for="image in images" :img="image" />
	</div>
	<div class="control-btns">
		<button :disabled="params.page <= 1" @click="params.page--" class="btn">
			PREV
		</button>
		<button
			:disabled="params.page >= MAX_PAGE"
			@click="params.page++"
			class="btn"
		>
			NEXT
		</button>
	</div>
</template>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-wrap: wrap;
	padding: 25px;
	margin: 25px -15px 0;
}
.control-btns {
	display: flex;
	align-items: center;
	justify-content: center;
	column-gap: 25px;
	margin-bottom: 25px;
}
.btn {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 25px;
	font-weight: bold;
	padding: 5px 10px;
	background-color: rgba(3, 174, 160);
	text-align: center;
	cursor: pointer;
}
</style>
