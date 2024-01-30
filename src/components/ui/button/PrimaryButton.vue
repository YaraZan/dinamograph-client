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
})

const buttonSize = computed(() => {
  return {
    xs: 'px-[12px] py-[4px]',
    sm: 'px-[20px] py-[8px]',
    md: 'px-[40px] py-[16px]',
    'custom': props.customStyles,
  }[props.size.toString()]
})
</script>

<template>
  <button
      class="border border-purple-1 cursor-pointer outline-none
      rounded-[10px] shadow hover:bg-purple-2 focus:bg-purple-2 active:bg-purple-2
      bg-primary dark:hover:bg-opacity-60 dark:focus:border-primary dark:active:bg-opacity-1"
      :class="[buttonSize, customStyles]">
    <slot name="prefix" />

    <span class="font-raleway font-bold text-white text-[16px]" v-if="!$slots.spinner">{{ text }}</span>

    <slot name="suffix" />

    <slot name="spinner" />
  </button>
</template>
