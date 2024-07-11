const express = require('express');
const router = express.Router();
const { Facture } = require('../models');

// Créer un utilisateur
router.post('/factures', async (req, res) => {
    try {
        const facture = await Facture.create(req.body);
        res.status(201).json(facture);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtenir tous les utilisateurs
router.get('/factures', async (req, res) => {
    try {
        const factures = await Facture.findAll();
        res.json(factures);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtenir un utilisateur par son ID
router.get('/factures/:id', async (req, res) => {
    try {
        const facture = await Facture.findByPk(req.params.id);
        if (facture) {
            res.json(facture);
        } else {
            res.status(404).json({ error: 'facture not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour un utilisateur
router.put('/factures/:id', async (req, res) => {
    try {
        const facture = await Facture.findByPk(req.params.id);
        if (facture) {
            await facture.update(req.body);
            res.json(facture);
        } else {
            res.status(404).json({ error: 'facture not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Supprimer un utilisateur
router.delete('/factures/:id', async (req, res) => {
    try {
        const facture = await Facture.findByPk(req.params.id);
        if (facture) {
            await facture.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'facture not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router  // Exportez router sous le nom factureRoutes