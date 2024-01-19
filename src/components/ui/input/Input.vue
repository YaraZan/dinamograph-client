<script setup>
import {computed} from "vue";

const props = defineProps({
  placeholder: {
    type: String,
    default: "Поле ввода"
  },
  size: {
    type: String,
    default: "sm"
  },
  type: {
    type: String,
    default: "text"
  },
  customStyles: {
    type: String,
    default: ""
  }
})

const inputSize = computed(() => {
  return {
    xs: 'p-[5px] text-[12px]',
    sm: 'p-[8px] text-[14px]',
    md: 'p-[12px] text-[18px]',
    'custom': props.customStyles,
  }[props.size.toString()]
})
</script>

<template>
  <div class="relative">

    <slot name="prefix" />

    <input
        :type="type"
        :placeholder="placeholder"
        class="w-full bg-white dark:bg-gray-7 border border-gray-5 dark:border-gray-6 rounded-[10px]
        focus:ring-0 focus:ring-offset-0 outline-none dark:focus:border-primary dark:focus:bg-primary
        dark:focus:bg-opacity-5 hover:border-primary dark:hover:bg-opacity-60 focus:border-primary focus:bg-primary
        focus:bg-opacity-5 placeholder-gray-4 dark:placeholder-gray-6 text-gray-7 dark:text-white font-semibold"
        :class="[inputSize, customStyles]">

    <slot name="suffix" />

  </div>
</template>
