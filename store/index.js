import { SET_COUNTRY } from './types'

export const state = () => {
  return {
    country: {}
  }
}

export const mutations = {
  [SET_COUNTRY] (state, country) {
    state.country = country
  }
}

export const actions = {}
