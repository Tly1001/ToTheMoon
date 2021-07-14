import axios from 'axios'

const baseUrl = 'http://localhost:8000/api'

export const registerUser = formData => {
  return axios.post(`${baseUrl}/register`, formData)
    .then(res => console.log(res.data))
}
