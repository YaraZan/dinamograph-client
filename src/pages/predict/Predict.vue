<script setup>
import {FileSelect, Input, Logo, PrimaryButton, SecondaryButton} from "@components/ui/index.js";
import AuthorizedLayout from "@/layouts/AuthorizedLayout.vue";
import axios from 'axios';
import {computed, ref} from "vue";

const API_KEY = import.meta.env.VITE_API_KEY
const DINAMOGRAPH_API_URL = import.meta.env.VITE_DINAMOGRAPH_API_URL

const predictionText = ref('');
const selectedImage = ref(null);
const processing = ref(false);

const predictByImage = () => {
  processing.value = true

  axios.post(`${DINAMOGRAPH_API_URL}/v1/ai/predict`, {
    image: selectedImage.value,
    model_name: 'd_v1'
  }, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Basic ${API_KEY}`
    },
  })
  .then(response => {
    const res = response.data

    predictionText.value = `Нейросеть думает, что на данной динамограмме - ${res.split('_').join(' ')}`
  })
  .catch(error => {
    processing.value = false;
  })
  .finally(() => {
    processing.value = false;
  })
}

const handleSelectImage = (file) => {
  selectedImage.value = file;
};


</script>

<template>
  <authorized-layout>
  <div class="w-2/3 mx-auto flex flex-col justify-between min-h-screen pb-[50px]">
    <div class="w-full self-center mt-[400px]">


      <div class="flex items-start gap-[20px]">
        <div class="flex p-4 items-center justify-center rounded-[20px] bg-white shadow-lg">
          <Logo size="md" />
        </div>
        <span v-if="predictionText"
              class="text-[32px] pt-4 overflow-hidden text-gray-9 font-semibold"
        >{{predictionText}}</span>
        <span v-else-if="processing"
              class="text-[32px] pt-4 overflow-hidden text-gray-9 font-semibold"
        >...</span>
        <span v-else class="text-[32px] pt-4 overflow-hidden text-gray-9 font-semibold"
        >Выберите изображение ниже для анализа</span>
      </div>

    </div>

    <div class="flex w-full items-center justify-between rounded-2xl border border-gray-300 p-4">
      <FileSelect @select-image="handleSelectImage" />
      <PrimaryButton @click="predictByImage" custom-styles="" text="Отправить" />
    </div>

  </div>
  </authorized-layout>
</template>
