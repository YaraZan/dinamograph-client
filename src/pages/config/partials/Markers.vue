<script setup>
import axios from "axios";
import {encryptStorage} from "@/utils/storage.js";
import {onMounted, ref} from "vue";
import {FileSelect, Input, Modal, PrimaryButton} from "@components/ui/index.js";
import Range from "@components/ui/Range/Range.vue";
import Spinner from "@components/ui/loading/spinner/Spinner.vue";
import Delete from "@icons/outline/Delete.vue";

const API_KEY = import.meta.env.VITE_API_KEY
const DINAMOGRAPH_API_URL = import.meta.env.VITE_DINAMOGRAPH_API_URL
const token = encryptStorage.getItem('at')

const markers = ref([])
const processingLoadData = ref(false);
const processingCreateMarker = ref(false);

const newMarker = ref({
  name: '',
  image: null,
})

const openCreationModal = ref(false)

const getAllMarkers = () => {
  processingLoadData.value = true

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
    processingLoadData.value = false;
  })
  .finally(() => {
    processingLoadData.value = false;
  })
}

const createNewMarker = () => {
  processingCreateMarker.value = true

  axios.post(`${DINAMOGRAPH_API_URL}/v1/marker/create`, {
    name: newMarker.value.name,
    image: newMarker.value.image,
  }, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    },
  })
  .then(response => {
    openCreationModal.value = false
    getAllMarkers()
  })
  .catch(error => {
    processingCreateMarker.value = false;
  })
  .finally(() => {
    processingCreateMarker.value = false;
  })
}

onMounted(() => {
  getAllMarkers()
})

const handleUpdateMarkerName = (value) => {
  newMarker.value.name = value
}

const handleSelectFile = (file) => {
  newMarker.value.image = file
}

const closeModal = () => {
  openCreationModal.value = false;
};
</script>

<template>
  <div class="w-2/3 mx-auto flex flex-col gap-[20px] min-h-screen pt-[150px] pb-[200px]">

    <div class="flex items-center gap-[20px] justify-between w-min p-4">
      <h3 class="text-[38px] font-black text-gray-800 dark:text-white uppercase">Маркеры</h3>
      <PrimaryButton @click="openCreationModal = !openCreationModal" :is-disabled="processingLoadData" size="xs" text="Новый"/>
    </div>

    <div class="w-full grid grid-cols-5 gap-[20px] p-4">
      <div v-for="(marker, index) in markers"
           :key="index"
           class="flex flex-col shadow bg-white dark:bg-stone-900 rounded-[10px] p-4">
        <img :src="`${DINAMOGRAPH_API_URL}/${marker.url}`" class="w-full rounded-[10px]">
        <span class="h-full break-words font-medium p-2 text-[15px] text-gray-800 dark:text-white">{{ marker.name.split('_').join(' ') }}</span>
        <div class="flex items-center self-end">
          <Delete />
        </div>
      </div>
    </div>

    <Modal :show="openCreationModal" @close="closeModal">
      <div class="relative font-raleway w-[500px] p-4 flex-col flex gap-[50px]">
        <Spinner v-if="processingCreateMarker" class="absolute right-4 top-4"/>
        <div class="flex flex-col gap-4 w-full">
          <span class="text-[18px] font-semibold text-gray-500 dark:text-stone-400">Название маркера</span>
          <Input class="w-full" @update-value="handleUpdateMarkerName" :is-disabled="processingCreateMarker" placeholder="Введите название" size="md" :model-value="newMarker.name" />
        </div>
        <div class="flex flex-col gap-4 w-full">
          <span class="text-[18px] font-semibold text-gray-500 dark:text-stone-400">Изображение</span>
          <FileSelect @select-image="handleSelectFile" />
        </div>

        <PrimaryButton @click="createNewMarker" class="w-full" :is-disabled="processingCreateMarker" size="md" text="Создать"/>
      </div>
    </Modal>
  </div>
</template>