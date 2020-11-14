export default function ({ $axios, redirect }) {
  $axios.defaults.params = {
    code: 'lVaq5edaxcRSjG5fvbbp/tUOH9URt4Q5sA5MfMOZ4/Y1qpBQqdYSHg=='
  }

  $axios.onRequest((config) => {
    // config.url = config.url + defaultQueryString
    console.log('Making request to ' + config.url)
  })
}
