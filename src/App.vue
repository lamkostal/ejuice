<script setup>
import { computed, reactive, ref } from 'vue'
import DisclaimerModal from './components/DisclaimerModal.vue'
import BatchInputsCard from './components/BatchInputsCard.vue'
import CostInputsCard from './components/CostInputsCard.vue'
import FlavorsCard from './components/FlavorsCard.vue'
import RecipesCard from './components/RecipesCard.vue'
import ResultsCard from './components/ResultsCard.vue'
import { calculateMix } from './utils/calculations'
import { deleteRecipe, getRecipes, saveRecipe, recordRecipeUse } from './utils/storage'
import logo from './assets/droplet-logo.svg'

const createFlavor = () => ({
  id: crypto.randomUUID(),
  name: '',
  percent: '',
  carrierPg: '',
  carrierVg: '',
  costPer10Ml: '',
})

const form = reactive({
  totalVolume: '',
  targetNicotine: '',
  nicotineBaseStrength: '',
  targetPg: '',
  targetVg: '',
  nicotineBasePg: '',
  nicotineBaseVg: '',
  nicotineCostPerMl: '',
  pgCostPerMl: '',
  vgCostPerMl: '',
  flavors: [],
})

const recipeName = ref('')
const recipes = ref(getRecipes())
const activeRecipe = ref('')
const showDisclaimer = ref(false)

const result = computed(() => calculateMix(form))

const addFlavor = () => form.flavors.push(createFlavor())
const removeFlavor = (id) => {
  form.flavors = form.flavors.filter((flavor) => flavor.id !== id)
}

const saveCurrentRecipe = () => {
  const name = recipeName.value.trim()
  if (!name) return
  recipes.value = saveRecipe({
    name,
    formData: JSON.parse(JSON.stringify(form)),
  })
  recipeName.value = ''
}

const loadRecipe = (name) => {
  const selected = recipes.value.find((recipe) => recipe.name === name)
  if (!selected) return
  Object.assign(form, selected.formData)
  activeRecipe.value = selected.name
}

const removeRecipe = (name) => {
  recipes.value = deleteRecipe(name)
  if (activeRecipe.value === name) activeRecipe.value = ''
}

const recordUse = (name) => {
  recipes.value = recordRecipeUse(name)
}

const onRecipeNameInput = (value) => {
  recipeName.value = value
}
</script>

<template>
  <main class="container">
    <h1 class="app-title">
      <img :src="logo" alt="eJuice logo" class="logo" />
      e-Liquid Recipe Calculator
    </h1>
    <p class="sub">Calculate vape juice ingredients, PG/VG ratio, nicotine strength, flavor percentages, and batch cost in one simple recipe tool.</p>

    <div class="layout">
      <button class="info-btn" aria-label="Disclaimer" @click="showDisclaimer = true">i</button>
      <div class="layout__left">
        <BatchInputsCard :form="form" />
        <FlavorsCard :flavors="form.flavors" @add="addFlavor" @remove="removeFlavor" />
        <CostInputsCard :form="form" />
      </div>
      <div class="layout__right">
        <ResultsCard :result="result" />
        <RecipesCard
          :recipe-name="recipeName"
          :recipes="recipes"
          @update:recipe-name="onRecipeNameInput"
          @save="saveCurrentRecipe"
          @load="loadRecipe"
            @remove="removeRecipe"
            @record-use="recordUse"
        />
      </div>
    </div>
    <DisclaimerModal :open="showDisclaimer" @close="showDisclaimer = false" />
  </main>
</template>

<style scoped>
.app-title{display:flex;align-items:center;gap:.5rem;font-size:1.75rem}
.logo{width:40px;height:auto;display:inline-block}
</style>
