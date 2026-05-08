<script setup>
import { watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])

const onBackground = (e) => {
  if (e.target === e.currentTarget) emit('close')
}

watch(() => props.open, (v) => {
  if (v) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = ''
})
</script>

<template>
  <div v-if="open" class="modal-backdrop" @click="onBackground">
    <div class="modal-card">
      <header class="modal-header">
        <h3>Disclaimer & Safety Notice</h3>
        <button class="modal-close" @click="$emit('close')">✕</button>
      </header>
      <div class="modal-body">
        <p>These calculator is provided "as is" for informational purposes only. I strive for accuracy but make no guarantees—use results at your own risk. No warranties, express or implied, are provided, and I am not liable for any damages arising from use or misuse.</p>

        <h4>Safety</h4>
        <ul>
          <li>Double-check all calculations before use and assume personal responsibility for verification.</li>
          <li>Nicotine is toxic at high concentrations; handle concentrated nicotine with extreme care and appropriate protection.</li>
          <li>Lithium-ion batteries can be hazardous—learn battery safety, respect amp limits, and inspect equipment before use.</li>
          <li>After building coils, always measure resistance before firing and ensure battery compatibility.</li>
          <li>Not all flavorings safe to eat are safe to inhale—research health effects of any agents you use.</li>
        </ul>

        <p>If unsure, consult multiple sources or seek professional advice.</p>
      </div>
      <footer class="modal-footer">
        <button @click="$emit('close')">Close</button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(2,6,23,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
  padding: 20px;
}
.modal-card {
  background: #ffffff;
  color: #021739;
  border-radius: 10px;
  max-width: 720px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(2,6,23,0.2);
  overflow: hidden;
}
.modal-header { display:flex; align-items:center; justify-content:space-between; padding:16px 20px; border-bottom:1px solid #eee }
.modal-header h3 { margin:0; font-size:1rem }
.modal-close { background:transparent;border:0;font-size:1.1rem;cursor:pointer }
.modal-body { padding:16px 20px; max-height:60vh; overflow:auto; font-size:0.95rem; line-height:1.4 }
.modal-body h4 { margin-top:0.5rem }
.modal-body ul { margin:0.5rem 0 1rem 1.1rem }
.modal-footer { padding:12px 20px; border-top:1px solid #eee; display:flex; justify-content:flex-end }
.modal-footer button { background:#2a2394; color:#fff; border-radius:6px; padding:8px 12px }
</style>
