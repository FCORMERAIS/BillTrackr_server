module.exports = (sequelize, DataTypes) => {
    const Paiement = sequelize.define("Paiement", {  
        prixTotalTTC: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        reference_paiement:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    })
    Paiement.associate = models => {
        Paiement.belongsTo(models.Client, { through: 'Client' });
        Paiement.belongsTo(models.Facture, { through: 'Facture' });
        Paiement.belongsTo(models.User, { through: 'User' });
        Paiement.belongsTo(models.MoyenPaiement,{ through: 'MoyenPaiement' });
    };
    return Paiement
}