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
  <svg :class="[customSize, iconSize]" class="cursor-pointer stroke-gray-400 hover:stroke-gray-600 dark:stroke-gray-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.8661 6.55357H6.42857C5.08731 6.55357 4 7.64088 4 8.98214V19.3036C4 20.6448 5.08731 21.7321 6.42857 21.7321H13.8661C15.2073 21.7321 16.2946 20.6448 16.2946 19.3036V8.98214C16.2946 7.64088 15.2073 6.55357 13.8661 6.55357Z"/>
    <path d="M18.5714 2H11.1339C9.79267 2 8.70536 3.08731 8.70536 4.42857V14.75C8.70536 16.0913 9.79267 17.1786 11.1339 17.1786H18.5714C19.9127 17.1786 21 16.0913 21 14.75V4.42857C21 3.08731 19.9127 2 18.5714 2Z" stroke-width="1.21429"/>
    <path d="M13.8661 6.55357H6.42857C5.08731 6.55357 4 7.64088 4 8.98214V19.3036C4 20.6448 5.08731 21.7321 6.42857 21.7321H13.8661C15.2073 21.7321 16.2946 20.6448 16.2946 19.3036V8.98214C16.2946 7.64088 15.2073 6.55357 13.8661 6.55357Z" stroke-width="1.21429"/>
  </svg>
</template>





