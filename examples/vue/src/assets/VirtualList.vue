<script setup lang="ts">
import { useVirtualizer } from "@tanstack/vue-virtualizer";
import { ref } from "vue";

const parentRef = ref(null);

const rowVirtualizer = useVirtualizer({
	count: 100,
	getScrollElement: () => parentRef.current,
	estimateSize: () => 35,
	overscan: 5,
});
</script>

<template></template>
