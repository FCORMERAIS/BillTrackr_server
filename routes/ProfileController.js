const express = require('express');
const router = express.Router();
const { ProfileService } = require("../services/ProfileService");
const { AuthService } = require("../services/AuthentificationService");

// Créer un utilisateur
router.post('/change_profil', async (req, res) => {
    try {
        const new_adresse = req.body.adresse;
        const new_first_name = req.body.prenom;
        const new_last_name = req.body.nom;
        const email = req.body.email;
        const token = req.body.token;
        if (await AuthService.verifyToken(token)) {
            const updatedUser = await ProfileService.changeUserInformations(email, new_first_name, new_adresse, new_last_name);
            newTokenJWT = await AuthService.createJWT(email)
            res.status(201).json({"message":"changement effectué",updatedUser,"accessToken":newTokenJWT});
        }else {
            res.status(300).json({"message":"accessToken invalide"});
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router  // Exportez router sous le nom paiementRoutes
