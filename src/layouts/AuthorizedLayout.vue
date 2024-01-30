<script setup>
import { useDark, useToggle } from '@vueuse/core';
import {Logo} from "@components/ui/index.js";
import Magic from "@icons/outline/Magic.vue";
import Settings from "@icons/outline/Settings.vue";
import MainNavLink from "@components/MainNavLink.vue";
import Config from "@icons/outline/Config.vue";
import Logo3D from "@components/ui/logo/Logo3D.vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <aside class="font-raleway fixed w-[72px] min-h-screen border-r border-gray-12">
    <div class="flex flex-col w-full px-[10px] py-[20px] gap-[10px] items-center">
      <Logo3D size="sm" class="mb-[20px]" />

      <MainNavLink to="predict">
        <Magic :custom-size="$route.name === 'predict' ? 'stroke-primary' : 'stroke-gray-400 dark:stroke-gray-400'" size="sm"/>
      </MainNavLink>
      <MainNavLink to="settings">
        <Settings :custom-size="$route.name === 'settings' ? 'stroke-primary' : 'stroke-gray-400 dark:stroke-gray-400'" size="sm"/>
      </MainNavLink>
      <MainNavLink to="config">
        <Config :custom-size="$route.name === 'config' ? 'stroke-primary' : 'stroke-gray-400 dark:stroke-gray-400'" size="sm"/>
      </MainNavLink>
    </div>
  </aside>

  <main class="font-raleway ml-[72px] min-w-screen min-h-screen bg-white dark:bg-gray-9">
    <slot />
  </main>
</template>