export const isCountry = (country: any): boolean => {
  if (country.countryTerritoryCode || country.countryAndTerritory) {
    return true
  } else {
    return false
  }
}