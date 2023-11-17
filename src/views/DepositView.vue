<template>
  <div class="text-center">
    <h2 class="text-lg font-semibold text-blue">
      Deposit to <span class="font-extra-bold">Your Account</span>
    </h2>

    <div
      class="text-red text-center w-max m-auto text-sm opacity-0"
      :class="{ 'opacity-100': depositError }"
    >
      {{ depositError }}&nbsp;
    </div>

    <form class="w-full lg:w-2/3 m-auto mt-5" @submit.prevent="onSubmit">
      <InputComponent
        v-model="cardNumber"
        placeholder="Credit Card Number"
        :error="errors.cardNumber"
        @blur="validate('cardNumber', cardNumber)"
        @input="onInput('cardNumber', cardNumber)"
        icon="credit-card-icon"
        autocomplete="off"
      ></InputComponent>

      <InputComponent
        v-model="cvv"
        placeholder="CVV"
        :error="errors.cvv"
        @blur="validate('cvv', cvv)"
        @input="onInput('cvv', cvv)"
        icon="hide-icon"
        autocomplete="off"
        class="mt-2.5"
      ></InputComponent>

      <InputComponent
        v-model="expiryDate"
        placeholder="Expiry Date (MM/YY)"
        :error="errors.expiryDate"
        @blur="validate('expiryDate', expiryDate)"
        @input="onInput('expiryDate', expiryDate)"
        icon="calendar-icon"
        autocomplete="off"
        class="mt-2.5"
      ></InputComponent>

      <PrimaryButtonComponent
        :disabled="isDepositDisabled"
        :loading="loading"
        type="submit"
        class="mt-7 w-full lg:min-w-60 lg:w-auto"
      >
        Deposit
      </PrimaryButtonComponent>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useValidation } from "@/composables/useValidation";
import InputComponent from "@/components/form/InputComponent.vue";
import PrimaryButtonComponent from "@/components/buttons/PrimaryButtonComponent.vue";
import { useStore } from "vuex";

const { errors, validate, clearValidation, validateAll } = useValidation();
const cardNumber = ref("");
const cvv = ref("");
const expiryDate = ref("");
const loading = ref(false);
const depositError = ref(null);
const store = useStore();

const isDepositDisabled = computed(() => {
  return !validateAll([cardNumber.value, cvv.value, expiryDate.value]);
});

const onInput = (field: string, value: string) => {
  depositError.value = null;
  if (value.trim() !== "") clearValidation(field);
};

const clearForm = () => {
  cardNumber.value = "";
  cvv.value = "";
  expiryDate.value = "";
};

const onSubmit = async () => {
  const isCardNumberValid = validate("cardNumber", cardNumber.value);
  const isCvvValid = validate("cvv", cvv.value);
  const isExpiryDateValid = validate("expiryDate", expiryDate.value);

  if (isCardNumberValid && isCvvValid && isExpiryDateValid) {
    loading.value = true;
    store
      .dispatch("payDeposit")
      .then(() => {
        loading.value = false;

        console.log("Deposit details:", {
          cardNumber: cardNumber.value,
          cvv: cvv.value,
          expiryDate: expiryDate.value,
        });

        clearForm();
        alert("Deposit successful!");
      })
      .catch((error) => {
        loading.value = false;
        alert("There was an issue.");
        console.log(error);
      });
  }
};
</script>
