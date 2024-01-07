<script setup lang="ts">
const emit = defineEmits<{
	aa: [name: string, secondVal?: string]
}>()

const onClickBtn = () => {
	emit('aa', '新的值')
}
</script>

<template>
	<el-button @click="onClickBtn">点击触发emit</el-button>
</template>

<style lang="scss" scoped></style>
