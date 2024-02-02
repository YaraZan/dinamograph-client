<script setup>
import SingleDropdown from "@components/ui/dropdown/SingleDropdown.vue";
import axios from "axios";
import {encryptStorage} from "@/utils/storage.js";
import {onMounted, ref} from "vue";
import Sun from "@icons/filled/Sun.vue";
import Checked from "@icons/outline/Checked.vue";
import {PrimaryButton} from "@components/ui/index.js";
import ConfigVersionsSkeleton from "@components/ui/loading/skeleton/ConfigVersionsSkeleton.vue";

const API_KEY = import.meta.env.VITE_API_KEY
const DINAMOGRAPH_API_URL = import.meta.env.VITE_DINAMOGRAPH_API_URL
const token = encryptStorage.getItem('at')

const aiModels = ref([])
const currentAiModel = ref({})
const currentAiModelMarkers = ref([])
const processing = ref(false);

const getAllAiModels = () => {
  processing.value = true

  axios.get(`${DINAMOGRAPH_API_URL}/v1/ai/all`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .then(response => {
    aiModels.value = response.data.models;

    handleSelectAiModel(aiModels.value[0].public_id)
  })
  .catch(error => {
    processing.value = false;
  })
  .finally(() => {
    processing.value = false;
  })
}

const getMarkersByAiModel = (model_public_id) => {
  processing.value = true

  axios.get(`${DINAMOGRAPH_API_URL}/v1/marker/model/${model_public_id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .then(response => {
    currentAiModelMarkers.value = response.data;
  })
  .catch(error => {
    processing.value = false;
  })
  .finally(() => {
    processing.value = false;
  })
}

const handleSelectAiModel = (model_public_id) => {
  processing.value = true

  axios.get(`${DINAMOGRAPH_API_URL}/v1/ai/${model_public_id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .then(response => {
    currentAiModel.value = response.data;
    getMarkersByAiModel(currentAiModel.value.public_id)
  })
  .catch(error => {
    processing.value = false;
  })
  .finally(() => {
    processing.value = false;
  })
}

onMounted(() => {
  getAllAiModels()
})
</script>

<template>
  <div class="w-2/3 mx-auto flex min-h-screen pt-[150px] pb-[200px]">

    <div v-if="!processing" class="w-full justify-between flex">

      <div class="flex flex-col gap-[50px]">
        <div class="flex items-center gap-[20px]">
          <h3 class="text-[38px] font-black text-gray-800 dark:text-white uppercase">Динамограф</h3>
          <span class="text-[32px] font-normal text-gray-400">{{ currentAiModel.name }}</span>
        </div>
        <div class="flex flex-col gap-[20px] max-w-[600px] border border-gray-300 dark:border-stone-700 p-4 rounded-[20px]">
          <span class="text-[16px] text-gray-400 dark:text-stone-400 font-normal mb-[20px]">Конфигурация</span>

          <div class="flex justify-between">
            <span class="text-[16px] text-gray-400 font-normal">Кол-во эталонных динамограмм (Категорий)</span>
            <span class="text-[16px] text-gray-800 dark:text-white font-medium">{{ currentAiModel.categories_num }}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-[16px] text-gray-400 font-normal">Кол-во данных, использованных для обучения</span>
            <span class="text-[16px] text-gray-800 dark:text-white font-medium">{{ currentAiModel.train_amount }}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-[16px] text-gray-400 font-normal">Дата создания</span>
            <span class="text-[16px] text-gray-800 dark:text-white font-medium">{{ new Date(currentAiModel.created_at).toLocaleDateString() }}</span>
          </div>

        </div>
        <div class="max-w-[600px] flex flex-col gap-[10px] p-4 border border-gray-300 dark:border-stone-700 rounded-[20px]">
          <span class="text-[16px] text-gray-400 dark:text-stone-400 font-normal mb-[20px]">Данная версия может определять следующие неисправности в работе ШГН</span>
          <div v-for="(marker, index) in currentAiModelMarkers" :key="index"
               class="p-[5px] flex items-center gap-[20px]"
          >
            <img :src="`${DINAMOGRAPH_API_URL}/${marker.url}`" class="max-w-[80px] rounded-[10px]">
            <span class="max-w-[400px] break-words text-gray-800 text-[18px] dark:text-white font-semibold">{{ marker.name.split('_').join(' ') }}</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-[30px]">
        <div class="flex items-center gap-[10px]">
          <SingleDropdown text="Версия">
            <template #content>
              <div v-for="(aiModel, index) in aiModels" :key="index"
                   @click="handleSelectAiModel(aiModel.public_id)"
                   class="flex items-center gap-[15px] p-[10px] cursor-pointer hover:bg-gray-100 dark:hover:bg-stone-700 rounded-[10px]"
              >
                <span class="font-semibold text-gray-800 dark:text-white text-[16px]">{{ aiModel.name }}</span>
                <Checked v-if="currentAiModel.public_id === aiModel.public_id" custom-size="stroke-primary" class="w-[20px] h-[20px] ml-[auto]" />
              </div>
            </template>
          </SingleDropdown>
          <PrimaryButton :is-disabled="processing" size="xs" text="Новая"/>
        </div>
      </div>

    </div>

    <ConfigVersionsSkeleton v-else />
  </div>
</template>
