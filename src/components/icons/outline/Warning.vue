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
  <svg :class="[customSize, iconSize]" class="stroke-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9.25" stroke-width="1.5"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0478 7.49997C13.0478 6.92128 12.5787 6.45215 12 6.45215C11.4213 6.45215 10.9521 6.92128 10.9521 7.49997V14C10.9521 14.5787 11.4213 15.0478 12 15.0478C12.5787 15.0478 13.0478 14.5787 13.0478 14L13.0478 7.49997ZM12 18.25C12.5523 18.25 13 17.8023 13 17.25C13 16.6977 12.5523 16.25 12 16.25C11.4477 16.25 11 16.6977 11 17.25C11 17.8023 11.4477 18.25 12 18.25Z" fill="#57534E"/>
  </svg>
</template>


