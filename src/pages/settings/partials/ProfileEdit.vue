<script setup>
import {Input, PrimaryButton, SecondaryButton} from "@components/ui/index.js";
import {onMounted, ref} from "vue";
import axios from "axios";
import {encryptStorage} from "@/utils/storage.js";
import router from "@/routing/router.js";
import {ProfileEditSkeleton} from "@components/ui/loading/skeleton/index.js";

const nameInput = ref('')
const emailInput = ref('')

const processing = ref(false);
const DINAMOGRAPH_API_URL = import.meta.env.VITE_DINAMOGRAPH_API_URL
const token = encryptStorage.getItem('at')

const getUserDetails = () => {

  processing.value = true

  axios.get(`${DINAMOGRAPH_API_URL}/v1/user/me`, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
  })
  .then(response => {
    const res = response.data

    nameInput.value = res.name
    emailInput.value = res.email

  })
  .catch(e => {
    processing.value = false;
  })
  .finally(() => {
    processing.value = false;
  })
}

const logout = () => {
  encryptStorage.removeItem('at')
  encryptStorage.removeItem('ud')

  router.push({ name : 'home' })
}

onMounted(() => {
  getUserDetails()
})
</script>

<template>
  <div v-if="!processing" class="flex w-full flex-col gap-[40px]">

    <div class="flex flex-col gap-[5px]">
      <div class="flex items-center gap-[20px]">
        <h2 class="font-semibold text-[48px] text-gray-800 dark:text-white">Профиль</h2>
        <SecondaryButton @click="logout" size="xs" text="Выйти" />
      </div>
      <span class="font-normal text-[16px] text-gray-400">Данные аккаунта и пароль</span>
    </div>

    <div v-if="emailInput && nameInput" class="flex flex-col gap-[15px] max-w-[400px]">
      <div class="flex w-full items-center justify-between">
        <span class="font-normal text-[16px] text-gray-400">Имя</span>
        <Input :is-disabled="true" v-model="nameInput" size="md" placeholder="Имя"></Input>
      </div>
      <div class="flex w-full items-center justify-between">
        <span class="font-normal text-[16px] text-gray-400">Почта</span>
        <Input :is-disabled="true" v-model="emailInput" size="md" placeholder="Почта"></Input>
      </div>
    </div>

    <span v-else class="text-gray-400 font-semibold text-[16px] italic">Не удаётся загрузить данные</span>

  </div>

  <ProfileEditSkeleton v-else />
</template>
