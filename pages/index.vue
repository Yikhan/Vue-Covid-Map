<template>
  <div class="container">
    <GMap
      ref="gMap"
      language="en"
      :cluster="{ options: { styles: clusterStyle } }"
      :center="center"
      :options="{ styles: mapStyle }"
      :zoom="1.5"
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
            color: 'Black',
            fontWeight: 'bold',
          },
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
              <strong> Date: {{ country.dateReported | formatDate }} </strong>
            </p>
          </section>
        </GMapInfoWindow>
      </GMapMarker>
    </GMap>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { CountryData } from '~/utils/interface'
import { mapMutations } from 'vuex'

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
      center: { lat: 0, lng: 0 },
      currentLocation: {},
      mapStyle: [],
      clusterStyle: [
        {
          url:
            'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m3.png',
          width: 56,
          height: 56,
          textColor: '#fff',
        },
      ],
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
    countrySelectHandler(country:CountryData) {
      this.currentLocation = country
      this.setCountry(country)
      this.$router.push('/grid')
    }
  },

  mounted() {},
})
</script>

<style lang="less">
.container {
  display: flex;
  .map {
    flex: 1;
    height: 450px;
    width: 800px;
  }
}
</style>
