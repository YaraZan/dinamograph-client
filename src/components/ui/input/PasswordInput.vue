<script setup>
import {computed, ref} from "vue";
import Eye from "@icons/filled/Eye.vue";
import EyeClosed from "@icons/filled/EyeClosed.vue";

const props = defineProps({
  placeholder: {
    type: String,
    default: "Поле ввода"
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

const showPassord = ref(false)
</script>

<template>
  <div class="relative">

    <input
        :type="showPassord ? 'text' : 'password'"
        :placeholder="placeholder"
        class="w-full bg-white dark:bg-gray-7 border border-gray-5 dark:border-gray-6 rounded-[10px]
        focus:ring-0 focus:ring-offset-0 outline-none dark:focus:border-primary dark:focus:bg-primary
        dark:focus:bg-opacity-5 hover:bg-gray-11 dark:hover:bg-opacity-60 focus:border-primary focus:bg-primary
        focus:bg-opacity-5 placeholder-gray-4 dark:placeholder-gray-6 text-gray-7 dark:text-white font-semibold"
        :class="[inputSize, customStyles]">

    <div @click="showPassord = !showPassord"
         class="absolute right-[5px] bottom-[5px] flex p-[8px] items-center justify-center rounded-[10px]
          hover:bg-gray-10 dark:hover:bg-gray-8 cursor-pointer">
      <EyeClosed v-if="showPassord" />
      <Eye v-else />
    </div>

  </div>
</template>
