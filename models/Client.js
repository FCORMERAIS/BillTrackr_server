module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define("Client", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            validate: {
                notEmpty: true
            }
        },
        numberBill:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    })
    Client.associate = models => {
        Client.belongsToMany(models.User, { through: 'ClientUser' });
    };
    return Client
}