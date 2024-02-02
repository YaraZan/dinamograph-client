<script setup>
  const props = defineProps({
    to: {
      type: String,
      required: true,
    }
  })
</script>

<template>
  <router-link :to="{ name: to }">
    <div class="flex rounded-[10px] cursor-pointer hover:bg-gray-100 dark:hover:bg-stone-900 items-center justify-center w-[52px] h-[52px]">
      <slot />
    </div>
  </router-link>
</template>