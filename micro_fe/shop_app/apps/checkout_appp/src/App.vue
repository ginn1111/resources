<script setup>
import '@repo/configs/tailwind.global.css';
import '../public/assets/style.css';

import { computed } from 'vue';
import { useUnit } from 'effector-vue/composition';
import { $store } from 'shared_store/store';

const store = useUnit($store);
const intl = new Intl.NumberFormat();

const total = computed(() =>
  store.value.cart.reduce(
    (total, { amount, price }) => price.replace(/\D/, '') * amount + total,
    0
  )
);
</script>
<template>
  <div class="pt-9 px-2 pb-1 flex flex-col h-full">
    <ul class="space-y-1 flex-1 h-full">
      <li class="flex gap-2" v-for="item in store.cart" :key="item.id">
        <div class="w-20">
          <img :src="item.image" class="block w-full h-full" />
        </div>
        <div>
          <p class="font-medium">
            {{ item.title }}
          </p>
          <p>${{ intl.format(item.price.replace(/\D/, '') * item.amount) }}</p>
        </div>
      </li>
    </ul>
    <p class="text-red-400 mt-auto">Total: ${{ intl.format(total) }}</p>
  </div>
</template>
