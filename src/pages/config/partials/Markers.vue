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

const deleteMarker = (marker_id) => {
  processingLoadData.value = true

  return axios.delete(`${DINAMOGRAPH_API_URL}/v1/marker/delete/${marker_id}`, {
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

const handleDeleteMarker = (marker_id) => {
  deleteMarker(marker_id)
      .then(() => {
        getAllMarkers()
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

    <div v-if="!processingLoadData && markers.length > 0" class="w-full grid grid-cols-5 gap-[20px] p-4">
      <div v-for="(marker, index) in markers"
           :key="index"
           class="flex flex-col shadow bg-white dark:bg-stone-900 rounded-[10px] p-4">
        <img :src="`${DINAMOGRAPH_API_URL}/${marker.url}`" class="w-full rounded-[10px]">
        <span class="h-full break-words font-medium p-2 text-[15px] text-gray-800 dark:text-white">{{ marker.name.split('_').join(' ') }}</span>
        <div class="flex items-center self-end">
          <Delete @click="handleDeleteMarker(marker.id)" />
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

    <Modal :show="openCreationModal" @close="closeModal">
      <div class="relative font-raleway w-[500px] p-4 flex-col flex gap-[50px]">
        <Spinner v-if="processingCreateMarker" class="absolute right-4 top-4"/>
        <div class="flex flex-col gap-4 w-full">
          <span class="text-[18px] font-semibold text-gray-500 dark:text-stone-400">Название маркера</span>
          <Input class="w-full" v-model="newMarker.name" :is-disabled="processingCreateMarker" placeholder="Введите название" size="md" />
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