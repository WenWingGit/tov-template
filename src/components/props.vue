<script setup lang="ts">
type Props = {
	title?: string
	age?: number
}

// 定义props 加上默认值
const props = withDefaults(defineProps<Props>(), {
	title: '123',
	age: 1,
})
</script>

<template>
	<div>{{ props.title }}</div>
	<div>{{ props.age }}</div>
</template>

<style lang="scss" scoped></style>
