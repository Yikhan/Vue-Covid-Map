<template>
  <div class="grid">
    <div class="table-container">
      <b-table
        responsive
        striped
        hover
        :busy="isBusy"
        :items="countries"
        :fields="fields"
        :per-page="perPage"
        :tbody-tr-class="rowClass"
        primary-key="countryTerritoryCode"
        id="table"
        class="table"
        ref="table"
      >
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
      </b-table>
    </div>
    <div class="pagination-container">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import dayjs from 'dayjs'
import { CountryData } from '~/utils/interface'
import { mapMutations, mapState } from 'vuex'

export default Vue.extend({
  name: 'Grid',

  async asyncData({ $axios, route, store }) {
    let isBusy: boolean = true
    let currentPage: number = 1
    let perPage: number = 212

    const countries: CountryData[] = await $axios.$get('/api/', {
      // params: {
      //   page: currentPage,
      //   pageSize: perPage,
      // },
    })
    isBusy = false

    // check if any country has been selected from map
    const country: CountryData = store.state.country

    return {
      isBusy,
      countries,
      country,
      currentPage,
      perPage
    }
  },

  mounted() {
    // jump to selected country
    console.log('country selected:', this.country)
    setTimeout(() => {
      this.scrollToRow(this.country)
    }, 500)
  },

  data() {
    return {
      isBusy: false,
      currentPage: null,
      perPage: null,
      country: {} as CountryData,
      countries: [] as CountryData[],
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
      return this.countries.length > 200 ? this.countries.length : 200
    },
  },

  methods: {
    async loadData() {
      this.isBusy = true
      this.countries = await this.$axios.$get('/api/', {
        params: {
          page: this.currentPage,
          pageSize: this.perPage,
        },
      })

      this.isBusy = false
    },
    scrollToRow(country: CountryData) {
      const rowId = `#table__row_${country.countryTerritoryCode}`
      // const testId = '#table__row_BGR'

      const table: any = this.$refs.table
      const tbody: any = table.$el.querySelector('tbody')
      const row: any = tbody.querySelector(rowId)
      if (row) {
        row.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      console.log('row find:', row)
    },
    rowClass(item: CountryData, type: string) {
      if (!item || type !== 'row') return
      if (!this.country) return

      if (
        (item.countryTerritoryCode &&
          item.countryTerritoryCode === this.country.countryTerritoryCode) ||
        (item.countryAndTerritory &&
          item.countryAndTerritory === this.country.countryAndTerritory)
      ) {
        return 'table-success'
      } else {
        return
      }
    },
  },

  watch: {
    currentPage() {
      this.loadData()
    },
  },
})
</script>

<style scoped lang='less'>
.grid {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.table-container {
  display: flex;
  flex: 1;
  width: 80%;

  .table {
    flex: 1;
  }
}
.pagination-container {
  flex: 1;
}
</style>