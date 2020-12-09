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
          max: 50,
          min: 3,
          is:{
              args: /^[A-Za-z0-9_\u00f1\u00d1\s]+$/,
              msg: 'El nombre debe ser alfanumerico'
          }
        }
      },
      professor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          max: 80,
          min: 2,
          is:{
              args: /^[A-Za-z\s]+$/,
              msg:
               'El nombre del profesor debe contener solo letras'
          }
        }
      },
      credits: {
        type: DataTypes.BIGINT,
        allowNull: false
      }
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
  
