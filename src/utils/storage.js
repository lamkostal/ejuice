const STORAGE_KEY = 'ejuice-recipes-v1'

export function getRecipes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveRecipe(recipe) {
  const recipes = getRecipes().filter((item) => item.name !== recipe.name)
  const next = [{ ...recipe, updatedAt: new Date().toISOString() }, ...recipes]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

export function deleteRecipe(name) {
  const next = getRecipes().filter((recipe) => recipe.name !== name)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

export function recordRecipeUse(name) {
  const recipes = getRecipes()
  const next = recipes.map((recipe) => {
    if (recipe.name !== name) return recipe
    const usedDates = Array.isArray(recipe.usedDates) ? [...recipe.usedDates] : []
    const nowIso = new Date().toISOString()
    const today = nowIso.slice(0, 10) // YYYY-MM-DD
    const alreadyRecorded = usedDates.some((d) => String(d).slice(0, 10) === today)
    if (alreadyRecorded) return recipe
    usedDates.unshift(nowIso)
    return { ...recipe, usedDates, updatedAt: nowIso }
  })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}
