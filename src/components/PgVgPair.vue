<script setup>
const props = defineProps({
  pg: { type: Number, required: true },
  vg: { type: Number, required: true },
  pgLabel: { type: String, default: 'PG (%)' },
  vgLabel: { type: String, default: 'VG (%)' },
  /** When true, shorter stacked labels and no extra wrapper grid for batch cards */
  compact: { type: Boolean, default: false },
  /** When true, stack VG and PG vertically */
  vertical: { type: Boolean, default: false },
})

const emit = defineEmits(['update:pg', 'update:vg'])

const clamp = (n) => Math.min(100, Math.max(0, n))
const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100

const parseInput = (value) => {
  const parsed = parseFloat(String(value).trim())
  return Number.isFinite(parsed) ? parsed : 0
}

const onPgInput = (event) => {
  const next = round2(clamp(parseInput(event.target.value)))
  emit('update:pg', next)
  emit('update:vg', round2(100 - next))
}

const onVgInput = (event) => {
  const next = round2(clamp(parseInput(event.target.value)))
  emit('update:vg', next)
  emit('update:pg', round2(100 - next))
}
</script>

<template>
  <div class="pgvg-pair" :class="{ compact, vertical }">
    <label>
      {{ vgLabel }}
      <input
        :value="props.vg"
        type="number"
        min="0"
        max="100"
        step="0.1"
        placeholder="0-100"
        @input="onVgInput"
      />
    </label>
    <label>
      {{ pgLabel }}
      <input
        :value="props.pg"
        type="number"
        min="0"
        max="100"
        step="0.1"
        placeholder="0-100"
        @input="onPgInput"
      />
    </label>
  </div>
</template>

<style scoped>
.pgvg-pair {
  display: contents;
}

.pgvg-pair.compact {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.pgvg-pair.vertical {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.pgvg-pair.compact label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  min-width: 0;
}

.pgvg-pair.vertical label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.pgvg-pair.compact input {
  min-width: 0;
  font-size: var(--font-size-xs);
}
</style>
