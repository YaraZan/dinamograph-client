<script setup>
import Copy from "@icons/outline/Copy.vue";
import {ref} from "vue";

const props = defineProps({
  textToCopy: {
    type: String,
    required: true
  }
})

const showTooltip = ref(false)
const copyToClipboard = () => {
  showTooltip.value = true
  navigator.clipboard.writeText(props.textToCopy);

  setTimeout(() => {
    showTooltip.value = false
  }, 1000)
}

</script>

<template>
<div @click="copyToClipboard" class="relative flex flex-col items-center justify-center">
  <Copy custom-size="w-[20px] h-[20px]"/>
  <div v-if="showTooltip" class="absolute bottom-[150%] flex items-center justify-center p-[5px] bg-stone-900 border border-stone-700 rounded-[5px]">
    <span class="font-semibold text-[14px] text-white">Скопировано!</span>
  </div>
</div>
</template>
