<script setup>
defineProps({
  recipeName: { type: String, required: true },
  recipes: { type: Array, required: true },
})

const emit = defineEmits(['update:recipeName', 'save', 'load', 'remove'])
</script>

<template>
  <section class="card">
    <h2>Recipes</h2>
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
        <span>{{ recipe.name }}</span>
        <div>
          <button type="button" @click="emit('load', recipe.name)">Load</button>
          <button type="button" class="danger" @click="emit('remove', recipe.name)">Delete</button>
        </div>
      </li>
    </ul>
  </section>
</template>
