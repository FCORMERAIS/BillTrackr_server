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

      
    async validatePassword(password) {
      const minLength = 12;
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
      if (password.length < minLength) {
          return "Le mot de passe doit comporter au moins 12 caractères.";
      }
      if (!hasUppercase) {
          return "Le mot de passe doit contenir au moins une majuscule.";
      }
      if (!hasLowercase) {
          return "Le mot de passe doit contenir au moins une minuscule.";
      }
      if (!hasNumber) {
          return "Le mot de passe doit contenir au moins un chiffre.";
      }
      if (!hasSpecialChar) {
          return "Le mot de passe doit contenir au moins un caractère spécial.";
      }
      return null;
  }
}



module.exports = {
    UserService : new UserService()
};