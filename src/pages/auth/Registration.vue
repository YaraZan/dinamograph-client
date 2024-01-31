<script setup>
import GuestLayout from "@/layouts/GuestLayout.vue";
import {Input, Logo, PrimaryButton} from "@components/ui/index.js";
import Eye from "@icons/filled/Eye.vue";
import PasswordInput from "@components/ui/input/PasswordInput.vue";
import {ref} from "vue";
import axios from "axios";
import {encryptStorage} from "@/utils/storage.js";
import router from "@/routing/router.js";
import Spinner from "@components/ui/loading/spinner/Spinner.vue";
import Warning from "@icons/filled/Warning.vue";

const nameInput = ref('')
const emailInput = ref('')
const passInput = ref('')
const passConfirmInput = ref('')
const processing = ref(false);
const DINAMOGRAPH_API_URL = import.meta.env.VITE_DINAMOGRAPH_API_URL

const error = ref('')

const register = () => {

  processing.value = true

  axios.post(`${DINAMOGRAPH_API_URL}/v1/user/register`, {
    name: nameInput.value,
    email: emailInput.value,
    password: passInput.value,
    confirm_password: passConfirmInput.value,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
      .then(response => {
        router.push('/predict')
      })
      .catch(e => {
        error.value = e.response.data.detail
        processing.value = false;
      })
      .finally(() => {
        processing.value = false;
      })
}
</script>


<template>
  <guest-layout>
    <div class="min-w-screen min-h-screen flex items-center justify-center">

      <div class="flex flex-col items-center mb-[200px]">

        <Logo size="lg" />

        <div class="flex flex-col gap-[40px] mt-[20px] w-[350px]">
          <h2 class="text-[32px] font-semibold self-center">Регистрация аккаунта</h2>
          <div class="relative w-full">
            <Input v-model="nameInput" :is-error="error.includes('Name')" size="lg" placeholder="Имя" />
            <div v-if="error.includes('Name')" class="absolute flex items-center gap-[5px] text-[12px] text-red-500 font-semibold top-[110%]">
              <Warning custom-size="w-[15px] h-[15px] fill-red-500"/>
              {{ error }}
            </div>
          </div>

          <div class="relative w-full">
            <Input v-model="emailInput" :is-error="error.includes('Email')" size="lg" placeholder="Почта" />
            <div v-if="error.includes('Email')" class="absolute flex items-center gap-[5px] text-[12px] text-red-500 font-semibold top-[110%]">
              <Warning custom-size="w-[15px] h-[15px] fill-red-500"/>
              {{ error }}
            </div>
          </div>

          <div class="relative w-full">
            <PasswordInput v-model="passInput" :is-error="error.includes('Password')" size="lg" placeholder="Пароль" />
            <div v-if="error.includes('Password')" class="absolute flex items-center gap-[5px] text-[12px] text-red-500 font-semibold top-[110%]">
              <Warning custom-size="w-[15px] h-[15px] fill-red-500"/>
              {{ error }}
            </div>
          </div>

          <div class="relative w-full">
            <Input v-model="passConfirmInput" :is-error="error.includes('PasswordMatch')"  size="lg" type="password" placeholder="Подтвердите пароль" />
            <div v-if="error.includes('PasswordMatch')" class="absolute flex items-center gap-[5px] text-[12px] text-red-500 font-semibold top-[110%]">
              <Warning custom-size="w-[15px] h-[15px] fill-red-500"/>
              {{ error }}
            </div>
          </div>

          <PrimaryButton @click="register" text="Зарегистрироваться" >
            <template v-if="processing" #spinner>
              <Spinner custom-class="text-gray-200 fill-purple-800" />
            </template>
          </PrimaryButton>
        </div>

        <div class="flex items-center gap-[20px] mt-[40px]">
          <span class="text-[14px] font-medium text-gray-7 dark:text-gray-5">Есть аккаунт?</span>
          <router-link to="/login" class="text-[14px] font-medium text-primary hover:text-purple-2 focus:outline-primary"
          >Войдите</router-link>
        </div>

      </div>
    </div>
  </guest-layout>
</template>
