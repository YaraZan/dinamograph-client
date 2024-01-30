<script setup>
import GuestLayout from "../layouts/GuestLayout.vue";
import { Header } from "@components"
import {Logo} from "@components/ui/index.js";
</script>

<template>
<guest-layout>
  <Header />

  <div class="flex px-[142px]">

    <div class="flex flex-col gap-[10px] mt-[200px]">
      <div class="flex items-center gap-[10px]">
        <Logo size="sm" />
        <h2 class="text-primary dark:text-white font-normal text-[32px]">Dinamograph</h2>
      </div>
      <h1 class="text-gray-7 dark:text-white font-bold text-[72px]">Some hero title</h1>
    </div>

  </div>
</guest-layout>
</template>
