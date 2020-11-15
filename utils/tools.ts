export const isCountry = (country: any): boolean => {
  if (country.countryTerritoryCode || country.countryAndTerritory) {
    return true
  } else {
    return false
  }
}

export const randomInt = (min: number, max: number): number => {
  let num = Math.random() * (max - min + 1) + min
  return Math.floor(num)
}

export const randomFloat = (min: number, max: number, digits: number = 6): number => {
  let num = Math.random() * (max - min + 1) + min
  return parseFloat(num.toFixed(digits))
}