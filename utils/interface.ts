export interface CountryData {
  lat: number
  lng: number
  cases: string
  countryTerritoryCode: string
  countryAndTerritory: string
  dateReported: string | Date
  selected?: boolean
}

