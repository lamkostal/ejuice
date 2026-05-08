<script setup>
defineProps({
  result: { type: Object, required: true },
})
</script>

<template>
  <section class="card">
    <h2>Results</h2>
    <ul v-if="result.warnings.length" class="warnings">
      <li v-for="warning in result.warnings" :key="warning">{{ warning }}</li>
    </ul>
    <div class="results-table-wrap">
      <table class="results-table">
        <thead>
          <tr><th>Ingredient</th><th>ml</th><th>g</th><th>%</th><th>Cost</th></tr>
        </thead>
        <tbody>
          <tr v-for="ingredient in result.ingredients" :key="ingredient.key">
            <td>{{ ingredient.name }}</td>
            <td>{{ ingredient.ml.toFixed(2) }}</td>
            <td>{{ (ingredient.grams || 0).toFixed(2) }}</td>
            <td>{{ ingredient.percent.toFixed(2) }}</td>
            <td>{{ ingredient.cost.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="totals">
      <p>Total Flavor: {{ result.totals.flavorPercent.toFixed(2) }}%</p>
      <p>Total Weight: {{ (result.totals.grams || 0).toFixed(2) }} g</p>
      <p>Batch Cost: {{ result.totals.cost.toFixed(2) }}</p>
      <p>Cost/ml: {{ result.totals.costPerMl.toFixed(4) }}</p>
    </div>
  </section>
</template>
