import { Base64 } from 'js-base64'
import md5hex from 'md5hex'
const fetch = window.fetch

const URL = process.env.REACT_APP_SERVICE_URL

const urlForPath = path => `${URL}${path}`
const salt = process.env.REACT_APP_AUTH_SALT
const encrypt = value => md5hex(value, { salt })

const wireNetwork = (username, password) => {
  const prepHeaders = additionalHeaders =>
    Object.assign(
      {},
      {
        Authorization: `Basic ${Base64.encode(
          username + ':' + encrypt(password)
        )}`,
        'Content-Type': 'application/json'
      },
      additionalHeaders
    )
  const prepOptions = (options = {}) =>
    Object.assign({}, options, { headers: prepHeaders(options.headers || {}) })

  return {
    sendMessage({ group, id, message } = {}) {
      const smsURL = group === 'all' ? `sms` : `sms/${group}/${id}`
      return fetch(
        urlForPath(smsURL),
        prepOptions({
          method: 'POST',
          body: JSON.stringify({ message })
        })
      ).catch(err => {
        console.log(err)
      })
    },

    getAdminUser(username) {
      return fetch(
        urlForPath('admins/search'),
        prepOptions({
          method: 'POST',
          body: JSON.stringify({ username })
        })
      )
        .then(res => {
          return res.json()
        })
        .then(data => {
          return data
        })
        .catch(err => {
          console.log(err)
          throw err
        })
    },

    getAllHouseholds() {
      return fetch(urlForPath('households'), prepOptions())
        .then(res => {
          return res.json()
        })
        .then(data => {
          return data
        })
        .catch(err => {
          console.log(err)
        })
    },

    createFamily(family) {
      return fetch(
        urlForPath('households'),
        prepOptions({
          method: 'POST',
          body: JSON.stringify(family)
        })
      )
        .then(res => {
          return res.json()
        })
        .catch(err => {
          console.log(err)
        })
    },

    editFamily(household) {
      return fetch(
        urlForPath(`households/${household.id}`),
        prepOptions({
          method: 'PUT',
          body: JSON.stringify(household)
        })
      )
        .then(res => {
          return res.json()
        })

        .catch(err => {
          console.log(err)
          throw err
        })
    },

    deleteFamily(household) {
      return fetch(
        urlForPath(`households/${household.id}`),
        prepOptions({
          method: 'DELETE'
        })
      )
    },

    getAllClassrooms() {
      return fetch(urlForPath('classrooms'), prepOptions())
        .then(res => {
          return res.json()
        })
        .then(data => {
          return data
        })
        .catch(err => {
          console.log(err)
        })
    },

    getAllStudents() {
      return fetch(urlForPath('students'), prepOptions())
        .then(res => {
          return res.json()
        })
        .then(data => {
          return data
        })
        .catch(err => {
          console.log(err)
        })
    },

    createStudent(student) {
      return fetch(
        urlForPath('students'),
        prepOptions({
          method: 'POST',
          body: JSON.stringify(student)
        })
      )
        .then(res => {
          return res.json()
        })
        .catch(err => {
          console.log(err)
        })
    },

    editStudent(student) {
      return fetch(
        urlForPath(`students/${student.id}`),
        prepOptions({
          method: 'PUT',
          body: JSON.stringify(student)
        })
      )
        .then(res => {
          return res.json()
        })

        .catch(err => {
          console.log(err)
          throw err
        })
    },

    deleteStudent(student) {
      return fetch(
        urlForPath(`students/${student.id}`),
        prepOptions({
          method: 'DELETE'
        })
      )
    },

    getAllLocations() {
      return fetch(urlForPath('locations'), prepOptions())
        .then(res => {
          return res.json()
        })
        .then(data => {
          return data
        })
        .catch(err => {
          console.log(err)
        })
    },

    authenticateContact(params) {
      return fetch(
        urlForPath('contacts/search'),
        prepOptions({
          method: 'POST',
          body: JSON.stringify(params)
        })
      )
        .then(res => {
          return res.json()
        })
        .catch(err => {
          console.log(err)
        })
    },

    getAllContacts() {
      return fetch(urlForPath('contacts'), prepOptions())
        .then(res => {
          return res.json()
        })
        .then(data => {
          return data
        })
        .catch(err => {
          console.log(err)
        })
    },

    postContact(contact) {
      return fetch(
        urlForPath('contacts'),
        prepOptions({
          method: 'POST',
          body: JSON.stringify(contact)
        })
      )
        .then(res => {
          return res.json()
        })

        .catch(err => {
          console.log(err)
        })
    },

    editContact(contact) {
      return fetch(
        urlForPath(`contacts/${contact.id}`),
        prepOptions({
          method: 'PUT',
          body: JSON.stringify(contact)
        })
      )
        .then(res => {
          return res.json()
        })

        .catch(err => {
          console.log(err)
        })
    },

    deleteContact(contact) {
      return fetch(
        urlForPath(`contacts/${contact.id}`),
        prepOptions({
          method: 'DELETE'
        })
      )
    },

    // Admin Management
    getAllAdmins() {
      return fetch(urlForPath('admins'), prepOptions())
        .then(res => {
          return res.json()
        })
        .then(data => {
          return data
        })
        .catch(err => {
          console.log(err)
        })
    },

    createAdmin(admin) {
      admin.password = encrypt(admin.password)

      return fetch(
        urlForPath('admins'),
        prepOptions({
          method: 'POST',
          body: JSON.stringify(admin)
        })
      )
        .then(res => {
          return res.json()
        })
        .catch(err => {
          console.log(err)
        })
    },

    editAdmin(admin) {
      if (admin.password) {
        admin.password = encrypt(admin.password)
      }

      return fetch(
        urlForPath(`admins/${admin.id}`),
        prepOptions({
          method: 'PUT',
          body: JSON.stringify(admin)
        })
      )
        .then(res => {
          return res.json()
        })

        .catch(err => {
          console.log(err)
          throw err
        })
    },

    deleteAdmin(admin) {
      return fetch(
        urlForPath(`admins/${admin.id}`),
        prepOptions({
          method: 'DELETE'
        })
      )
    }
  }
}

export default wireNetwork
