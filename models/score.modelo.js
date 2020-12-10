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