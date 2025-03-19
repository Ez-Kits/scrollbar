<script setup lang="ts">
import { useVirtualizer } from "@tanstack/vue-virtual";
import { ref, computed, watchEffect } from "vue";
import { VerticalScrollBar } from "@ez-kits/scrollbar-vue";

const parentRef = ref(null);

const rowVirtualizer = useVirtualizer({
	count: 100,
	getScrollElement: () => parentRef.value,
	estimateSize: () => 35,
	overscan: 5,
});

const virtualItems = computed(() => rowVirtualizer.value.getVirtualItems());
const totalSize = computed(() => rowVirtualizer.value.getTotalSize());
</script>

<template>
	<VerticalScrollBar
		:container="parentRef"
		:style="{
			width: '10px',
			backgroundColor: 'black',
			zIndex: 1000,
		}"
	/>
	<div
		ref="parentRef"
		class="List"
		:style="{
			height: '200px',
			width: '400px',
			overflow: 'auto',
			'scrollbar-width': 'none',
		}"
	>
		<div
			:style="{
				height: `${totalSize}px`,
				width: '100%',
				position: 'relative',
			}"
		>
			<div
				v-for="virtualRow in virtualItems"
				:key="virtualRow.index"
				:style="{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: `${virtualRow.size}px`,
					transform: `translateY(${virtualRow.start}px)`,
				}"
			>
				Row {{ virtualRow.index }}
			</div>
		</div>
	</div>
</template>
