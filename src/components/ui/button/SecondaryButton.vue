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
  },
  activeClass: {
    type: String,
    default: ""
  },
})

const buttonSize = computed(() => {
  return {
    xs: 'w-[80px]',
    sm: 'w-[100px]',
    md: 'w-[200px]',
    lg: 'w-[250px]',
    xl: 'w-[300px]',
    'custom': props.customStyles,
  }[props.size.toString()]
})
</script>

<template>
<button
  class="px-[12px] py-[4px] font-raleway font-bold border border-gray-300 cursor-pointer outline-none
  text-gray-800 rounded-[10px] dark:text-white dark:border-stone-600 flex items-center justify-between
  hover:bg-gray-50 dark:hover:bg-opacity-60 shadow focus:border-primary active:bg-opacity-1
  bg-white dark:bg-gray-7 dark:focus:border-primary dark:active:bg-opacity-60 text-[16px]
  dark:shadow-stone-700"
  :class="[buttonSize, customStyles, activeClass]">
  <slot name="prefix" />
  {{ text }}
  <slot name="suffix" />
</button>
</template>
