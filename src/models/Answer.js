'use strict'

export default (sequelize, DataTypes) => {
    const Answer = sequelize.define('Answer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
    });


    Answer.associate = (models) => {
        Answer.belongsTo(models.Poll, {
            as: 'Poll',
            foreignKey: 'id',
        })

        Answer.hasMany(models.Vote, {
            as: 'Votes',
            foreignKey: 'id',
            
        })
    }

    return Answer
}
