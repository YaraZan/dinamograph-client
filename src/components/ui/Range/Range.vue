<script setup>
import {computed, onMounted, ref} from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  Label: {
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

defineEmits(['updateValue']);
</script>

<template>
    <div class="flex flex-col gap-4">
      <slot name="label"/>
      <input :value="modelValue"
             :disabled="isDisabled"
             @change="$emit('updateValue', $event.target.value)"
             type="range" min="25" max="100"
             class="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer dark:bg-stone-600
             accent-primary shadow-2xl disabled:accent-gray-200 dark:disabled:accent-stone-500">
      <div class="w-full flex items-center justify-between">
        <span class="text-sm text-gray-400 dark:text-stone-500">Min (25)</span>
        <span class="text-sm text-gray-400 dark:text-stone-500">Max (100)</span>
      </div>
    </div>
</template>
