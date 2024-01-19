<script setup>
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
<main class="font-raleway min-w-screen min-h-screen bg-white dark:bg-gray-9">
    <slot />
</main>
</template>