const express = require('express');
const router = express.Router();
const { User ,Client,ClientUser} = require('../models');
const auth = require('../middleware/auth');
const db = require("../models")

// Créer un utilisateur
router.post('/users', async (req, res) => {
    try {
        console.log(req.body)
        if (req.body.password != req.body.confirmPassword) {
            res.status(400).json({error:"vos 2 mots de passe ne sont pas identique !!"})
        }
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Obtenir tous les utilisateurs
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtenir un utilisateur par son ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour un utilisateur
router.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Supprimer un utilisateur
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/add_user', auth, async (req, res) => {
    try {
        const user = req.user; 

        const client = await Client.create({
            nom: req.body.name
        });
        // await db.redisClient.set(`client:${client.id}`, JSON.stringify(client));

        const clientUser = await ClientUser.create({
            ClientId: client.id,
            UserId: user.id
        });

        // await db.redisClient.set(`clientUser:${clientUser.id}`, JSON.stringify(clientUser));

        res.status(201).send(client);
    } catch (err) {
        console.log(err);
        res.status(500).send("ERROR Can't create");
    }
});

module.exports =router  // Exportez router sous le nom userRoutes
