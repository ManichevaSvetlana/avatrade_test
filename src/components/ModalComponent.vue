<template>
  <div class="fixed inset-0 flex items-center justify-center p-4">
    <div
      class="shadow-lg flex w-full mx-auto my-auto max-w-full h-screen lg:max-w-[60%] lg:h-auto min-h-4/5"
    >
      <div
        class="w-2/5 bg-blue-100 rounded-lg rounded-r-none hidden lg:block"
      ></div>
      <div
        class="w-full lg:w-3/5 bg-white p-6 flex flex-col justify-center overflow-auto relative"
      >
        <div
          class="absolute pointer top-4 right-3 text-gray hover:text-gray-500"
          id="logout-button"
          @click="logout"
          v-if="store.state.user.user.token"
        >
          Logout
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();

const logout = () => {
  store.dispatch("logout");
};
</script>
