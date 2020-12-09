module.exports = (sequelize, DataTypes) => {
    const Score = sequelize.define("Score", {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      scoreOne: {
        type: DataTypes.FLOAT,
        allowNull: false,
        
      },
      scoreTwo: {
        type: DataTypes.FLOAT,
        allowNull: false,
      
      },
      scoreTree: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      scoreFour: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }
    });

    Score.associate = (models) =>{
      Score.belongsTo(models.Course, {
        foreignKey: {
          allowNull: false,
        },
      });
    };
    
    return Score;
  };