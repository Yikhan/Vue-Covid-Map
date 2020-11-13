import Vue from 'vue'

Vue.filter('toString', function (value) {
  if (!value) {
    return ''
  }
  return value.toString()
})
