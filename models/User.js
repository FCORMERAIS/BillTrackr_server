const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '...',
            validate: {
                notEmpty: true
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '...',
            validate: {
                notEmpty: false
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        adresse : {
            type : DataTypes.STRING,
            allowNull: true,
            defaultValue: '...',
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            },
            set(value) {
                const hashedPassword = bcrypt.hashSync(value, 10);
                this.setDataValue('password', hashedPassword);
            }
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });
    


    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    
    User.associate = models => {
        User.belongsToMany(models.Client, { through: 'ClientUser' });
    };

    return User;
};
