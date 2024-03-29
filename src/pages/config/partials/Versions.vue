<script setup>
import SingleDropdown from "@components/ui/dropdown/SingleDropdown.vue";
import axios from "axios";
import {encryptStorage} from "@/utils/storage.js";
import {computed, onMounted, ref} from "vue";
import Sun from "@icons/filled/Sun.vue";
import Checked from "@icons/outline/Checked.vue";
import {PrimaryButton, Modal, Input} from "@components/ui/index.js";
import ConfigVersionsSkeleton from "@components/ui/loading/skeleton/ConfigVersionsSkeleton.vue";
import Range from "@components/ui/Range/Range.vue";
import Spinner from "@components/ui/loading/spinner/Spinner.vue";
import Edit from "@icons/outline/Edit.vue";
import Delete from "@icons/outline/Delete.vue";

const API_KEY = import.meta.env.VITE_API_KEY
const DINAMOGRAPH_API_URL = import.meta.env.VITE_DINAMOGRAPH_API_URL
const token = encryptStorage.getItem('at')

const aiModels = ref([])
const currentAiModel = ref({})
const currentAiModelMarkers = ref([])

const processingLoadData = ref(false)
const processingCreateAiModel = ref(false)
const processingUpdateAiModel = ref(false)

const openCreationModal = ref(false)

const newAiModel = ref({
    model_name: '',
    epochs: 35,
})

onMounted(() => {
  getAllAiModels()
  .then(() => {
    handleSelectAiModel(aiModels.value[0].public_id)
  })
})

const getAllAiModels = () => {
  processingLoadData.value = true

  return axios.get(`${DINAMOGRAPH_API_URL}/v1/ai/all`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .then(response => {
    aiModels.value = response.data.models;
  })
  .catch(error => {
    processingLoadData.value = false;
  })
  .finally(() => {
    processingLoadData.value = false;
  })
}

const getMarkersByAiModel = (model_public_id) => {
  processingLoadData.value = true

  return axios.get(`${DINAMOGRAPH_API_URL}/v1/marker/model/${model_public_id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .then(response => {
    currentAiModelMarkers.value = response.data;
  })
  .catch(error => {
    processingLoadData.value = false;
  })
  .finally(() => {
    processingLoadData.value = false;
  })
}

const getAiModel = (model_public_id) => {
  processingLoadData.value = true

  return axios.get(`${DINAMOGRAPH_API_URL}/v1/ai/${model_public_id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .then(response => {
    currentAiModel.value = response.data;
  })
  .catch(error => {
    processingLoadData.value = false;
  })
  .finally(() => {
    processingLoadData.value = false;
  })
}

const createAiModel = () => {
  processingCreateAiModel.value = true

  return axios.post(`${DINAMOGRAPH_API_URL}/v1/ai/create`, {
    model_name: newAiModel.value.model_name,
    epochs: newAiModel.value.epochs,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .then(response => {
    openCreationModal.value = false;
  })
  .catch(error => {
    processingCreateAiModel.value = false;
  })
  .finally(() => {
    processingCreateAiModel.value = false;
  })
}

const updateAiModel = (isVisible) => {
  processingUpdateAiModel.value = true

  return axios.put(`${DINAMOGRAPH_API_URL}/v1/ai/update`, {
    model_public_id: currentAiModel.value.public_id,
    is_public: isVisible,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .catch(error => {
    processingUpdateAiModel.value = false;
  })
  .finally(() => {
    processingUpdateAiModel.value = false;
  })
}

const deleteAiModel = () => {
  processingUpdateAiModel.value = true

  return axios.delete(`${DINAMOGRAPH_API_URL}/v1/ai/delete/${currentAiModel.value.public_id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .catch(error => {
    processingUpdateAiModel.value = false;
  })
  .finally(() => {
    processingUpdateAiModel.value = false;
  })
}

const handleUpdateAiModel = (isVisible) => {
  updateAiModel(isVisible)
  .then(() => {
    getAllAiModels()
      .then(() => {
        handleSelectAiModel(currentAiModel.value.public_id)
      })
  })
}

const handleDeleteAiModel = () => {
  deleteAiModel()
      .then(() => {
        getAllAiModels()
            .then(() => {
              handleSelectAiModel(aiModels.value[0].public_id)
            })
      })
}

const handleSelectAiModel = (model_public_id) => {
  getAiModel(model_public_id)
  .then(() => {
    getMarkersByAiModel(currentAiModel.value.public_id)
  })
}

const handleCreateAiModel = () => {
  createAiModel()
  .then(() => {
    getAllAiModels()
      .then(() => {
        handleSelectAiModel(aiModels.value[0].public_id)
      })
  })
}

const handleUpdateAiModelRange = (value) => {
  newAiModel.value.epochs = value
}

const closeModal = () => {
  openCreationModal.value = false;
};

</script>

<template>
  <div class="w-2/3 mx-auto flex min-h-screen pt-[150px] pb-[200px]">

    <div v-if="!processingLoadData" class="w-full justify-between flex p-4">

      <div v-if="!processingLoadData && aiModels.length > 0" class="flex flex-col gap-[40px]">

        <div class="flex items-center gap-[20px]">
          <h3 class="text-[38px] font-black text-gray-800 dark:text-white uppercase">Динамограф</h3>
          <span class="text-[24px] font-normal text-gray-400">{{ currentAiModel.name }}</span>
          <Delete @click="handleDeleteAiModel" />
        </div>

        <div class="flex flex-col gap-[20px]">
          <div class="w-full flex items-center gap-[50px]">
            <span class="text-[16px] text-gray-400 dark:text-stone-400 font-medium">Доступ</span>
            <div @click="handleUpdateAiModel(!currentAiModel.is_public)" class="flex items-center bg-gray-100 dark:bg-stone-900 rounded-[10px] gap-1 p-1">
              <div :class="{ 'bg-primary text-white dark:text-white' : !currentAiModel.is_public  }" class="transition-all text-[14px] text-gray-400 font-semibold
            cursor-pointer w-1/2 flex p-2 rounded-[10px] dark:text-stone-400">Приватный</div>
              <div :class="{ 'bg-primary text-white dark:text-white'  : currentAiModel.is_public  }" class="transition-all text-[14px] text-gray-400 font-semibold
            cursor-pointer w-1/2 flex p-2 rounded-[10px] dark:text-stone-400">Публичный</div>
            </div>
          </div>

          <div class="flex flex-col max-w-[600px] rounded-[20px] border border-gray-300 dark:border-gray-6">

            <div class="w-full p-[12px] flex items-center justify-between border-b border-gray-300 dark:border-gray-6">
              <span class="text-[16px] text-gray-400 dark:text-stone-400 font-normal">Эталонных динамограмм</span>
              <span class="text-[16px] text-gray-800 dark:text-white font-medium">{{ currentAiModel.categories_num }}</span>
            </div>

            <div class="w-full p-[12px] flex items-center justify-between border-b border-gray-300 dark:border-gray-6">
              <span class="text-[16px] text-gray-400 dark:text-stone-400 font-normal">Размер датасета</span>
              <span class="text-[16px] text-gray-800 dark:text-white font-medium">{{ currentAiModel.train_amount }}</span>
            </div>

            <div class="w-full p-[12px] flex items-center justify-between">
              <span class="text-[16px] text-gray-400 dark:text-stone-400 font-normal">Дата создания</span>
              <span class="text-[16px] text-gray-800 dark:text-white font-medium">{{ new Date(currentAiModel.created_at).toLocaleDateString() }}</span>
            </div>
          </div>
        </div>

        <div class="max-w-[600px] flex flex-col gap-[20px] rounded-[20px]">
          <span class="text-[16px] text-gray-400 dark:text-stone-400 font-medium">Распознаваемые неисправности в работе ШГН</span>
          <div class="rounded-[20px] border border-gray-300 dark:border-gray-6">
            <div v-for="(marker, index) in currentAiModelMarkers" :key="index"
                 class="w-full p-[12px] flex items-center gap-[20px]"
                 :class="{ 'border-b border-gray-300 dark:border-gray-6': index !== currentAiModelMarkers.length - 1 }"
            >
              <img :src="`${DINAMOGRAPH_API_URL}/${marker.url}`" class="max-w-[80px] rounded-[10px]">
              <span class="max-w-[400px] break-words text-gray-800 text-[18px] dark:text-white font-semibold">{{ marker.name.split('_').join(' ') }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="p-4">
        <span class="text-gray-400 dark:text-stone-400 font-semibold italic
              text-[20px]">Данных нет</span>
      </div>

      <div class="flex flex-col gap-[30px]">
        <div class="flex items-center gap-[10px]">
          <SingleDropdown v-if="aiModels.length > 0" text="Версия">
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
          <PrimaryButton @click="openCreationModal = !openCreationModal" :is-disabled="processingLoadData" size="xs" text="Новая"/>
        </div>
      </div>

    </div>

    <ConfigVersionsSkeleton v-else />

    <Modal :show="openCreationModal" @close="closeModal">
      <div class="relative font-raleway w-[500px] p-4 flex-col flex gap-[50px]">
        <Spinner v-if="processingCreateAiModel" class="absolute right-4 top-4"/>
        <div class="flex flex-col gap-4 w-full">
          <span class="text-[18px] font-semibold text-gray-500 dark:text-stone-400">Название модели</span>
          <Input class="w-full" v-model="newAiModel.model_name" :is-disabled="processingCreateAiModel" placeholder="Введите название" size="md" />
        </div>
        <Range :is-disabled="processingCreateAiModel" @update-value="handleUpdateAiModelRange" :model-value="newAiModel.epochs">
          <template #label>
            <div class="flex items-center gap-6">
              <span class="text-[18px] font-semibold text-gray-500 dark:text-stone-400">Эпохи</span>
              <code class="p-1 bg-gray-100 dark:bg-stone-700 text-gray-600 dark:text-stone-500 rounded-[5px]">{{ newAiModel.epochs }}</code>
            </div>
          </template>
        </Range>

        <PrimaryButton @click="handleCreateAiModel" class="w-full" :is-disabled="processingCreateAiModel" size="md" text="Создать"/>
      </div>
    </Modal>
  </div>
</template>
