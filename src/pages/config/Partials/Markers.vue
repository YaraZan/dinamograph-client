<script setup>
import axios from "axios";
import {encryptStorage} from "@/utils/storage.js";
import {onMounted, ref} from "vue";

const API_KEY = import.meta.env.VITE_API_KEY
const DINAMOGRAPH_API_URL = import.meta.env.VITE_DINAMOGRAPH_API_URL

const markers = ref([])
const processing = ref(false);

const getAllMarkers = (model_public_id) => {
  processing.value = true

  axios.get(`${DINAMOGRAPH_API_URL}/v1/marker/all`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${API_KEY}`
    },
  })
  .then(response => {
    markers.value = response.data;
  })
  .catch(error => {
    processing.value = false;
  })
  .finally(() => {
    processing.value = false;
  })
}

onMounted(() => {
  getAllMarkers()
})
</script>

<template>
  <div class="w-2/3 mx-auto flex flex-col gap-[50px] min-h-screen pt-[150px] pb-[200px]">

    <div class="flex items-center gap-[10px] justify-between w-full">
      <h3 class="text-[38px] font-black text-gray-800 dark:text-white uppercase">Маркеры</h3>
    </div>

    <div class="w-full grid grid-cols-5 gap-[20px]">
      <div v-for="(marker, index) in markers"
           :key="index"
           class="flex flex-col shadow-lg bg-white dark:bg-stone-800 rounded-[10px]">
        <img :src="`${DINAMOGRAPH_API_URL}/${marker.url}`" class="w-full h-full rounded-[10px]">
        <span class="h-full break-words font-medium p-2 text-[15px] text-gray-800 dark:text-white">{{ marker.name.split('_').join(' ') }}</span>
      </div>
    </div>

  </div>
</template>