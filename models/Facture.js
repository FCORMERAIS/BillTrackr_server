module.exports = (sequelize, DataTypes) => {
  const Facture = sequelize.define("Facture", { 
    nom: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    remises: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    prixTotalTTC: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    dateEcheance: {
      type: DataTypes.DATE,
      allowNull: false
    },        
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
    
  }); 
  Facture.associate = models => {
    Facture.belongsTo(models.User);
    Facture.belongsTo(models.Client);
  };

  return Facture
}
