export default (sequelize, DataTypes) => {
  const Option = sequelize.define('Option', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    order: {
      type: DataTypes.INTEGER,
      required: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });


  Option.associate = (models) => {
    Option.belongsTo(models.Question, {
      as: 'Question',
      foreignKey: 'id',
    });

    Option.belongsToMany(models.Vote, {
      as: 'Votes',
      through: 'OptionVote',
    });
  };

  return Option;
};
