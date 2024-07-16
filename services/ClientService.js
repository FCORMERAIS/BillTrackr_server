const db = require('../models')

class ClientService {

    async getClient(nomClient) {
        try {
          const client = await db.Client.findOne({ where: { nom: nomClient } })
          if (!client) {
            return false
          }
    
          return client
        } catch (error) {
          console.error(error)
          return false
        }
      }
}

module.exports = {
    ClientService : new ClientService()
};