const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING(60), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  address: { type: DataTypes.STRING(400), allowNull: false },
  role: { type: DataTypes.ENUM('Admin', 'Normal', 'StoreOwner'), allowNull: false }
});

const Store = sequelize.define('Store', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  address: { type: DataTypes.STRING(400), allowNull: false }
});

const Rating = sequelize.define('Rating', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  rating: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    validate: { min: 1, max: 5 }
  }
}, {
  indexes: [{ unique: true, fields: ['UserId', 'StoreId'] }]
});

// Relationships
User.hasOne(Store, { foreignKey: 'ownerId', as: 'OwnedStore' });
Store.belongsTo(User, { foreignKey: 'ownerId', as: 'Owner' });

User.hasMany(Rating);
Rating.belongsTo(User);

Store.hasMany(Rating);
Rating.belongsTo(Store);

module.exports = { sequelize, User, Store, Rating };
