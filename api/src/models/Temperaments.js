const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
 
  // const Temperaments = sequelize.define('Temperaments', {
    sequelize.define('temperaments',{
      id:{
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      name:{
          type: DataTypes.STRING,
          allowNull: false
      },
     
  }, {timestamps: false},)
}

