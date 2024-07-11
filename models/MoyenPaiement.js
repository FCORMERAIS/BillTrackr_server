module.exports = (sequelize, DataTypes) => {
    const MoyenPaiement = sequelize.define("MoyenPaiement", {  
        nom : {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            validate: {
                notEmpty: true
            }
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    })
    return MoyenPaiement
}