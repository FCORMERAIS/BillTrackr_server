const express = require('express');
const router = express.Router();
const { AuthService } = require("../services/AuthentificationService");
const {UserService} = require("../services/UserService")
const { TokenJWT} = require('../models');
const db = require("../models")


router.post('/login', async (req, res) => {

    const username = req.body.email;
    const password = req.body.password;

    if (await AuthService.authentificateUser(username, password)) {
        const accessToken = await AuthService.createJWT(username);
        const refreshToken = await AuthService.generateRefreshToken(username);

        if (!req.session.refreshToken) {
            req.session.refreshToken = {};
        }
        user = await UserService.getUser(username)
        req.session.refreshToken[username] = refreshToken;
        const tokenJWT = await TokenJWT.create({"token":refreshToken,"UserId":user.id});
        
        req.session.save(err => {
            if (err) {
                console.error('Erreur lors de la sauvegarde de la session:', err);
                return res.status(500).json({ message: 'Erreur lors de la sauvegarde de la session' });
            }

            return res.status(201).json({ message: 'Authentification réussie', accessToken });
        });
    } else {
        res.status(401).json({ message: 'Identifiants invalides' });
    }
});

router.post('/deactivate_token', async (req, res) => {
    try {
      const { userId } = req.body;
      
      // Validation de l'entrée
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      // Obtention du refresh token associé à l'utilisateur
      const refreshToken = await AuthService.getRefreshToken(userId);
      
      if (!refreshToken) {
        return res.status(404).json({ message: 'Token not found or already deactivated' });
      }
  
      // Mise à jour du token pour le désactiver
      await db.TokenJWT.update(
        { isActive: 0 },
        { where: { id: refreshToken.id } }
      );
  
      res.json({ message: 'Token deactivated successfully' });
    } catch (error) {
      console.error('Error deactivating token:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.post('/refresh', async (req, res) => {
    const user = await UserService.getUser(req.body.email)
    const refreshToken = await AuthService.getRefreshToken(user.id)
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token non trouvé dans la session' });
    }

    const potentialUser = await AuthService.verifyToken(refreshToken.token);
    if (potentialUser) {
        const accessToken = await AuthService.createJWT(potentialUser.email);
        res.json({ accessToken });
    } else {
        res.status(401).json({ message: 'Refresh token invalide' });
    }
});

module.exports = router;
