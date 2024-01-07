<script setup lang="ts">
import { THEMEKEY } from '~/symbolKey'

const theme = inject(THEMEKEY)

type Props = {
	title?: string
	age?: number
}
const props = withDefaults(defineProps<Props>(), {
	title: '默认标题',
	age: 18,
})
</script>

<template>
	<h4>{{ props.title }}</h4>
	<h4>{{ props.age }}</h4>
	<div :class="['theme', theme]">{{ theme }}</div>
</template>

<style lang="scss" scoped>
.theme {
	width: 100px;
	height: 100px;
	&.light {
		color: #000;
		background-color: #fff;
	}
	&.dark {
		color: #fff;
		background-color: #000;
	}
}
</style>
