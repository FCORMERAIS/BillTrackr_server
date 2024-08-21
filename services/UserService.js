const bcrypt = require('bcryptjs');
const db = require('../models')

class UserService {
    async comparePassword(db,userEmail, password) {
        try {
            const user = await db.User.findOne({ where: { email: userEmail } });

            if (!user) {
                return false;
            }

            const isMatch = await bcrypt.compare(password, user.password);
            
            return isMatch; 
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async getUser(userEmail) {
        try {
          const user = await db.User.findOne({ where: { email: userEmail } })
          if (!user) {
            return false
          }
    
          return user
        } catch (error) {
          console.error(error)
          return false
        }
      }
    // async createClient(db,nom_client) {
        
    // }
}

module.exports = {
    UserService : new UserService()
};