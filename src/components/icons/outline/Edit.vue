<script setup>
import {computed} from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "xs"
  },
  customSize: {
    type: String,
    default: ""
  },
})

const iconSize = computed(() => {
  return {
    xs: 'w-[24px] h-[24px]',
    sm: 'w-[32px] h-[32px]',
    md: 'w-[48px] h-[48px]',
    lg: 'w-[64px] h-[64px]',
    xl: 'w-[96px] h-[96px]',
    '2xl': 'w-[128px] h-[128px]',
    '3xl': 'w-[256px] h-[256px]',
  }[props.size.toString()]
})

</script>

<template>
  <svg :class="[customSize, iconSize]" class="cursor-pointer stroke-gray-300 hover:stroke-gray-400 dark:stroke-stone-600 dark:hover:stroke-stone-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.93663 13.7545L3.97712 19.5919C3.89928 20.0655 4.31952 20.4704 4.78987 20.3751L10.6513 19.187M4.93663 13.7545L10.6513 19.187M4.93663 13.7545L14.5452 3.64696M10.6513 19.187L20.4147 8.91658M20.4147 8.91658L22.3037 6.92946C22.5646 6.65501 22.5536 6.22103 22.2792 5.96013L17.5584 1.47238C17.2839 1.21148 16.8499 1.22247 16.589 1.49691L14.5452 3.64696M20.4147 8.91658L14.5452 3.64696" stroke-width="1.5"/>
  </svg>
</template>


