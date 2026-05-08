<script setup>
import FlavorRow from './FlavorRow.vue'

defineProps({
  flavors: { type: Array, required: true },
})

const emit = defineEmits(['add', 'remove'])
</script>

<template>
  <section class="card">
    <div class="header-row">
      <h2>Flavor Concentrates</h2>
      <div class="header-row__actions">
        <button type="button" @click="emit('add')">Add Flavor</button>
      </div>
    </div>
    <div>
      <FlavorRow v-for="flavor in flavors" :key="flavor.id" :flavor="flavor" @remove="emit('remove', flavor.id)" />
    </div>
  </section>
</template>
