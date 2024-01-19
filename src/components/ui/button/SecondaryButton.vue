<script setup>
import {computed} from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "Кнопка"
  },
  size: {
    type: String,
    default: "sm"
  },
  customStyles: {
    type: String,
    default: ""
  }
})

const buttonSize = computed(() => {
  return {
    sm: 'px-[20px] py-[8px]',
    md: 'px-[40px] py-[16px]',
    'custom': props.customStyles,
  }[props.size.toString()]
})
</script>

<template>
<button
  class="font-raleway font-bold border border-gray-5 cursor-pointer
  text-gray-6 rounded-[10px] dark:text-white dark:border-gray-6
  hover:bg-opacity-5 dark:hover:bg-opacity-60 shadow focus:border-primary active:bg-opacity-1
  bg-white dark:bg-gray-7 dark:focus:border-primary dark:active:bg-opacity-60 text-[16px]"
  :class="[buttonSize, customStyles]">
  <slot name="prefix" />
  {{ text }}
  <slot name="suffix" />
</button>
</template>
