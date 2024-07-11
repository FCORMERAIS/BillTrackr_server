const db = require("../models")

class ProfileService {
    async changeUserInformations(userEmail,prenom,adresse,nom) {
        try {
            const user = await db.User.findOne({ where: { email: userEmail } });
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
            user.firstName = prenom;
            user.lastName = nom;
            user.adresse = adresse;
        
            await user.save();
        
            return user;
        } catch (error) {
                console.error('Erreur lors de la mise à jour des informations utilisateur :', error);
            throw error;
          }
        }
}

module.exports = {
    ProfileService : new ProfileService(),
};
