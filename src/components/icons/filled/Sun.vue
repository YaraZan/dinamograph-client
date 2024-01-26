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
  <svg :class="[customSize, iconSize]" class="fill-gray-51" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.242 4.76a.76.76 0 1 1 1.518 0v.817a.76.76 0 1 1-1.518 0v-.818ZM4.76 12.292a.76.76 0 1 1 0-1.518h.818a.76.76 0 1 1 0 1.518h-.818Zm13.024-.759c0 .42.34.76.76.76h.817a.76.76 0 1 0 0-1.52h-.817a.76.76 0 0 0-.76.76ZM6.346 6.83a.76.76 0 1 1 1.181-.955l.546.676a.76.76 0 0 1-1.18.955l-.547-.676Zm11.192-1.068a.76.76 0 0 1 .113 1.068l-.546.676a.76.76 0 0 1-1.18-.955l.545-.676a.76.76 0 0 1 1.068-.113ZM6.346 16.18a.76.76 0 0 0 1.181.955l.526-.651a.76.76 0 1 0-1.181-.954l-.526.65Zm11.289 1.185a.76.76 0 0 0 .113-1.068l-.526-.65a.76.76 0 0 0-1.18.954l.525.65a.76.76 0 0 0 1.068.114Zm-6.393.71a.76.76 0 1 1 1.518 0v.818a.76.76 0 1 1-1.518 0v-.818Zm.76-2.978c1.902 0 3.445-1.57 3.445-3.505 0-1.935-1.543-3.504-3.446-3.504-1.903 0-3.446 1.57-3.446 3.505 0 1.935 1.543 3.504 3.446 3.504Z" clip-rule="evenodd"/></svg>
</template>

