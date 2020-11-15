<template>
  <div class="container">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Country Name:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.countryName"
          type="text"
          required
          placeholder="Full name of country or territory"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Country Code:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.countryCode"
          required
          placeholder="Code of country"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Longitude:" label-for="input-3">
        <b-form-input id="input-3" v-model="form.lat" required placeholder="Longitude: 0"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Latitude:" label-for="input-4">
        <b-form-input id="input-4" v-model="form.lng" required placeholder="Latitude: 0"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Cases:" label-for="input-5">
        <b-form-input id="input-5" v-model="form.cases" required placeholder="Total covid cases"></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-6" label="Deaths:" label-for="input-6">
        <b-form-input id="input-6" v-model="form.deaths" required placeholder="Total deaths"></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-7"
        label="Cumulative Number For 14 Days Per Million Population:"
        label-for="input-7"
      >
        <b-form-input id="input-7" v-model="form.cumulative" required placeholder="Total number"></b-form-input>
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
      console.log(response)
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
      this.form.countryName = 'A New Country ' + this.randomInt(0, 1000)
      this.form.countryCode = 'AAA'
      this.form.lat = this.randomFloat(-90, 90, 6)
      this.form.lng = this.randomFloat(-180, 180, 6)
      this.form.deaths = this.randomInt(0, 5000)
      this.form.cases = this.randomInt(
        this.form.deaths,
        this.form.deaths + this.randomInt(0, 10000)
      )
      this.form.cumulative = this.randomFloat(0, 100, 2)
    },
    randomInt(min: number, max: number): number {
      let num = Math.random() * (max - min + 1) + min
      return Math.floor(num)
    },
    randomFloat(min: number, max: number, digits: number = 6): number {
      let num = Math.random() * (max - min + 1) + min
      return parseFloat(num.toFixed(digits))
    }
  }
})
</script>
<style lang="less" scoped>
.container {
  margin-top: 50px;
}
</style>