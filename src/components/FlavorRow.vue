<script setup>
import PgVgPair from './PgVgPair.vue'

defineProps({
  flavor: { type: Object, required: true },
})

const emit = defineEmits(['remove'])
</script>

<template>
  <div class="flavor-row">
    <input v-model.trim="flavor.name" placeholder="Flavor concentrate name" />
    <input v-model.number="flavor.percent" type="number" min="0" max="100" step="0.1" placeholder="%" />
    <PgVgPair
      :pg="flavor.carrierPg"
      :vg="flavor.carrierVg"
      @update:pg="(v) => (flavor.carrierPg = v)"
      @update:vg="(v) => (flavor.carrierVg = v)"
      vg-label="VG %"
      pg-label="PG %"
      compact
    />
    <button type="button" class="danger" @click="emit('remove')">Remove</button>
  </div>
</template>

