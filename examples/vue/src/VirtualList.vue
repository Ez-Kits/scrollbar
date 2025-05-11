<script setup lang="ts">
import { VerticalScrollBar } from "@ez-kits/scrollbar-vue";
import { useVirtualizer } from "@tanstack/vue-virtual";
import { computed, ref } from "vue";

const parentRef = ref<HTMLElement | null>(null);

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
	<div className="relative w-100">
		<VerticalScrollBar
			:container="parentRef"
			:thumbProps="{
				class: 'bg-gray-500 absolute top-0 w-2 min-h-4',
				style: {
					transform: 'translateY(var(--thumb-offset))',
					height: 'var(--thumb-size)',
				},
			}"
			:trackProps="{
				class: 'bg-black absolute right-0 top-0 bottom-0 w-2 z-10',
			}"
		/>
		<div
			ref="parentRef"
			class="List"
			:style="{
				height: `200px`,
				width: `400px`,
				overflow: 'auto',
				scrollbarWidth: 'none',
				position: 'relative',
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
					:class="virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'"
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
	</div>
</template>
