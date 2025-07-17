<script setup lang="ts">
import { ScrollBar } from "@ez-kits/scrollbar-vue";
import { onUnmounted, ref } from "vue";

const containerSize = ref(100);

const timer = setInterval(() => {
	containerSize.value = 300 + Math.random() * 200;
}, 1000);

onUnmounted(() => {
	clearInterval(timer);
});
</script>

<template>
	<ScrollBar
		:style="{
			height: `${containerSize}px`,
			width: `${containerSize}px`,
			overflow: 'auto',
			scrollbarWidth: 'none',
			whiteSpace: 'nowrap',
			marginLeft: '500px',
			position: 'relative',
		}"
		:scrollerProps="{
			style: {
				overflow: 'auto',
				scrollbarWidth: 'none',
				height: '100%',
				width: '100%',
			},
		}"
		:vertical="{
			trackProps: {
				class: 'w-1.5 bg-black absolute top-0 !right-0 left-auto h-full',
			},
			thumbProps: {
				class: 'bg-gray-500 absolute top-0 !right-0 left-auto w-full',
				style: {
					transform: 'translateY(var(--thumb-offset))',
					height: 'var(--thumb-size)',
				},
			},
		}"
		:horizontal="{
			trackProps: {
				class: 'bg-black absolute bottom-0 !left-0 !right-auto w-full h-2',
			},
			thumbProps: {
				class: 'bg-gray-500 absolute bottom-0 !left-0 !right-auto w-full h-2',
				style: {
					transform: 'translateX(var(--thumb-offset))',
					width: 'var(--thumb-size)',
				},
			},
		}"
	>
		<p v-for="index in 50" :key="index">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas tempore
			doloribus numquam? Maiores nostrum quisquam officia modi quis, dolore
			dignissimos provident consequatur explicabo dicta pariatur assumenda ullam
			dolor vero repudiandae!
		</p>
	</ScrollBar>
</template>
