module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("Todo", {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 50,
        min: 2,
        is:{
            args: /^[A-Za-z0-9_\s]+$/,
            msg: 'El texto debe ser alfanumerico'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 80,
        min: 2,
        is:{
            args: /[A-Za-z0-9_\s]+$/,
            msg:
             'La descripcion debe ser alfabetica'
        }
      }
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: false,
    }
  });
  return Todo;
};
