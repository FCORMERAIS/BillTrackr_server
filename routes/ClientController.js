const express = require('express');
const router = express.Router();
const { Client } = require('../models');

// Créer un utilisateur
router.post('/clients', async (req, res) => {
    try {
        const client = await Client.create(req.body);
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtenir tous les utilisateurs
router.get('/clients', async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtenir un utilisateur par son ID
router.get('/clients/:id', async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (client) {
            res.json(client);
        } else {
            res.status(404).json({ error: 'client not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour un utilisateur
router.put('/clients/:id', async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (client) {
            await client.update(req.body);
            res.json(client);
        } else {
            res.status(404).json({ error: 'client not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Supprimer un utilisateur
router.delete('/clients/:id', async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (client) {
            await client.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'client not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router  // Exportez router sous le nom clientRoutes
