const round = (value, decimals = 2) => {
  const factor = 10 ** decimals
  return Math.round((Number(value) + Number.EPSILON) * factor) / factor
}

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export function calculateMix(input) {
  const warnings = []
  const totalVolume = toNumber(input.totalVolume)
  const targetNicotine = toNumber(input.targetNicotine)
  const nicotineBaseStrength = toNumber(input.nicotineBaseStrength)
  const targetPg = toNumber(input.targetPg)
  const targetVg = toNumber(input.targetVg)
  const nicotineBasePg = toNumber(input.nicotineBasePg)
  const nicotineBaseVg = toNumber(input.nicotineBaseVg)

  if (totalVolume <= 0) {
    return {
      warnings: ['Total volume must be greater than 0 ml.'],
      ingredients: [],
      totals: { ml: 0, flavorPercent: 0, cost: 0, costPerMl: 0 },
    }
  }

  if (Math.abs(targetPg + targetVg - 100) > 0.01) {
    warnings.push('VG and PG targets should add up to 100%.')
  }

  if (Math.abs(nicotineBasePg + nicotineBaseVg - 100) > 0.01) {
    warnings.push('Nicotine base VG/PG carrier should add up to 100%.')
  }

  let nicotineMl = 0
  if (targetNicotine > 0) {
    if (nicotineBaseStrength <= 0) {
      warnings.push('Nicotine base strength must be greater than 0 when target nicotine is used.')
    } else {
      nicotineMl = (totalVolume * targetNicotine) / nicotineBaseStrength
    }
  }

  const flavors = (input.flavors || []).map((flavor) => {
    const percent = toNumber(flavor.percent)
    const ml = (totalVolume * percent) / 100
    const costPer10Ml = toNumber(flavor.costPer10Ml)
    return {
      id: flavor.id,
      name: flavor.name || 'Flavor',
      percent,
      carrierPg: toNumber(flavor.carrierPg, 100),
      carrierVg: toNumber(flavor.carrierVg, 0),
      costPer10Ml,
      ml,
    }
  })

  const totalFlavorPercent = flavors.reduce((sum, flavor) => sum + flavor.percent, 0)
  if (totalFlavorPercent > 100) {
    warnings.push('Total flavor percentage is greater than 100%.')
  }

  const pgFromNicotine = nicotineMl * (nicotineBasePg / 100)
  const vgFromNicotine = nicotineMl * (nicotineBaseVg / 100)
  const pgFromFlavor = flavors.reduce((sum, flavor) => sum + flavor.ml * (flavor.carrierPg / 100), 0)
  const vgFromFlavor = flavors.reduce((sum, flavor) => sum + flavor.ml * (flavor.carrierVg / 100), 0)

  const targetPgMl = totalVolume * (targetPg / 100)
  const targetVgMl = totalVolume * (targetVg / 100)

  const pgMl = targetPgMl - pgFromNicotine - pgFromFlavor
  const vgMl = targetVgMl - vgFromNicotine - vgFromFlavor

  if (pgMl < -0.01 || vgMl < -0.01) {
    warnings.push('Target VG/PG ratio cannot be achieved with current nicotine/flavor settings.')
  }

  const nicotineCostPerMl = toNumber(input.nicotineCostPerMl)
  const pgCostPerMl = toNumber(input.pgCostPerMl)
  const vgCostPerMl = toNumber(input.vgCostPerMl)

  const ingredients = [
    { key: 'nicotine', name: 'Nicotine Base', ml: nicotineMl, cost: nicotineMl * nicotineCostPerMl },
    { key: 'vg', name: 'VG', ml: Math.max(0, vgMl), cost: Math.max(0, vgMl) * vgCostPerMl },
    { key: 'pg', name: 'PG', ml: Math.max(0, pgMl), cost: Math.max(0, pgMl) * pgCostPerMl },
    ...flavors.map((flavor) => ({
      key: flavor.id,
      name: flavor.name,
      ml: flavor.ml,
      cost: flavor.ml * (flavor.costPer10Ml / 10),
    })),
  ]

  const totalMl = ingredients.reduce((sum, ingredient) => sum + ingredient.ml, 0)
  const totalCost = ingredients.reduce((sum, ingredient) => sum + ingredient.cost, 0)

  return {
    warnings,
    ingredients: ingredients.map((ingredient) => ({
      ...ingredient,
      ml: round(ingredient.ml),
      percent: totalVolume > 0 ? round((ingredient.ml / totalVolume) * 100) : 0,
      cost: round(ingredient.cost),
    })),
    totals: {
      ml: round(totalMl),
      flavorPercent: round(totalFlavorPercent),
      cost: round(totalCost),
      costPerMl: totalVolume > 0 ? round(totalCost / totalVolume, 4) : 0,
    },
  }
}
