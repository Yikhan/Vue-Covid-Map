export interface CountryData {
  lat: number | string
  lng: number | string
  cases: number | string
  deaths: number | string
  cumulativeNumberFor14DaysPer100000: number | string
  countryTerritoryCode: string
  countryAndTerritory: string
  dateReported: string | Date
  selected?: boolean
}

