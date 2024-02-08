<script setup>
import SingleDropdown from "@components/ui/dropdown/SingleDropdown.vue";
import Delete from "@icons/outline/Delete.vue";
import axios from "axios";
import {encryptStorage} from "@/utils/storage.js";
import {onMounted, ref} from "vue";

const API_KEY = import.meta.env.VITE_API_KEY
const DINAMOGRAPH_API_URL = import.meta.env.VITE_DINAMOGRAPH_API_URL
const token = encryptStorage.getItem('at')

const dnms = ref([])
const processingLoadData = ref(false);

const getAllDnms = () => {
  processingLoadData.value = true

  return axios.get(`${DINAMOGRAPH_API_URL}/v1/dnm/all`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .then(response => {
    dnms.value = response.data;
  })
  .catch(error => {
    processingLoadData.value = false;
  })
  .finally(() => {
    processingLoadData.value = false;
  })
}

const deleteDnm = (dnm_id) => {
  processingLoadData.value = true

  return axios.delete(`${DINAMOGRAPH_API_URL}/v1/dnm/delete/${dnm_id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
      .catch(error => {
        processingLoadData.value = false;
      })
      .finally(() => {
        processingLoadData.value = false;
      })
}

const handleDeleteDnm = (dnm_id) => {
  deleteDnm(dnm_id)
  .then(() => {
    getAllDnms()
  })
}

onMounted(() => {
  getAllDnms()
})

</script>

<template>
  <div class="w-2/3 mx-auto flex flex-col gap-[20px] min-h-screen pt-[150px] pb-[200px]">

    <div class="flex items-center gap-[10px] justify-between w-full p-4">
      <h3 class="text-[38px] font-black text-gray-800 dark:text-white uppercase">Датасеты</h3>
    </div>

    <div v-if="!processingLoadData && dnms.length > 0" class="w-full grid grid-cols-5 gap-4 p-4">
      <div v-for="(dnm, index) in dnms"
           :key="index"
           class="flex flex-col shadow bg-white dark:bg-stone-900 rounded-[10px] p-4 gap-2">
        <img :src="`${DINAMOGRAPH_API_URL}/${dnm.raw_url}`" class="w-full rounded-[10px]" tabindex="0">

        <code class="text-[18px] text-gray-800 dark:text-white font-semibold">{{ dnm.id }}</code>
        <span v-if="dnm.marker" class="text-[16px] text-primary font-normal">{{ dnm.marker.split('_').join(' ') }}</span>
        <span v-else class="text-[16px] text-red-400 font-normal">Не выбрано</span>
        <span class="text-[16px] text-gray-400 dark:text-stone-400 font-normal mt-auto">{{ dnm.author }}</span>
        <div class="flex items-center self-end">
          <Delete @click="handleDeleteDnm(dnm.id)" />
        </div>
      </div>
    </div>

    <div v-else-if="processingLoadData" class="w-full grid grid-cols-5 gap-[20px] p-4 animate-pulse">
      <div v-for="(item, index) in Array.apply(null, Array(25)).map(function () {})"
           :key="index"
           class="flex flex-col bg-gray-100 dark:bg-stone-900 rounded-[10px] p-4 h-[200px]">
      </div>
    </div>

    <div v-else class="p-4">
      <span class="text-gray-400 dark:text-stone-400 font-semibold italic
            text-[20px]">Данных нет</span>
    </div>


  </div>
</template>