<script setup>
import PgVgPair from './PgVgPair.vue'

defineProps({
  form: { type: Object, required: true },
})
</script>

<template>
  <section class="card">
    <h2>Recipe Setup</h2>
    <div class="grid batch-volume">
      <label>Batch Size (ml)<input v-model.number="form.totalVolume" type="number" min="0" step="0.1" placeholder="e.g. 60" /></label>
    </div>

    <fieldset class="input-group">
      <legend>Target Mix</legend>
      <div class="one-col">
        <div>
          <label>Target Nicotine Strength (mg/ml)
            <input v-model.number="form.targetNicotine" type="number" min="0" step="0.1" placeholder="e.g. 3" />
          </label>
        </div>
        <div>
          <PgVgPair
            vertical
            :pg="form.targetPg"
            :vg="form.targetVg"
            @update:pg="(v) => (form.targetPg = v)"
            @update:vg="(v) => (form.targetVg = v)"
            vg-label="Target VG (%)"
            pg-label="Target PG (%)"
          />
        </div>
      </div>
    </fieldset>

    <fieldset class="input-group">
      <legend>Nicotine Base</legend>
      <div class="one-col">
        <div>
          <label>Nicotine Base Strength (mg/ml)
            <input v-model.number="form.nicotineBaseStrength" type="number" min="0" step="0.1" placeholder="e.g. 100" />
          </label>
        </div>
        <div>
          <PgVgPair
            vertical
            :pg="form.nicotineBasePg"
            :vg="form.nicotineBaseVg"
            @update:pg="(v) => (form.nicotineBasePg = v)"
            @update:vg="(v) => (form.nicotineBaseVg = v)"
            vg-label="Base VG (%)"
            pg-label="Base PG (%)"
          />
        </div>
      </div>
    </fieldset>
  </section>
</template>

<style scoped>
.batch-volume {
  margin-bottom: 14px;
}

.one-col {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  align-items: start;
}

.one-col label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
