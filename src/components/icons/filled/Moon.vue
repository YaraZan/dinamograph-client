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
  <svg :class="[customSize, iconSize]" class="fill-gray-51" xmlns="http://www.w3.org/2000/svg" ><path fill-rule="evenodd" d="M19.518 15.13a7.404 7.404 0 0 1-2.689.503c-4.242 0-7.681-3.576-7.681-7.988 0-1.313.304-2.552.844-3.645C7.076 5.134 5 8.057 5 11.485c0 4.412 3.439 7.989 7.681 7.989 2.98 0 5.564-1.765 6.837-4.344Z" clip-rule="evenodd"/></svg>
</template>

