<script setup lang="ts">
import { ScrollBar } from "@ez-kits/scrollbar-vue";
import NestedScrollBar from "./NestedScrollBar.vue";
import VirtualList from "./VirtualList.vue";
import ScrollBarPositionAbsolute from "./ScrollBarPositionAbsolute.vue";
import ContainerSizeChange from "./ContainerSizeChange.vue";
</script>

<template>
	<div>
		<h2>Nested ScrollBar</h2>
		<NestedScrollBar />
		<h2>Virtual List</h2>
		<VirtualList />
		<h2>ScrollBar Position Absolute</h2>
		<ScrollBarPositionAbsolute />
		<h2>Container Size Change</h2>
		<ContainerSizeChange />
	</div>
</template>
