<script setup>
import GuestLayout from "@/layouts/GuestLayout.vue";
import {Input, Logo, PrimaryButton} from "@components/ui/index.js";
import Eye from "@icons/filled/Eye.vue";
import PasswordInput from "@components/ui/input/PasswordInput.vue";
</script>

<template>
  <guest-layout>
    <div class="min-w-screen min-h-screen flex items-center justify-center">

      <div class="flex flex-col items-center mb-[200px]">

        <Logo size="lg" />

        <div class="flex flex-col gap-[30px] mt-[20px] w-[350px]">
          <h2 class="text-[32px] font-semibold self-center">Вход в аккаунт</h2>
          <Input custom-styles="h-[48px]" placeholder="Почта" />
          <PasswordInput custom-styles="h-[48px]" placeholder="Пароль" />
          <PrimaryButton text="Войти" />
        </div>

        <div class="flex items-center gap-[20px] mt-[40px]">
          <span class="text-[14px] font-medium text-gray-7 dark:text-gray-5">Ещё нет аккаунта?</span>
          <router-link
              to="/registration"
              class="text-[14px] font-medium text-primary hover:text-purple-2 focus:outline-primary"
              >Создайте бесплатно!</router-link>
        </div>

      </div>
    </div>
  </guest-layout>
</template>
