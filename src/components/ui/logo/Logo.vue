<script setup>
import {computed} from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "xs"
  }
})

const logoSize = computed(() => {
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
  <svg :class="logoSize" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.44044 11.1251L12.7413 11.1251C13.8556 11.1251 14.7569 12.0285 14.7569 13.1428C14.7569 14.2571 13.8536 15.1605 12.7393 15.1605L1.44044 15.1605M3.05455 6.68616L12.7394 6.68616C16.3052 6.68616 19.1957 9.5769 19.1957 13.1428C19.1957 16.7087 16.3051 19.5994 12.7393 19.5994L3.05455 19.5994M22.6235 5.82828C17.7482 -0.715087 7.90237 -0.585292 3.19675 6.08117C0.220314 10.2979 0.272657 15.9474 3.32855 20.1069C8.04615 26.5282 17.5993 26.6493 22.4822 20.3527C25.7856 16.0929 25.8443 10.151 22.6235 5.82828Z" stroke="#6F00FF" stroke-width="1.5"/>
  </svg>
</template>