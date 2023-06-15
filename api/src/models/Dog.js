const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: true, // permite valores nulos
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: true, // permite valores nulos
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    creteInBd: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
