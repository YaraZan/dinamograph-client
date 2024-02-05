<script setup>
import AuthorizedLayout from "@/layouts/AuthorizedLayout.vue";
</script>

<template>
  <authorized-layout>
    <div class="fixed w-full flex items-center border-b border-gray-300 dark:border-stone-700 bg-white dark:bg-stone-800 z-10">
      <div class="w-2/3 mx-auto flex items-center">
        <router-link :to="{ name: 'config.versions' }"
            :class="$route.name === 'config.versions' ?
            'border-b-2 border-primary text-primary dark:text-primary opacity-100 font-semibold' :
            'text-gray-400 dark:text-stone-600 opacity-60 hover:opacity-100'"
            class="flex items-center justify-center p-4 cursor-pointer
            text-[16px] font-medium">
          Версии
        </router-link>
        <router-link  :to="{ name: 'config.datasets' }"
            :class="$route.name === 'config.datasets' ?
            'border-b-2 border-primary text-primary dark:text-primary opacity-100 font-semibold' :
            'text-gray-400 dark:text-stone-600 opacity-60 hover:opacity-100'"
            class="flex items-center justify-center p-4 cursor-pointer
            text-[16px] font-medium">
          Датасеты
        </router-link>
        <router-link  :to="{ name: 'config.markers' }"
            :class="$route.name === 'config.markers' ?
            'border-b-2 border-primary text-primary dark:text-primary opacity-100 font-semibold' :
            'text-gray-400 dark:text-stone-600 opacity-60 hover:opacity-100'"
            class="flex items-center justify-center p-4 cursor-pointer
            text-[16px] font-medium">
          Маркеры
        </router-link>
      </div>
    </div>
    <router-view></router-view>
  </authorized-layout>
</template>
