const express = require('express');
const router = express.Router();
const { Facture } = require('../models');
const db = require("../models")
const { ClientService } = require("../services/ClientService");

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

router.post('/add_facture', async (req, res) => {
    try {
        console.log(req.body.dateEcheance)
        const client = await ClientService.getClient(req.body.clientName)
        const facture = await db.Facture.create({
            nom: req.body.nom,
            remises: req.body.remise,
            prixTotalTTC: req.body.prixtotalTTC,
            dateEcheance: req.body.dateEcheance,
            UserId: req.body.userId,
            ClientId: client.id,
          });
        res.status(201).json(facture);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.post('/get_facture_by_client', async (req, res) => {
    try {
        const factures = await db.Facture.findAll({ where: { ClientId: req.body.ClientId , UserId : req.body.UserId ,isActive : 1} });
        res.status(201).json(factures);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.post('/delete_facture', async (req, res) => {
    const Facture = await db.Facture.update(
        { isActive: 0 },
        { where: { id: req.body.factureId } }
      );
    res.status(201).json(Facture);

})

router.post('/paiement_valide', async (req, res) => {
    const Facture = await db.Facture.update(
        { haveBeenPaid: 1 },
        { where: { id: req.body.factureId } }
      );
      res.status(201).json(Facture);
    })

router.post('/get_facture_history', async (req, res) => {
    try {
        const factures = await db.Facture.findAll({ where: {UserId : req.body.userId ,isActive : 0} });
        console.log(factures)
        res.status(201).json(factures);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = router  // Exportez router sous le nom factureRoutes