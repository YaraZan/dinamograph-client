<script setup>
import {computed, onMounted, ref} from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Поле ввода"
  },
  size: {
    type: String,
    default: "sm"
  },
  isError: {
    type: Boolean,
    default: false
  },
  isDisabled: {
    type: Boolean,
    default: false
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
    xs: 'p-[5px] text-[12px] h-[32px] w-[180px]',
    sm: 'p-[5px] text-[12px] h-[38px] w-[200px]',
    md: 'p-[10px] text-[14px] h-[42px] w-[300px]',
    lg: 'p-[10px] text-[14px] h-[48px] w-[350px]',
    'custom': props.customStyles,
  }[props.size.toString()]
})

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="relative">

    <slot name="prefix" />

    <input
        :disabled="isDisabled"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :type="type"
        :placeholder="placeholder"
        class="bg-white dark:bg-gray-7 border border-gray-5 dark:border-gray-6 rounded-[10px]
        focus:ring-0 focus:ring-offset-0 outline-none dark:focus:border-primary dark:focus:bg-primary
        dark:focus:bg-opacity-5 hover:bg-gray-11 dark:hover:bg-opacity-60 focus:border-primary focus:bg-primary
        focus:bg-opacity-5 placeholder-gray-4 dark:placeholder-gray-6 text-gray-7 dark:text-white font-semibold
        disabled:bg-gray-100 disabled:text-gray-400"
        :class="[inputSize, customStyles, isError ? 'border-red-500 dark:bg-red-500 dark:bg-opacity-5 bg-red-500 bg-opacity-5':'']">

    <div
         class="absolute right-[5px] bottom-[5px] flex items-center justify-center">
      <slot name="suffix" />
    </div>

  </div>
</template>
