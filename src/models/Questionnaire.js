'use strict'

export default (sequelize, DataTypes) => {
    const Questionnaire = sequelize.define('Questionnaire', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.ENUM('basic', 'premium', 'onetime-premium'),
        required: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
    });


    Questionnaire.associate = (models) => {
    
        Questionnaire.belongsTo(models.User, {
            as: 'User',
            foreignKey: 'userId'
        })
        
        Questionnaire.hasOne(models.Poll, {
            as: 'Poll',
            foreignKey: 'id'
        })

        Questionnaire.hasMany(models.Question, {
            as: 'Question',
            foreignKey: 'id'
        })
    }

    return Questionnaire
}
