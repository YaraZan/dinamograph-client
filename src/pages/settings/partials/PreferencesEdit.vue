<script setup>
import SingleSelectDropdown from "@components/ui/dropdown/SingleDropdown.vue";
import {useDark, useToggle} from "@vueuse/core";
import Moon from "@icons/filled/Moon.vue";
import Sun from "@icons/filled/Sun.vue";
import Checked from "@icons/outline/Checked.vue";
import {computed, ref} from "vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const colorScheme = computed(() => {
  return isDark ? 'Тёмная' : 'Светлая'
})

const toggleTheme = (theme) => {
  if (theme === 'Светлая') {
    toggleDark(false);
  } else if (theme === 'Тёмная') {
    toggleDark(true);
  }
}
</script>

<template>
  <div class="flex w-full flex-col items-start gap-[40px]">

    <div class="flex flex-col gap-[5px]">
      <h2 class="font-semibold text-[48px] text-gray-800 dark:text-white">Персонализация</h2>
      <span class="font-normal text-[16px] text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, fuga?</span>
    </div>

    <SingleSelectDropdown text="Тема">
      <template #content>
        <div
            class="flex items-center gap-[15px] p-[10px] cursor-pointer hover:bg-gray-100 dark:hover:bg-stone-700 rounded-[10px]"
            @click="toggleTheme('Светлая')">
          <Sun />
          <span class="font-semibold text-gray-800 dark:text-white text-[16px]">Светлая</span>
          <Checked v-if="!isDark" custom-size="stroke-primary" class="w-[20px] h-[20px] ml-[auto]" />
        </div>
        <div
            class="flex items-center gap-[15px] p-[10px] cursor-pointer hover:bg-gray-100 dark:hover:bg-stone-700 rounded-[10px]"
            @click="toggleTheme('Тёмная')">
          <Moon />
          <span class="font-semibold text-gray-800 dark:text-white text-[16px]">Тёмная</span>
          <Checked v-if="isDark" custom-size="stroke-primary" class="w-[20px] h-[20px] ml-[auto]" />
        </div>
      </template>
    </SingleSelectDropdown>

  </div>

</template>
