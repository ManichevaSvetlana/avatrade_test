<template>
  <div class="text-center">
    <h2 class="text-lg font-semibold text-blue">
      Login to <span class="font-extra-bold">Avatrade</span>
    </h2>

    <div
      class="text-red text-center w-max m-auto text-sm opacity-0"
      :class="{ 'opacity-100': loginError }"
    >
      {{ loginError }}&nbsp;
    </div>

    <form class="w-full lg:w-2/3 m-auto mt-5" @submit.prevent="onSubmit">
      <InputComponent
        v-model="email"
        placeholder="Email"
        icon="email-icon"
        autocomplete="current-email"
        :error="errors.email"
        @blur="validate('email', email)"
        @input="onInput('email', email)"
      ></InputComponent>

      <PasswordInputComponent
        v-model="password"
        placeholder="Password"
        icon="key-icon"
        class="mt-2.5"
        :error="errors.password"
        @blur="validate('password', password)"
        @input="onInput('password', password)"
      ></PasswordInputComponent>

      <PrimaryButtonComponent
        :disabled="isLoginDisabled"
        :loading="loading"
        type="submit"
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
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useValidation } from "@/composables/useValidation";
import InputComponent from "@/components/form/InputComponent.vue";
import PasswordInputComponent from "@/components/form/PasswordInputComponent.vue";
import PrimaryButtonComponent from "@/components/buttons/PrimaryButtonComponent.vue";
import CircleButtonIconComponent from "@/components/buttons/CircleButtonIconComponent.vue";

const { errors, validate, clearValidation, validateAll } = useValidation();
const email = ref("");
const password = ref("");
const loading = ref(false);
const loginError = ref(null);
const store = useStore();
const router = useRouter();

const isLoginDisabled = computed(() => {
  return !validateAll([email.value, password.value]);
});

const onInput = (field: string, value: string) => {
  loginError.value = null;
  if (value.trim() !== "") clearValidation(field);
};

const onSubmit = async () => {
  const isEmailValid = validate("email", email.value);
  const isPasswordValid = validate("password", password.value);

  if (isEmailValid && isPasswordValid) {
    loading.value = true;
    store
      .dispatch("login", {
        email: email.value,
        password: password.value,
      })
      .then(() => {
        loading.value = false;
        router.push("/deposit");
      })
      .catch((error) => {
        loading.value = false;
        loginError.value = error;
        console.log(error);
      });
  }
};
</script>
