<template>
	<div class="item">
		<img
			:src="img.url"
			:alt="img.title"
			:title="img.title"
			class="item__img"
		>
		<h4 class="item__title">{{ img.title }} id:{{ img.id }}</h4>
	</div>
</template>
<script setup>
const props = defineProps({
	img: {
		type: Object,
		required: true,
	},
})
</script>
<style
	scoped
	lang="scss"
>
.item {
	flex: 0 0 25%;
	padding: 0 15px;

	// .item__img
	&__img {
		width: 100%;
	}

	// .item__title
	&__title {
		font-size: 20px;
		font-weight: 600;
		text-align: center;
	}
}
</style>