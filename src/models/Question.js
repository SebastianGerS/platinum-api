'use strict'

export default (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type:DataTypes.STRING,
        required:true
    },
    type: {
        type: DataTypes.ENUM('select-one', 'multiselect', 'short-text'),
        required:true
    },
    order: {
        type: DataTypes.INTEGER,
        required:true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
    });


    Question.associate = (models) => {
    Question.belongsTo(models.Questionnaire, {
        as: 'Questionnaire',
        foreignKey: 'id'
    })

    Question.hasMany(models.Option, {
        as: 'Options',
    })
    Question.hasMany(models.Vote, {
        as: 'Vote',
        foreignKey: 'id'
    })
    }

    return Question
}
