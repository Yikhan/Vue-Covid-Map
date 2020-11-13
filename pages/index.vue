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
        v-for="location in locations"
        :key="location.countryTerritoryCode"
        :ref="location.countryTerritoryCode"
        :position="{ lat: location.lat, lng: location.lng }"
        :options="{ label: location.cases.toString() }"
        @click="currentLocation = location"
        @mouseover="showInfoWindow"
        @mouseout="closeInfoWindow"
      >
        <GMapInfoWindow
          :options="{ maxWidth: 200 }"
        >
          <h5>{{ location.countryAndTerritory }}</h5>
          <section>
            <p>Death: {{ location.deaths }}</p>
            <p>
              Date: {{ `${location.day}-${location.month}-${location.year}` }}
            </p>
          </section>
        </GMapInfoWindow>
      </GMapMarker>
    </GMap>
  </div>
</template>

<script lang="ts">
import '@nuxtjs/axios'
import { Context } from '@nuxt/types'
import Vue from 'vue'

interface LocationData {
  lat: number
  lng: number
  cases: string
  countryTerritoryCode: string
}

export default Vue.extend({
  name: 'Home',

  async asyncData({ $axios }: Context) {
    const locations: LocationData[] = await $axios.$get('/api/')

    return {
      locations,
    }
  },

  data() {
    return {
      locations: [] as LocationData[],
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
    showInfoWindow(event:any) {
      const infoWindow = event.marker.infoWindow
      infoWindow.open(event.map, event.marker)
    },
    closeInfoWindow(event:any) {
      const infoWindow = event.marker.infoWindow
      infoWindow.close(event.map, event.marker)
    }
  },

  mounted() {
    
  },
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
