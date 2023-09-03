const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
 
  // const Temperaments = sequelize.define('Temperaments', {
    sequelize.define('temperaments', {
   
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
},
{timestamps: false},
// {
//   tableName: 'Temperaments', 
// }
);
// return Temperaments;
}