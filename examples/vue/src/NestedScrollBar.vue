<script setup lang="ts">
import { ScrollBar } from "@ez-kits/scrollbar-vue";
</script>

<template>
	<ScrollBar
		:style="{
			height: '600px',
			width: '600px',
			overflowY: 'auto',
			position: 'relative',
			scrollbarWidth: 'none',
			whiteSpace: 'nowrap',
		}"
		:vertical="{
			style: {
				backgroundColor: 'black',
				width: '5px',
			},
			startOffset: 50,
			endOffset: 50,
		}"
		:horizontal="{
			style: {
				backgroundColor: 'black',
				height: '5px',
			},
			startOffset: 50,
			endOffset: 50,
		}"
	>
		<p
			:style="{
				position: 'sticky',
				top: 0,
				left: 0,
				background: 'gray',
				height: '50px',
				margin: 0,
				overflow: 'hidden',
				maxWidth: '100%',
			}"
		>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas tempore
			doloribus numquam? Maiores nostrum quisquam officia modi quis, dolore
			dignissimos provident consequatur explicabo dicta pariatur assumenda ullam
			dolor vero repudiandae!
		</p>
		<p v-for="item in 5" :key="item">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas tempore
			doloribus numquam? Maiores nostrum quisquam officia modi quis, dolore
			dignissimos provident consequatur explicabo dicta pariatur assumenda ullam
			dolor vero repudiandae!
		</p>
		<ScrollBar
			:style="{
				height: '300px',
				width: '300px',
				overflow: 'auto',
				scrollbarWidth: 'none',
			}"
			:vertical="{
				style: {
					backgroundColor: 'black',
					width: '5px',
				},
			}"
			:horizontal="{
				style: {
					backgroundColor: 'black',
					height: '5px',
				},
			}"
		>
			<p
				v-for="item in 50"
				:key="item"
				:style="{
					overflowX: 'hidden',
				}"
			>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
				tempore doloribus numquam? Maiores nostrum quisquam officia modi quis,
				dolore dignissimos provident consequatur explicabo dicta pariatur
				assumenda ullam dolor vero repudiandae!
			</p>
		</ScrollBar>

		<p
			v-for="item in 50"
			:key="item"
			:style="{
				overflowX: 'hidden',
			}"
		>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas tempore
			doloribus numquam? Maiores nostrum quisquam officia modi quis, dolore
			dignissimos provident consequatur explicabo dicta pariatur assumenda ullam
			dolor vero repudiandae!
		</p>
		<p
			:style="{
				position: 'sticky',
				bottom: 0,
				left: 0,
				background: 'gray',
				height: '50px',
				margin: 0,
				overflow: 'hidden',
			}"
		>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas tempore
			doloribus numquam? Maiores nostrum quisquam officia modi quis, dolore
			dignissimos provident consequatur explicabo dicta pariatur assumenda ullam
			dolor vero repudiandae!
		</p>
	</ScrollBar>
</template>
