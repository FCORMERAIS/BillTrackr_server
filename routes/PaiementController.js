const express = require('express');
const router = express.Router();
const { Paiement } = require('../models');

// Créer un utilisateur
router.post('/paiements', async (req, res) => {
    try {
        const paiement = await Paiement.create(req.body);
        res.status(201).json(paiement);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtenir tous les utilisateurs
router.get('/paiements', async (req, res) => {
    try {
        const paiements = await Paiement.findAll();
        res.json(paiements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtenir un utilisateur par son ID
router.get('/paiements/:id', async (req, res) => {
    try {
        const paiement = await Paiement.findByPk(req.params.id);
        if (paiement) {
            res.json(paiement);
        } else {
            res.status(404).json({ error: 'paiement not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour un utilisateur
router.put('/paiements/:id', async (req, res) => {
    try {
        const paiement = await Paiement.findByPk(req.params.id);
        if (paiement) {
            await paiement.update(req.body);
            res.json(paiement);
        } else {
            res.status(404).json({ error: 'paiement not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Supprimer un utilisateur
router.delete('/paiements/:id', async (req, res) => {
    try {
        const paiement = await Paiement.findByPk(req.params.id);
        if (paiement) {
            await paiement.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'paiement not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router  // Exportez router sous le nom paiementRoutes
