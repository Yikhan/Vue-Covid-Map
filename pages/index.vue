<template>
  <div class="container">
    <GMap
      ref="gMap"
      language="en"
      :cluster="{ options: { styles: clusterStyles } }"
      :center="currentLocation"
      :options="{ styles: mapStyles }"
      :zoom="currentLocation.selected ? 4 : 1.5"
      class="map"
    >
      <GMapMarker
        v-for="country in countries"
        :key="country.countryTerritoryCode"
        :ref="country.countryTerritoryCode"
        :position="{ lat: country.lat, lng: country.lng }"
        :options="{
          label: {
            text: country.cases.toString(),
            color: 'White',
            fontWeight: 'bold',
          },
          icon: require('~/assets/virus.svg')
        }"
        @click="countrySelectHandler(country)"
        @mouseover="showInfoWindow"
        @mouseout="closeInfoWindow"
      >
        <GMapInfoWindow :options="{ maxWidth: 200 }">
          <h5>{{ country.countryAndTerritory | country }}</h5>
          <section>
            <p>
              <strong>Death: {{ country.deaths }}</strong>
            </p>
            <p>
              <strong>Date: {{ country.dateReported | formatDate }}</strong>
            </p>
          </section>
        </GMapInfoWindow>
      </GMapMarker>
    </GMap>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import { Context } from '@nuxt/types'
import { CountryData } from '~/utils/interface'
import useLocalStorage from '~/utils/useLocalStorage'
import mapStyles from '~/assets/styles/mapStyles'
import clusterStyles from '~/assets/styles/clusterStyles'

const storage = useLocalStorage()
const COUNTRY_KEY = 'country'

export default Vue.extend({
  name: 'Home',

  async asyncData({ $axios, route }: Context) {
    const countries: CountryData[] = await $axios.$get('/api/')
    return {
      countries,
    }
  },

  data() {
    return {
      countries: [] as CountryData[],
      country: {} as CountryData,
      currentLocation: { lat: 0, lng: 0 } as CountryData,
      mapStyles,
      clusterStyles
    }
  },

  methods: {
    ...mapMutations(['setCountry']),

    showInfoWindow(event: any) {
      const infoWindow = event.marker.infoWindow
      infoWindow.open(event.map, event.marker)
    },
    closeInfoWindow(event: any) {
      const infoWindow = event.marker.infoWindow
      infoWindow.close(event.map, event.marker)
    },
    countrySelectHandler(country: CountryData) {
      this.currentLocation = country
      this.setCountry(country)
      storage.setItem(COUNTRY_KEY, country)
      this.$router.push('/grid')
    },
    getCountryFromLocal() {
      this.country = storage.getItem(COUNTRY_KEY) as CountryData
      this.currentLocation = this.country
      this.currentLocation.selected = true
    },
  },

  mounted() {
    this.getCountryFromLocal()
    
  },
})
</script>

<style lang="less">
.container {
  display: flex;
  .map {
    flex: 1;
    max-width: 1980px;
    max-height: 1280px;
  }
}
</style>
