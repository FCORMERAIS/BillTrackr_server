const express = require('express');
const router = express.Router();
const { Client } = require('../models');
const db = require("../models")

router.post('/add_client', async (req, res) => {
    try {
      const { nomClient, userId } = req.body;
  
      // Validation de l'entrée
      if (!nomClient) {
        return res.status(400).json({ message: 'Client name is required' });
      }
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      // Création du client
      let client = await db.Client.create({
        nom: nomClient,
      });
  
      // Création de l'association client-utilisateur
      const clientUser = await db.ClientUser.create({
        ClientId: client.id,
        UserId: userId,
      });
  
      // Réponse réussie avec le client créé
      res.status(201).json(client);
    } catch (error) {
      // Gestion des erreurs spécifiques à Sequelize
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: 'Validation error', errors: error.errors });
      }
      if (error.name === 'SequelizeUniqueConstraintError') {
        try {
          // Recherche du client existant par nom
          const client = await db.Client.findOne({ where: { nom: req.body.nomClient } });
  
          // Si le client existe, on crée l'association client-utilisateur
          if (client) {
            const clientUser = await db.ClientUser.create({
              ClientId: client.id,
              UserId: req.body.userId,
            });
            return res.status(201).json(client);
          }
          // Si le client n'existe pas, retourner une erreur
          return res.status(400).json({ message: 'Client not found for the given name' });
        } catch (innerError) {
          console.error('Error associating client with user:', innerError);
          return res.status(500).json({ message: 'Internal server error during association' });
        }
      }
      // Gestion des erreurs générales
      console.error('Error creating client:', error);
      res.status(500).json({ message: 'Internal server error' });
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


router.post('/get_clients_from_user', async (req, res) => {
    try {
        const clients = await db.ClientUser.findAll({ where: { userId: req.body.userId } });
        if (!clients || clients.length === 0) {
            return res.status(404).json({ "message": "Aucun client associé trouvé" });
        }

        const listClients = [];
        for (let index = 0; index < clients.length; index++) {
            const client = await db.Client.findOne({ where: { id: clients[index].ClientId } });
            if (client) {
                listClients.push(client);
            }
        }

        if (listClients.length === 0) {
            return res.status(404).json({ "message": "Aucun client valide trouvé" });
        }

        res.status(200).json(listClients);
    } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error);
        res.status(500).json({ "message": "Erreur serveur lors de la récupération des clients" });
    }
});

module.exports = router  // Exportez router sous le nom clientRoutes
