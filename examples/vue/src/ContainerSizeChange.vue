<script setup lang="ts">
import { ScrollBar } from "@ez-kits/scrollbar-vue";
import { ref, onUnmounted } from "vue";

const containerSize = ref(100);

const timer = setInterval(() => {
	containerSize.value = 300 + Math.random() * 200;
}, 1000);

onUnmounted(() => {
	clearInterval(timer);
});
</script>

<template>
	<div class="relative inline-block">
		<ScrollBar
			:style="{
				height: containerSize,
				width: containerSize,
				overflow: 'auto',
				scrollbarWidth: 'none',
				whiteSpace: 'nowrap',
				marginLeft: 500,
				border: '4px solid black',
			}"
			:vertical="{
				startOffset: 50,
				endOffset: 50,
				trackProps: {
					class: '!w-1.5 bg-blue-500 !absolute !top-[50px] !right-0 !left-auto',
				},
				thumbProps: {
					style: {
						backgroundColor: 'gray',
						width: 5,
					},
				},
				withTrack: true,
			}"
			:horizontal="{
				startOffset: 50,
				endOffset: 50,
				trackProps: {
					style: {
						height: 5,
					},
				},
				thumbProps: {
					style: {
						backgroundColor: 'gray',
						height: 5,
					},
				},
				withTrack: true,
			}"
		>
			<p v-for="item in 50" :key="item">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
				tempore doloribus numquam? Maiores nostrum quisquam officia modi quis,
				dolore dignissimos provident consequatur explicabo dicta pariatur
				assumenda ullam dolor vero repudiandae!
			</p>
		</ScrollBar>
	</div>
</template>
