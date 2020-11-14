import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('country', function (value) {
  if (!value) {
    return ''
  }
  return value.toString().replace(/_/g, ' ')
})

Vue.filter('formatDate', function(value) {
  if (!value) {
    return ''
  }
  return dayjs(value).format('DD/MM/YYYY')
})
