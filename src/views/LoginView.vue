<template>
  <div class="text-center text-blue">
    <h2 class="text-lg font-semibold">
      Login to <span class="font-extra-bold">Avatrade</span>
    </h2>
    <form class="w-full lg:w-2/3 m-auto mt-12">
      <InputComponent
        v-model="email"
        placeholder="Email"
        icon="email-icon"
      ></InputComponent>

      <PasswordInputComponent
        v-model="password"
        placeholder="Password"
        icon="key-icon"
        class="mt-7"
      ></PasswordInputComponent>

      <PrimaryButtonComponent
        @click="login"
        :disabled="true"
        class="mt-7 w-full lg:min-w-60 lg:w-auto"
      >
        Login
      </PrimaryButtonComponent>

      <div class="mt-12 flex flex-col items-center">
        <div class="relative w-full flex justify-center">
          <div
            class="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <hr class="w-full border border-sm border-gray" />
          </div>
          <span
            class="relative bg-white px-2 text-base font-semibold text-gray-500 z-10"
            >Or</span
          >
        </div>

        <div class="flex justify-center items-center gap-4 mt-7">
          <CircleButtonIconComponent icon="google-icon" />
          <CircleButtonIconComponent icon="facebook-icon" />
          <CircleButtonIconComponent icon="apple-icon" />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import InputComponent from "@/components/form/InputComponent.vue";
import PasswordInputComponent from "@/components/form/PasswordInputComponent.vue";
import PrimaryButtonComponent from "@/components/buttons/PrimaryButtonComponent.vue";
import CircleButtonIconComponent from "@/components/buttons/CircleButtonIconComponent.vue";

const email = ref("");
const password = ref("");

watch(password, (newValue) => {
  console.log("password", newValue);
});
const store = useStore();
const router = useRouter();

const login = async () => {
  try {
    await store.dispatch("user/login", {
      email: email.value,
      password: password.value,
    });
    router.push("/deposit"); // TODO: Redirect to deposit page after successful login
  } catch (err) {
    console.log(err);
  }
};
</script>
