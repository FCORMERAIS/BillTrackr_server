module.exports = (sequelize, DataTypes) => {
    const ClientUser = sequelize.define("ClientUser", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    });

    return ClientUser;
};
