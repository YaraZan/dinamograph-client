<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import ArrowBottom from "@icons/filled/ArrowBottom.vue";
import {SecondaryButton} from "@components/ui/index.js";

const props = defineProps({
  text: {
    type: String,
    default: "SingleCheck",
  },
  triggerSize: {
    type: String,
    required: false,
    default: "md"
  },
  selected: {
    type: String,
  },
})

const open = ref(false);

const selected = ref(false);

const closeOnEscape = (e) => {
  if (open.value && e.key === 'Escape') {
    open.value = false;
  }
};

onMounted(() => document.addEventListener('keydown', closeOnEscape));
onUnmounted(() => document.removeEventListener('keydown', closeOnEscape));

const preventClose = (e) => {
  e.stopPropagation();
};

</script>

<template>
  <div class="relative flex flex-col items-center justify-center">
    <SecondaryButton
      @click="open = !open"
      :size="triggerSize"
      :active-class="open ? 'border-primary dark:border-primary ' : ''"
      :text="text">

      <template #suffix>
        <ArrowBottom />
      </template>
    </SecondaryButton>
    <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
    >
      <div v-show="open" @click="preventClose"
           class="absolute top-[110%] gap-[5px] w-full flex flex-col p-[5px] border
           border-gray-300 dark:border-stone-600 rounded-[10px]">
        <slot name="content"/>
      </div>
    </Transition>
  </div>
</template>