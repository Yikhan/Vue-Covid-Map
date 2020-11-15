
export const getAllRecords = ($axios) => {
  return $axios.$get('/api/')
}

export const getPagedRecords = ($axios, data) => {
  return $axios.$get('/api/', {
    params: {
      ...data
    }
  })
}

export const createRecord = ($axios, data) => {
  return $axios.post('/api/', {
    ...data
  })
}