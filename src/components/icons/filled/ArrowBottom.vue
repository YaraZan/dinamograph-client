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
  <svg :class="[customSize, iconSize]" class="fill-gray-400 stroke-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.7279 16.275L17.5753 7.74708C17.7648 7.41376 17.5241 7 17.1407 7H6.90716C6.51339 7 6.27414 7.43406 6.48442 7.767L11.8705 16.2949C12.0721 16.6142 12.5413 16.6033 12.7279 16.275Z" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
</template>



