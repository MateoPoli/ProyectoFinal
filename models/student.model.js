const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("Student", {
      idStudent: {
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      name : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          max: 60,
          min: 2,
          is:{
              args: /^[A-Za-z0-9_\s]+$/,
              msg: 'El nombre no es correcto'
          }
        }
      },
      age : {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          max: 60,
          min: 2,
          is:{
              args: /^[0-9]+$/,
              msg: 'La edad no es correcta'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          max: 80,
          min: 2,
          is:{
              args: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
              msg:
               'El correo electronico no es correcto'
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

    
    Student.associate = (models) =>{
      Student.hasMany(models.Course, {
        onDelete: "cascade",
      });
    };
  

    return Student;
  };
  