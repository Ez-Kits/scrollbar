<script setup lang="ts">
import { ScrollBar } from "@ez-kits/scrollbar-vue";
</script>

<template>
	<ScrollBar
		:style="{
			height: '600px',
			width: '600px',
			paddingRight: '10px',
			overflowY: 'auto',
			position: 'relative',
			scrollbarWidth: 'none',
			whiteSpace: 'nowrap',
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
			thumbProps: {
				class: 'bg-gray-500 absolute top-0 w-2 min-h-4',
				style: {
					transform: 'translateY(var(--thumb-offset))',
					height: 'var(--thumb-size)',
				},
			},
			trackProps: {
				class: 'bg-black absolute right-0 top-0 bottom-0 w-2',
			},
		}"
		:horizontal="{
			thumbProps: {
				class: 'bg-gray-500 absolute left-0 right-0 bottom-0 h-2',
				style: {
					transform: 'translateX(var(--thumb-offset))',
					width: 'var(--thumb-size)',
				},
			},
			trackProps: {
				class: 'bg-black absolute left-0 right-0 bottom-0 h-2',
			},
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
		<p v-for="index in 5" :key="index">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas tempore
			doloribus numquam? Maiores nostrum quisquam officia modi quis, dolore
			dignissimos provident consequatur explicabo dicta pariatur assumenda ullam
			dolor vero repudiandae!
		</p>

		<ScrollBar
			:style="{
				height: '300px',
				width: '300px',
				scrollbarWidth: 'none',
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
				thumbProps: {
					class:
						'bg-gray-500 absolute top-0 w-2 min-h-25 group-data-[is-dragging-thumb]:bg-gray-700',
					style: {
						transform: 'translateY(var(--thumb-offset))',
						height: 'var(--thumb-size)',
					},
				},
				trackProps: {
					class:
						'group bg-black absolute right-0 top-0 bottom-0 w-2 overflow-hidden',
				},
			}"
			:horizontal="{
				thumbProps: {
					class:
						'bg-gray-500 absolute left-0 right-0 bottom-0 h-2 group-data-[is-dragging-thumb]:bg-gray-700',
					style: {
						transform: 'translateX(var(--thumb-offset))',
						width: 'var(--thumb-size)',
					},
				},
				trackProps: {
					class: 'group bg-black absolute left-0 right-0 bottom-0 h-2',
				},
			}"
		>
			<p v-for="index in 50" :key="index">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
				tempore doloribus numquam? Maiores nostrum quisquam officia modi quis,
				dolore dignissimos provident consequatur explicabo dicta pariatur
				assumenda ullam dolor vero repudiandae!
			</p>
		</ScrollBar>

		<p
			v-for="index in 5"
			:key="index"
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
