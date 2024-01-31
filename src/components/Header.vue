<script setup>
import {SecondaryButton} from "@components/ui/index.js";
import {PrimaryButton} from "@components/ui/index.js";
import HeaderLink from "@components/ui/link/HeaderLink.vue";
import Moon from "@icons/filled/Moon.vue";

import { useDark, useToggle } from '@vueuse/core';
import Sun from "@icons/filled/Sun.vue";
</script>

<template>
<header>
  <div class="flex w-full px-[142px] py-[40px] items-center justify-between">
    <div class="flex items-center gap-[100px]">
      <HeaderLink text="api"/>
      <HeaderLink text="About"/>
      <HeaderLink text="v.1.0"/>
    </div>

    <div class="flex items-center gap-[30px]">
      <!-- <SecondaryButton text="Главная"/> -->
      <div class="flex items-center gap-[50px]">
        <router-link to="/login"><HeaderLink text="login"/></router-link>
        <router-link to="/registration"><HeaderLink text="registration"/></router-link>
      </div>
    </div>
  </div>
</header>
</template>