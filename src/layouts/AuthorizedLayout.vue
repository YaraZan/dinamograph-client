<script setup>
import { useDark, useToggle } from '@vueuse/core';
import {Logo} from "@components/ui/index.js";
import Magic from "@icons/outline/Magic.vue";
import Settings from "@icons/outline/Settings.vue";
import MainNavLink from "@components/MainNavLink.vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <aside class="font-raleway fixed w-[72px] min-h-screen border-r border-gray-12">
    <div class="flex flex-col w-full px-[10px] py-[20px] gap-[10px] items-center">
      <Logo size="sm" class="mb-[20px]" />

      <MainNavLink to="/ai">
        <Magic :custom-size="$route.name === 'ai' ? 'stroke-primary' : 'stroke-gray-51'" size="sm"/>
      </MainNavLink>
      <MainNavLink to="config">
        <Settings :custom-size="$route.name === 'config' ? 'stroke-primary' : 'stroke-gray-51'" size="sm"/>
      </MainNavLink>

    </div>
  </aside>

  <main class="font-raleway ml-[72px] min-w-screen min-h-screen bg-white dark:bg-gray-9">
    <slot />
  </main>
</template>