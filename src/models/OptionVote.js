export default (sequelize, DataTypes) => {
  const OptionVote = sequelize.define('OptionVote', {
    voteId: DataTypes.INTEGER,
    optionId: DataTypes.INTEGER,

  });


  OptionVote.associate = (models) => {
    OptionVote.belongsTo(models.Vote, {
      as: 'Vote',
      foreignKey: 'id',
    });

    OptionVote.belongsTo(models.Option, {
      as: 'Option',
      foreignKey: 'id',
    });
  };

  return OptionVote;
};
