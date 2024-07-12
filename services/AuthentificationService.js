  const db = require('../models')
  const jwt = require('jsonwebtoken')
  const bcrypt = require('bcrypt')


  class AuthService {
    async authentificateUser(userEmail, password) {
      try {
        const user = await db.User.findOne({ where: { email: userEmail } })
        if (!user) {
          return false
        }

        const isMatch = await bcrypt.compare(password, user.password)

        return isMatch
      } catch (error) {
        console.error(error)
        return false
      }
    }

    async createJWT(userEmail) {
      console.log(userEmail)
      const secretKey = 'GodsLovesChildren2010'

      const user = await db.User.findOne({ where: { email: userEmail } })

      const userPlainObject = user.toJSON()

      const token = jwt.sign(userPlainObject, secretKey, { expiresIn: '15min' })

      return token
    }

    async generateRefreshToken(userEmail) {
      const secretKey = 'GodsLovesChildren2010'
      const user = await db.User.findOne({ where: { email: userEmail } })
      const userPlainObject = user.toJSON()
      const refreshToken = jwt.sign(userPlainObject, secretKey, {
        expiresIn: '7d',
      })
      return refreshToken
    }

    async verifyToken(token) {
      const secretKey = 'GodsLovesChildren2010'
      try {
        const decoded = jwt.verify(token, secretKey)
        console.log(decoded)
        return decoded
      } catch (error) {
        return null
      }
    }

    async getRefreshToken(userId) {
      const token = await db.TokenJWT.findOne({ where: { UserId: userId , isActive : 1} })
      if (!token) {
        return null
      }else {
        return token
      }
    }

  }

  module.exports = {
    AuthService: new AuthService(),
  }
