<template>
  <div class="container">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group label="Country Name:" label-for="input-country-name">
        <b-form-input
          id="input-country-name"
          v-model="form.countryName"
          type="text"
          required
          placeholder="Full name of country or territory"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Country Code:" label-for="input-country-code">
        <b-form-input
          id="input-country-code"
          v-model="form.countryCode"
          type="text"
          required
          placeholder="Code of country"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Longitude:" label-for="input-lng">
        <b-form-input
          id="input-lng"
          v-model="form.lat"
          type="number"
          step="0.000001"
          required
          placeholder="Longitude: 0"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Latitude:" label-for="input-lat">
        <b-form-input
          id="input-lat"
          v-model="form.lng"
          type="number"
          step="0.000001"
          required
          placeholder="Latitude: 0"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Cases:" label-for="input-cases">
        <b-form-input
          id="input-cases"
          v-model="form.cases"
          type="number"
          required
          placeholder="Total covid cases"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Deaths:" label-for="input-deaths">
        <b-form-input
          id="input-deaths"
          v-model="form.deaths"
          type="number"
          required
          placeholder="Total deaths"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Cumulative Number For 14 Days Per Million Population:"
        label-for="input-cumulative"
      >
        <b-form-input
          id="input-cumulative"
          v-model="form.cumulative"
          type="number"
          step="0.000001"
          required
          placeholder="Total number"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <label for="datepicker">Date Reported</label>
        <b-form-datepicker id="datepicker" v-model="form.date" class="mb-2"></b-form-datepicker>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button type="button" variant="success" @click="onGenerate">Generate</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { createRecord } from '~/api'
import { randomInt, randomFloat } from '~/utils/tools'
import dayjs from 'dayjs'

export default Vue.extend({
  name: 'addRecord',
  data() {
    return {
      form: {
        countryName: '',
        countryCode: '',
        lat: 0,
        lng: 0,
        cases: 0,
        deaths: 0,
        cumulative: 0,
        date: dayjs().format('YYYY-MM-DD')
      },
      show: true
    }
  },
  methods: {
    async onSubmit(evt: any) {
      evt.preventDefault()
      const dateParse = dayjs(this.form.date)
      const response = await createRecord(this.$axios, {
        dateReported: this.form.date,
        day: dateParse.day,
        month: dateParse.month,
        year: dateParse.year,
        cases: this.form.cases,
        deaths: this.form.deaths,
        countryAndTerritory: this.form.countryName,
        countryTerritoryCode: this.form.countryCode,
        cumulativeNumberFor14DaysPer100000: this.form.cumulative,
        lat: this.form.lat,
        lng: this.form.lng
      })
      alert(`Create request done: ${response.statusText}`)
    },
    onReset(evt: any) {
      evt.preventDefault()
      // Reset our form values
      this.form.countryName = ''
      this.form.countryCode = ''
      this.form.lat = 0
      this.form.lng = 0
      this.form.cases = 0
      this.form.deaths = 0
      this.form.cumulative = 0
      this.form.date = dayjs().format('YYYY-MM-DD')

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    onGenerate(evt: any) {
      this.form.countryName = 'A New Country ' + randomInt(0, 1000)
      this.form.countryCode = 'AAA'
      this.form.lat = randomFloat(-90, 90, 6)
      this.form.lng = randomFloat(-180, 180, 6)
      this.form.deaths = randomInt(0, 5000)
      this.form.cases = randomInt(
        this.form.deaths,
        this.form.deaths + randomInt(0, 10000)
      )
      this.form.cumulative = randomFloat(0, 100, 2)
    }
  }
})
</script>
<style lang="less" scoped>
.container {
  margin-top: 50px;
}
</style>