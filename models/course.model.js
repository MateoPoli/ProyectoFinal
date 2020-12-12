const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define("Course", {
      idCourse: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          max: 20,
          min: 10,
          is:{
              args: /^[A-Za-z0-9_\u00f1\u00d1\s]+$/,
              msg: 'The course´s name must be alphanumeric'
          }
        }
      },
      professor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          max: 20,
          min: 8,
          is:{
              args: /^[A-Za-z\s]+$/,
              msg:
               "The teacher´s name must contain only letters"
          }
        }
      },
      credits: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          is:{
              args: /^[0-9]+$/,
              msg: 'The score one must be float  '
          }
        }
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
      },
    });

    Course.associate = (models) =>{
      Course.belongsTo(models.Student, {
        foreignKey: {
          allowNull: false,
        },
      });
    };

    Course.associate = (models) =>{
      Course.hasMany(models.Score, {
        onDelete: "cascade",
      });
    };

    return Course;
  };
  
