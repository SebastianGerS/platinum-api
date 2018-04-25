export default (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    questionId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });


  Vote.associate = (models) => {
    Vote.belongsTo(models.Question, {
      as: 'Question',
      foreignKey: 'id',
    });

    Vote.belongsToMany(models.Option, {
      as: 'Options',
      through: 'OptionVote',
    });
    Vote.belongsTo(models.Answer, {
      as: 'Answer',
      foreignKey: 'id',
    });
  };

  return Vote;
};
