module.exports = (sequelize, DataTypes) => {
    const TokenJWT = sequelize.define("TokenJWT", {
        token: {
            type: DataTypes.STRING(1000),
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
    TokenJWT.associate = models => {
        TokenJWT.belongsTo(models.User, { through: 'User' });
    };
    return TokenJWT
}