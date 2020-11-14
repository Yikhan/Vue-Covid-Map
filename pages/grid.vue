<template>
  <div>
    <b-table
      responsive
      striped
      hover
      :busy="isBusy"
      :items="locations"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import dayjs from 'dayjs'
import { LocationData } from '~/utils/interface'

export default Vue.extend({
  name: 'Grid',

  async asyncData({ $axios }) {
    let isBusy: boolean = true
    let currentPage: number = 1
    let perPage: number = 25

    const locations: LocationData[] = await $axios.$get('/api/', {
      params: {
        page: currentPage,
        pageSize: perPage
      }
    })
    isBusy = false

    return {
      isBusy,
      locations,
    }
  },

  data() {
    return {
      isBusy: false,
      currentPage: 1,
      perPage: 25,
      locations: [] as LocationData[],
      fields: [
        {
          key: 'countryTerritoryCode',
          sortable: true,
        },
        {
          key: 'countryAndTerritory',
          sortable: true,
          formatter: (value: string) => {
            return value.replace(/_/g, ' ')
          },
        },
        {
          key: 'cases',
          sortable: true,
        },
        {
          key: 'deaths',
          sortable: true,
        },
        {
          key: 'cumulativeNumberFor14DaysPer100000',
          label: 'Cumlative Number For 14 Days Per Million',
          sortable: true,
          formatter: (value: string): string => {
            return parseFloat(value).toFixed(2)
          },
        },
        {
          key: 'dateReported',
          sortable: true,
          formatter: (value: string): string => {
            return dayjs(value).format('DD/MM/YYYY')
          },
        },
      ],
    }
  },

  computed: {
    rows(): number {
      return this.locations.length
    },
  },

  methods: {
    refreshData() {},
  },
})
</script>

<style lang='less'>
</style>