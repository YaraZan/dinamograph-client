<script setup>
import GuestLayout from "@/layouts/GuestLayout.vue";
import {FileSelect, Input, Logo, PrimaryButton, SecondaryButton} from "@components/ui/index.js";
import Eye from "@icons/filled/Eye.vue";
import PasswordInput from "@components/ui/input/PasswordInput.vue";
import AuthorizedLayout from "@/layouts/AuthorizedLayout.vue";
import ProfileEdit from "@pages/settings/partials/ProfileEdit.vue";
import ApiKeysEdit from "@pages/settings/partials/ApiKeysEdit.vue";
import PreferencesEdit from "@pages/settings/partials/PreferencesEdit.vue";
</script>

<template>
  <authorized-layout>
    <div class="w-2/3 mx-auto flex flex-col gap-[100px] min-h-screen pt-[50px] pb-[200px]">

    <ProfileEdit />

    <ApiKeysEdit/>

    <PreferencesEdit/>

    </div>
  </authorized-layout>
</template>
