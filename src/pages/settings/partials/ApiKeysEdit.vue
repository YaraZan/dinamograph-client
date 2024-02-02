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
import Spinner from "@components/ui/loading/spinner/Spinner.vue";

const apiKeys = ref([])

const error = ref('')

const processing = ref(false);
const loading = ref(false);
const DINAMOGRAPH_API_URL = import.meta.env.VITE_DINAMOGRAPH_API_URL
const token = encryptStorage.getItem('at')

const getUserApiKeys = () => {

  loading.value = true

  axios.get(`${DINAMOGRAPH_API_URL}/v1/api-key/`, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
  })
  .then(response => {
    apiKeys.value = response.data
  })
  .catch(e => {
    loading.value = false;
  })
  .finally(() => {
    loading.value = false;
  })
}

const createApiKey = () => {

  processing.value = true

  axios.post(`${DINAMOGRAPH_API_URL}/v1/api-key/`, {},{
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
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
      "Authorization": `Bearer ${token}`
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
  <div v-if="!loading" class="flex w-full flex-col gap-[40px]">

    <div class="flex flex-col gap-[5px]">
      <div class="flex items-center gap-[20px]">
        <h2 class="font-semibold text-[48px] text-gray-800 dark:text-white">API-ключи</h2>
        <div class="relative flex items-center">
          <PrimaryButton :is-disabled="processing" @click="createApiKey" size="xs" text="Новый"/>
          <div v-if="error" class="absolute flex items-center w-max gap-[5px] text-[12px] text-red-500 font-semibold left-[110%]">
            <Warning custom-size="w-[15px] h-[15px] fill-red-500"/>
            {{ error }}
          </div>
        </div>
        <Spinner v-if="processing" />
      </div>
      <span class="font-normal text-[16px] text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, reiciendis.</span>
    </div>

    <div v-if="apiKeys.length > 0" class="flex flex-col max-w-[400px] rounded-[20px] border border-gray-300 dark:border-gray-6">
      <div v-for="(apiKey, index) in apiKeys" :key="index"
           :class="{ 'border-b border-gray-300 dark:border-gray-6': index !== apiKeys.length - 1 }"
           class="w-full p-[12px] flex items-center justify-between">
        <code class="font-medium text-[16px] text-gray-800 dark:text-gray-300 max-w-[100px]">{{ Sugar.String.truncate(apiKey.key, 15) }}</code>
        <div class="flex items-center gap-[10px]">
          <CopyToClipboard :text-to-copy="apiKey.key"/>
          <Delete @click="deleteApiKey(apiKey.public_id)" custom-size="w-[20px] h-[20px]"/>
        </div>
      </div>
    </div>
    <span v-else class="text-gray-400 font-semibold text-[16px] italic">У вас ещё нет API-ключей</span>

  </div>

  <ApiKeysSkeleton v-else />
</template>
