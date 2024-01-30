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
  <svg :class="[customSize, iconSize]" class="cursor-pointer stroke-gray-400 hover:stroke-gray-600 dark:stroke-gray-200" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.74406 4.57731V17.078C2.74406 18.7619 4.10911 20.1269 5.793 20.1269H14.4511C16.1349 20.1269 17.5 18.7619 17.5 17.078V4.57731M0 3.66274H20M7.01251 1.83325H13.3333M7.01251 16.4166V9.40402M13.3333 16.4166V9.40402" stroke-width="1.82937"/>
  </svg>
</template>





