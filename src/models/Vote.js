'use strict'

export default (sequelize, DataTypes) => {
    const Vote = sequelize.define('Vote', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
    });


    Vote.associate = (models) => {
        Vote.belongsTo(models.Question, {
            as: 'Question',
            foreignKey: 'id'
        })

        Vote.belongsToManny(models.Option, {
            as: 'Options',
            foreignKey: 'id'
        })
    }

    return Vote
}
