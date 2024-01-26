<script setup>
import GuestLayout from "@/layouts/GuestLayout.vue";
import {FileSelect, Input, Logo, PrimaryButton, SecondaryButton} from "@components/ui/index.js";
import Eye from "@icons/filled/Eye.vue";
import PasswordInput from "@components/ui/input/PasswordInput.vue";
import AuthorizedLayout from "@/layouts/AuthorizedLayout.vue";
</script>

<template>
  <authorized-layout>
    <div class="w-full mx-auto flex flex-col justify-between min-h-screen p-[20px]">
      This is config!
    </div>
  </authorized-layout>
</template>
