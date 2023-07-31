<script setup>
import ImageItem from './components/ImageItem.vue';
import {ref} from "vue";
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/'
const images = ref([])


const LIMIT = 8
const MAX_PAGE = ref(625)
let page = ref(1)
let currentLimit = ref(LIMIT)


function getImages() {
	let params = new URLSearchParams(window.location.search.substring(1))
	page.value = params.get('_page') ? params.get('_page') : 1
	currentLimit.value = params.get('_limit') ? params.get('_limit') : LIMIT
	MAX_PAGE.value = Math.ceil(5000 / currentLimit.value)

	axios.get(BASE_URL + 'photos', {
		params: {
			_page: page.value,
			_limit: currentLimit.value,
		}
	}).then(
		function (response) {
			console.log(response.data)
			images.value = []
			response.data.forEach(img => images.value.push(img))
		},
		function (error) {
			console.log(error)
		}
	)
}

function decrementPage() {
	if (page.value > 1) page.value--

	getImages()
}

function incrementPage() {
	if (page.value < MAX_PAGE.value) page.value++

	getImages()
}

function getPreviousPage() {
	if (page.value > 1)
		return page.value - 1
	return 1
}

function getNextPage() {
	if (page.value < MAX_PAGE.value)
		return +page.value + 1

	return MAX_PAGE.value
}


getImages()
</script>
<template>
	<div class="wrapper">
		<header class="header">
			<h1 class="header__title">Gallery</h1>
		</header>
		<main class="main">
			<div class="main__img-container">
				<ImageItem
					v-for="image in images"
					:img="image"
				/>
			</div>
			<div class="main__control-btns">
				<a
					:href="'photos?_page='+getPreviousPage()+'&_limit='+currentLimit"
					:page="page"
					class="btn left"
					@click="decrementPage"
				>&#x003C;
				</a>
				<a
					:href="'photos?_page='+getNextPage()+'&_limit='+currentLimit"
					class="btn right"
					@click="incrementPage"
				>&#x003E;
				</a>
			</div>
		</main>
	</div>
</template>
<style
	scoped
	lang="scss"
>
.header {
	&__title {
		font-size: 72px;
		font-weight: 700;
		text-align: center;
		text-shadow: 4px 4px 8px rgba(3, 174, 160, 0.8);
		letter-spacing: 0.75em;
	}
}

.main {
	// .main__img-container
	&__img-container {
		display: flex;
		flex-wrap: wrap;
		padding: 25px;
		margin: 25px -15px 0;
	}

	// .main__control-btns
	&__control-btns {
		display: flex;
		align-items: center;
		justify-content: center;
		column-gap: 25px;
		margin-bottom: 25px;
	}
}

.btn {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50px;
	height: 50px;
	font-size: 46px;
	background-color: rgba(3, 174, 160);
	text-align: center;
	border-radius: 50%;
}
</style>
