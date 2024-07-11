const express = require('express');
const router = express.Router();
const { MoyenPaiement } = require('../models');

// Créer un utilisateur
router.post('/moyenPaiements', async (req, res) => {
    try {
        const moyenPaiement = await MoyenPaiement.create(req.body);
        res.status(201).json(moyenPaiement);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtenir tous les utilisateurs
router.get('/moyenPaiements', async (req, res) => {
    try {
        const moyenPaiements = await MoyenPaiement.findAll();
        res.json(moyenPaiements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtenir un utilisateur par son ID
router.get('/moyenPaiements/:id', async (req, res) => {
    try {
        const moyenPaiement = await MoyenPaiement.findByPk(req.params.id);
        if (moyenPaiement) {
            res.json(moyenPaiement);
        } else {
            res.status(404).json({ error: 'moyenPaiement not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour un utilisateur
router.put('/moyenPaiements/:id', async (req, res) => {
    try {
        const moyenPaiement = await MoyenPaiement.findByPk(req.params.id);
        if (moyenPaiement) {
            await moyenPaiement.update(req.body);
            res.json(moyenPaiement);
        } else {
            res.status(404).json({ error: 'moyenPaiement not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Supprimer un utilisateur
router.delete('/moyenPaiements/:id', async (req, res) => {
    try {
        const moyenPaiement = await MoyenPaiement.findByPk(req.params.id);
        if (moyenPaiement) {
            await moyenPaiement.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'moyenPaiement not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router  // Exportez router sous le nom moyenPaiementRoutes
