<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "Ссылка"
  },
  href: {
    type: String,
    default: "#"
  },
})
</script>

<template>
<a :href="href" class="font-medium text-[16px] uppercase tracking-[-1%]
          text-gray-7 dark:text-white hover:text-primary dark:hover:text-primary cursor-pointer">
  {{ text }}
</a>
</template>