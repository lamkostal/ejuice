<script setup>
const props = defineProps({
  form: { type: Object, required: true },
})

const round4 = (n) => Math.round((Number(n) + Number.EPSILON) * 10000) / 10000

const parseCost = (value) => {
  if (String(value).trim() === '') return ''
  const parsed = parseFloat(String(value).trim())
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0
}

const hasValue = (value) => value !== '' && value !== null && value !== undefined
const vgDisplayValue = () => (hasValue(props.form.vgCostPerMl) ? round4(props.form.vgCostPerMl * 1000) : '')
const pgDisplayValue = () => (hasValue(props.form.pgCostPerMl) ? round4(props.form.pgCostPerMl * 1000) : '')
const nicotineDisplayValue = () => (hasValue(props.form.nicotineCostPerMl) ? round4(props.form.nicotineCostPerMl * 10) : '')

const onVgCostInput = (event) => {
  const parsed = parseCost(event.target.value)
  props.form.vgCostPerMl = parsed === '' ? '' : parsed / 1000
}

const onPgCostInput = (event) => {
  const parsed = parseCost(event.target.value)
  props.form.pgCostPerMl = parsed === '' ? '' : parsed / 1000
}

const onNicotineCostInput = (event) => {
  const parsed = parseCost(event.target.value)
  props.form.nicotineCostPerMl = parsed === '' ? '' : parsed / 10
}
</script>

<template>
  <section class="card">
    <h2>Cost Inputs</h2>
    <div class="grid">
      <label>VG cost / L<input :value="vgDisplayValue()" type="number" min="0" step="0.01" placeholder="e.g. 15" @input="onVgCostInput" /></label>
      <label>PG cost / L<input :value="pgDisplayValue()" type="number" min="0" step="0.01" placeholder="e.g. 12" @input="onPgCostInput" /></label>
      <label>Nicotine cost / 10 ml<input :value="nicotineDisplayValue()" type="number" min="0" step="0.01" placeholder="e.g. 3.50" @input="onNicotineCostInput" /></label>
    </div>
    <div v-if="props.form.flavors?.length" class="flavor-costs">
      <h3>Flavor costs / 10 ml</h3>
      <div class="grid">
        <label v-for="(flavor, index) in props.form.flavors" :key="flavor.id">
          {{ flavor.name?.trim() || `Flavor ${index + 1}` }}
          <input v-model.number="flavor.costPer10Ml" type="number" min="0" step="0.01" placeholder="e.g. 1.50" />
        </label>
      </div>
    </div>
  </section>
</template>
