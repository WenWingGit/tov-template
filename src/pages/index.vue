<template>
	<div
		v-loading.fullscreen="is_processing"
		class="flex flex-col pt-10"
		element-loading-text="正在处理中...请不要刷新或者离开页面"
	>
		<div class="flex items-center pb-10">
			<div class="pr-5 text-center text-3xl">在线处理</div>
			<el-select v-model="selected_type" @change="handleTypeChange">
				<el-option
					v-for="item in types"
					:key="item.value"
					:label="item.name"
					:value="item.value"
				>
				</el-option>
			</el-select>
		</div>
		<div class="flex">
			<el-upload
				class="upload-demo"
				drag
				accept="image/*"
				:action="upload_api_url"
				:show-file-list="false"
				:before-upload="beforeUpload"
				@success="handleImg"
				@error="handleError"
			>
				<el-icon class="el-icon--upload"><upload-filled /></el-icon>
				<div class="el-upload__text">
					把图片拖拽到这里 或者 <em>点击上传</em> <br />仅支持 jpg/png
					文件，不超过 40MB
				</div>
			</el-upload>

			<!-- 一个装图片的容器 -->
			<div>
				<div class="composite-img-container">
					<img v-show="result_img" :src="result_img" class="composite-img" />
					<div v-show="result_img == ''" class="preview-area">预览区</div>
				</div>

				<div class="mt-5 flex items-center gap-10">
					<el-switch
						v-model="is_use_old_img_name"
						class="ml-2"
						active-text="下载时使用图片原名"
					/>
					<el-button
						type="primary"
						:disabled="result_img == ''"
						size="large"
						@click="handleDnloadImg"
						>下载</el-button
					>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const upload_api_url = ref(
	'http://8.134.96.14:3002/segment-hd-body' ||
		import.meta.env.VITE_UPLOAD_API_URL,
)

// 上传后的图片
const result_img = ref('')
// 上传后的图片的名字
const is_use_old_img_name = ref(true)
// 图片原来的名字
const old_img_name = ref('')

// 是否正在处理中
const is_processing = ref(false)

// 下载图片
const handleDnloadImg = () => {
	const x = new window.XMLHttpRequest()
	x.open('GET', result_img.value, true)
	x.responseType = 'blob'
	x.onload = () => {
		const url = window.URL.createObjectURL(x.response)
		const a = document.createElement('a')
		a.href = url
		a.download = is_use_old_img_name ? old_img_name.value : 'result'
		a.click()
	}
	x.send()
}

// 上传前校验
const beforeUpload = (file: File) => {
	is_processing.value = true
	const isJPG = file.type === 'image/jpeg'
	const isPNG = file.type === 'image/png'
	const isLt40M = file.size / 1024 / 1024 < 40
	if (!isJPG && !isPNG) {
		ElMessage.error('上传图片只能是 JPG/PNG 格式!')
	}
	if (!isLt40M) {
		ElMessage.error('上传图片大小不能超过 40MB!')
	}
	console.log(file, isJPG, isPNG, isLt40M)
	let is_ok = isJPG || (isPNG && isLt40M)
	if (is_ok) {
		old_img_name.value = file.name.split('.')[0]
	}
	return false || is_ok
}

// 请求
const handleImg = (res: any) => {
	console.log(res)
	is_processing.value = false
	if (res?.statusCode === 200) {
		if (res?.body?.data?.imageURL) {
			ElMessage.success('图片处理成功!')
			result_img.value = res.body.data.imageURL
		} else {
			ElMessage.success('处理结果没有图片')
		}
	} else {
		ElMessage.error(res?.data?.Message ?? '图片处理失败!')
	}
}

const handleError = () => {
	is_processing.value = false
	ElMessage.error('上传图片过程失败!')
}

//
const selected_type = ref('1')
const types = [
	{
		value: '1',
		name: '人像分割',
	},
]

const handleTypeChange = (val: any) => {
	console.log(val)
}
</script>
<style lang="scss" scoped>
.composite-img-container {
	margin-left: 100px;
	width: 400px;
	height: 400px;
	border: 1px solid #eee;
	box-sizing: border-box;
	img {
		width: 100%;
		height: 100%;
		object-fit: scale-down;
	}
}

.preview-area {
	width: 100%;
	height: 100%;
	background: #eee;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #888;
}
</style>
