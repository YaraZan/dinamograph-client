<script setup>
import {Input, PrimaryButton} from "@components/ui/index.js";
import {onMounted, ref} from "vue";
import axios from "axios";
import {encryptStorage} from "@/utils/storage.js";
import Copy from "@icons/outline/Copy.vue";
import Sugar from "sugar";
import Delete from "@icons/outline/Delete.vue";
import CopyToClipboard from "@components/ui/button/CopyToClipboard.vue";
import Warning from "@icons/filled/Warning.vue";
import {ApiKeysSkeleton} from "@components/ui/loading/skeleton/index.js";

const apiKeys = ref([])

const error = ref('')

const processing = ref(false);
const DINAMOGRAPH_API_URL = import.meta.env.VITE_DINAMOGRAPH_API_URL
const token = encryptStorage.getItem('token')

const getUserApiKeys = () => {

  processing.value = true

  axios.get(`${DINAMOGRAPH_API_URL}/v1/api-key/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .then(response => {
    apiKeys.value = response.data
  })
  .catch(e => {
    processing.value = false;
  })
  .finally(() => {
    processing.value = false;
  })
}

const createApiKey = () => {

  processing.value = true

  axios.post(`${DINAMOGRAPH_API_URL}/v1/api-key/`, {},{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .then(response => {
    getUserApiKeys()
  })
  .catch(e => {
    error.value = e.response.data.detail
    processing.value = false;

    setTimeout(() => {
      error.value = ''
    }, 4000)
  })
  .finally(() => {
    processing.value = false;
  })
}

const deleteApiKey = (key_public_id) => {

  processing.value = true

  axios.delete(`${DINAMOGRAPH_API_URL}/v1/api-key/${key_public_id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .then(response => {
    getUserApiKeys()
  })
  .catch(e => {
    error.value = e.response.data.detail
    processing.value = false;

    setTimeout(() => {
      error.value = ''
    }, 4000)
  })
  .finally(() => {
    processing.value = false;
  })
}

onMounted(() => {
  getUserApiKeys()
})
</script>

<template>
  <div v-if="!processing" class="flex w-full flex-col gap-[40px]">

    <div class="flex flex-col gap-[5px]">
      <div class="flex items-center gap-[20px]">
        <h2 class="font-semibold text-[48px] text-gray-800">API-ключи</h2>
        <div class="relative flex items-center">
          <PrimaryButton @click="createApiKey" size="xs" text="Новый"/>
          <div v-if="error" class="absolute flex items-center w-max gap-[5px] text-[12px] text-red-500 font-semibold left-[110%]">
            <Warning custom-size="w-[15px] h-[15px] fill-red-500"/>
            {{ error }}
          </div>
        </div>
      </div>
      <span class="font-normal text-[16px] text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, reiciendis.</span>
    </div>

    <div class="flex flex-col max-w-[400px] rounded-[20px] border border-gray-300">
      <div v-for="(apiKey, index) in apiKeys" :key="index"
           :class="{ 'border-b border-gray-300': index !== apiKeys.length - 1 }"
           class="w-full p-[12px] flex items-center justify-between">
        <span class="font-medium text-[16px] text-gray-800 max-w-[100px]">{{ Sugar.String.truncate(apiKey.key, 15) }}</span>
        <div class="flex items-center gap-[10px]">
          <CopyToClipboard :text-to-copy="apiKey.key"/>
          <Delete @click="deleteApiKey(apiKey.public_id)" custom-size="w-[20px] h-[20px]"/>
        </div>
      </div>
    </div>

  </div>

  <ApiKeysSkeleton v-else />
</template>
