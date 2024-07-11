const express = require('express');
const router = express.Router();
const clientRoutes = require('./ClientController');
const factureRoutes = require('./FactureController');
const moyenPaiementRoutes = require('./MoyenPaiementController');
const paiementRoutes = require('./PaiementController');
const userRoutes = require('./UserController');
const authRoutes = require('./AuthentificationController');
const profileRoutes = require("./ProfileController");

router.use('/', clientRoutes);
router.use('/', factureRoutes);
router.use('/', moyenPaiementRoutes);
router.use('/', paiementRoutes);
router.use('/', userRoutes);
router.use('/', authRoutes);
router.use('/',profileRoutes);

module.exports = {
    AllRoutes: router  // Exportez router sous le nom AllRoutes
};
