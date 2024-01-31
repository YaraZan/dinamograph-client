<script setup>
import {computed} from "vue";

const props = defineProps({
  placeholder: {
    type: String,
    default: "Выберите файл"
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

const inputSize = computed(() => {
  return {
    xs: 'p-[5px] text-[12px]',
    sm: 'p-[8px] text-[14px]',
    md: 'p-[12px] text-[18px]',
    'custom': props.customStyles,
  }[props.size.toString()]
})

const emit = defineEmits(['selectImage'])

const handleFileChange = (event) => {
  const file = event.target.files[0];
  emit('selectImage', file);
};

</script>

<template>
  <div class="relative">

    <slot name="prefix" />

    <input
        type="file"
        @change="handleFileChange"
        :placeholder="placeholder"
        class="block w-full text-sm text-gray-400
        file:mr-4 file:py-2 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        file:bg-purple-100 file:text-purple-2
        hover:file:bg-purple-200 file:cursor-pointer"
        :class="[inputSize, customStyles]">

    <div
        class="absolute right-[5px] bottom-[5px] flex items-center justify-center">
      <slot name="suffix" />
    </div>

  </div>
</template>
