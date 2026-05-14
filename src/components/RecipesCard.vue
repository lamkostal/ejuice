<script setup>
defineProps({
  recipeName: { type: String, required: true },
  recipes: { type: Array, required: true },
})

const emit = defineEmits(['update:recipeName', 'save', 'load', 'remove', 'record-use'])

const formatDate = (iso) => {
  try {
    const d = new Date(iso)
    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = d.getFullYear()
    return `${dd}/${mm}/${yyyy}`
  } catch {
    return iso
  }
}
</script>

<template>
  <section class="card">
    <h2>Saved Recipes</h2>
    <div class="recipe-save">
      <input
        :value="recipeName"
        placeholder="Recipe name"
        @input="emit('update:recipeName', $event.target.value)"
      />
      <button type="button" @click="emit('save')">Save Recipe</button>
    </div>
    <ul class="recipes">
      <li v-for="recipe in recipes" :key="recipe.name">
        <div class="recipe-row">
          <span class="recipe-name">{{ recipe.name }}</span>
          <div class="recipe-actions">
            <div class="actions-buttons">
              <button type="button" @click="emit('load', recipe.name)">Load</button>
              <button type="button" @click="emit('record-use', recipe.name)">Record Use</button>
              <button type="button" class="danger" @click="emit('remove', recipe.name)">Delete</button>
            </div>
            <ul class="used-dates" v-if="recipe.usedDates && recipe.usedDates.length">
              <li v-for="d in recipe.usedDates" :key="d">{{ formatDate(d) }}</li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>
