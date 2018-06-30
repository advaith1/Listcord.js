
const request = require('request')
'use strict'

module.exports = class {
  constructor (token) {
    this.login(token)
  }

  get (endpoint) {
    return new Promise((resolve, reject) => {
      var options = {
        url: `https://www.listcord.com/api${endpoint}`,
        headers: { token: this.token },
        json: true
      }

      var callback = (error, response, body) => {
        if (error) reject(error)
        else resolve(body)
      }

      request(options, callback)
    })
  }

  post (endpoint, data) {
    return new Promise((resolve, reject) => {
      var options = {
        method: 'POST',
        url: `https://www.listcord.com/api${endpoint}`,
        headers: { token: this.token },
        json: typeof data === 'object' ? data : { }
      }

      var callback = (error, response, body) => {
        if (error) reject(error)
        else resolve(body)
      }

      request(options, callback)
    })
  }

  getBot (id) {
    return this.get(`/bot/${id}`)
  }

  getBotVotes (id) {
    return this.get(`/bot/${id}/votes`)
  }

  postBotGuilds (id, guilds, shard) {
    return this.post(`/bot/${id}/guilds`, { guilds, shard })
  }

  login (token) {
    if (typeof token === 'string' && token !== '') this.token = token
  }
}
