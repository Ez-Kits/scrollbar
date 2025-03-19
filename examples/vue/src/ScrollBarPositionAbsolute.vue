<script setup lang="ts">
import { ref } from "vue";
import { ScrollBar } from "@ez-kits/scrollbar-vue";

const parentRef = ref(null);
</script>

<template>
	<div class="relative inline-block">
		<ScrollBar
			:style="{
				height: '300px',
				width: '300px',
				overflow: 'auto',
				'scrollbar-width': 'none',
				'white-space': 'nowrap',
				border: '4px solid black',
			}"
			:vertical="{
				startOffset: 50,
				endOffset: 50,
				trackProps: {
					class: '!w-1.5 bg-blue-500 !absolute !top-[50px] !right-1 !left-auto',
				},
				thumbProps: {
					style: {
						backgroundColor: 'gray',
						width: '5px',
					},
				},
				withTrack: true,
			}"
			:horizontal="{
				startOffset: 50,
				endOffset: 50,
				trackProps: {
					class:
						'!h-1.5 bg-blue-500 !absolute !top-auto !bottom-1 !left-[50px]',
				},
				thumbProps: {
					style: {
						backgroundColor: 'gray',
						height: '5px',
					},
				},
				withTrack: true,
			}"
		>
			<p v-for="i in 50" :key="i">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
				tempore doloribus numquam? Maiores nostrum quisquam officia modi quis,
				dolore dignissimos provident consequatur explicabo dicta pariatur
				assumenda ullam dolor vero repudiandae!
			</p>
		</ScrollBar>
	</div>
</template>
