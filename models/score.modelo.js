const { Sequelize } = require("sequelize");

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
      validate: {
        is:{
            args: /^[0-9]+([.][0-9]+)?$/,
            msg: 'The score one must be float  '
        }
      }
    },
    scoreTwo: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        is:{
            args: /^[0-9]+([.][0-9]+)?$/,
            msg: 'The score two must be float  '
        }
      }
    },
    scoreTree: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        is:{
            args: /^[0-9]+([.][0-9]+)?$/,
            msg: 'The score three must be float  '
        }
      }
    },
    scoreFour: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        is:{
            args: /^[0-9]+([.][0-9]+)?$/,
            msg: 'The score four must be float  '
        }
      }
    },
    average: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    secret: {
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    }
  });

  Score.associate = (models) => {
    Score.belongsTo(models.Course, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Score;
};