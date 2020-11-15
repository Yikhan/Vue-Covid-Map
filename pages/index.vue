<template>
  <div class="index-page">
    <div class="title">
      <h2>Covid-19 Data Map</h2>
    </div>

    <div class="container">
      <GMap
        ref="gMap"
        language="en"
        :cluster="{ options: { styles: clusterStyles } }"
        :center="currentLocation"
        :options="{ styles: mapStyles }"
        :zoom="currentLocation.modified ? 4 : 1.5"
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
          <GMapInfoWindow :options="{ maxWidth: 200 }" class="info">
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

    <div class="buttons">
      <b-button
        variant="success"
        @click="countryResetHandler"
        :disabled="resetButtonDisable"
      >Reset Selection</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import { Context } from '@nuxt/types'
import { CountryData } from '~/utils/interface'
import { getAllRecords } from '~/api'
import { isCountry } from '~/utils/tools'
import { SET_COUNTRY } from '~/store/types'
import useLocalStorage from '~/utils/useLocalStorage'
import mapStyles from '~/assets/styles/mapStyles'
import clusterStyles from '~/assets/styles/clusterStyles'

const storage = useLocalStorage()
const COUNTRY_KEY = 'country'

export default Vue.extend({
  name: 'Home',

  async asyncData({ $axios, route }: Context) {
    const countries: CountryData[] = await getAllRecords($axios)
    return {
      countries
    }
  },

  data() {
    return {
      countries: [] as CountryData[],
      country: {} as CountryData,
      currentLocation: { lat: 0, lng: 0, modified: false },
      mapStyles,
      clusterStyles
    }
  },

  computed: {
    resetButtonDisable(): boolean {
      return !this.currentLocation.modified
    }
  },

  methods: {
    ...mapMutations([SET_COUNTRY]),

    showInfoWindow(event: any) {
      const infoWindow = event.marker.infoWindow
      infoWindow.open(event.map, event.marker)
    },
    closeInfoWindow(event: any) {
      const infoWindow = event.marker.infoWindow
      infoWindow.close(event.map, event.marker)
    },
    getCountryFromLocal() {
      this.country = storage.getItem(COUNTRY_KEY) as CountryData

      if (isCountry(this.country)) {
        this.setCurrentLocation(this.country)
      }
    },
    setCurrentLocation(country: CountryData) {
      this.currentLocation.lat = country.lat
      this.currentLocation.lng = country.lng
      this.currentLocation.modified = true
    },
    // event handler functions
    countrySelectHandler(country: CountryData) {
      country.selected = true
      this.setCurrentLocation(country)
      this[SET_COUNTRY](country)
      storage.setItem(COUNTRY_KEY, country)
      this.$router.push('/grid')
    },
    countryResetHandler() {
      storage.removeItem(COUNTRY_KEY)

      // remove country from store
      if (isCountry(this.country)) {
        this[SET_COUNTRY]({})
      }

      this.currentLocation = {
        lat: 0,
        lng: 0,
        modified: false
      }
    }
  },

  mounted() {
    this.getCountryFromLocal()
  }
})
</script>

<style lang="less" scoped>
.index-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Goldman', cursive;
  .title {
    flex: 1;
    margin: 50px auto;
  }
  .info {
    font-family: 'Goldman', cursive;
  }
}
.container {
  display: flex;
  .map {
    flex: 1;
    max-width: 1980px;
    max-height: 1280px;
  }
}
.buttons {
  flex: 1;
  margin: 20px auto;
}
</style>
