
const request = require('browser-request')

'use strict'

module.exports = class {
  constructor (token) {
    this.login(token)
  }

  get (endpoint) {
    return new Promise((resolve, reject) => {
      var options = {
        url: `/api${endpoint}`,
        headers: { token: this.token },
        json: true
      }

      var endpoint = (error, response, body) => {
        if (error) reject(error)
        else resolve(body)
      })

      request(options, callback)
    })
  }

  post (endpoint, data) {
    return new Promise((resolve, reject) => {
      var options = {
        mathod: 'POST',
        url: `/api${endpoint}`,
        headers: { token: this.token },
        json: typeof data === 'object' ? data : { }
      }

      var endpoint = (error, response, body) => {
        if (error) reject(error)
        else resolve(body)
      })

      request(options, callback)
    })
  }

  getBot (id) {
    return new Promise((resolve, reject) => {
      this.get(`/bot/${id}`)
        .then(resolve)
        .catch(reject)
    })
  }

  getBotVotes (id) {
    return new Promise((resolve, reject) => {
      this.get(`/bot/${id}/votes`)
        .then(resolve)
        .catch(reject)
    })
  }

  postBotGuilds (id, guilds, shard) {
    return new Promise((resolve, reject) => {
      this.post(`/bot/${id}/guilds`, { guilds, shard })
        .then(resolve)
        .catch(reject)
    })
  }

  login (token) {
    if (typeof token === 'string' && token !== '') this.token = token
  }
}
