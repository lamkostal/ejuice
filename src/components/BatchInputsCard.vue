<script setup>
import PgVgPair from './PgVgPair.vue'

defineProps({
  form: { type: Object, required: true },
})
</script>

<template>
  <section class="card">
    <h2>Batch Inputs</h2>
    <div class="grid batch-volume">
      <label>Total Volume (ml)<input v-model.number="form.totalVolume" type="number" min="0" step="0.1" placeholder="e.g. 60" /></label>
    </div>

    <fieldset class="input-group">
      <legend>Target</legend>
      <div class="grid">
        <label>Target Nicotine (mg/ml)<input v-model.number="form.targetNicotine" type="number" min="0" step="0.1" placeholder="e.g. 3" /></label>
        <PgVgPair
          :pg="form.targetPg"
          :vg="form.targetVg"
          @update:pg="(v) => (form.targetPg = v)"
          @update:vg="(v) => (form.targetVg = v)"
          vg-label="Target VG (%)"
          pg-label="Target PG (%)"
        />
      </div>
    </fieldset>

    <fieldset class="input-group">
      <legend>Nicotine base</legend>
      <div class="grid">
        <label>Nicotine Base Str (mg/ml)<input v-model.number="form.nicotineBaseStrength" type="number" min="0" step="0.1" placeholder="e.g. 100" /></label>
        <PgVgPair
          :pg="form.nicotineBasePg"
          :vg="form.nicotineBaseVg"
          @update:pg="(v) => (form.nicotineBasePg = v)"
          @update:vg="(v) => (form.nicotineBaseVg = v)"
          vg-label="Base VG (%)"
          pg-label="Base PG (%)"
        />
      </div>
    </fieldset>
  </section>
</template>

<style scoped>
.batch-volume {
  margin-bottom: 14px;
}
</style>
