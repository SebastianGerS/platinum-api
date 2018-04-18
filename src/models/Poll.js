'use strict'

export default (sequelize, DataTypes) => {
    const Poll = sequelize.define('Poll', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    link: {
        type: DataTypes.STRING,
        unique:true
    },
    qr_code: {
        type: DataTypes.STRING,
        unique:true
    },
    max_num_of_votes: DataTypes.INTEGER,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    closedAt: DataTypes.DATE,
    duration: DataTypes.INTEGER
    });


    Poll.associate = (models) => {

        Poll.belongsTo(models.User, {
            as: 'User',
            foreignKey: 'userId'
        })

        Poll.belongsTo(models.Questionnaire, {
            as: 'Questionnaire',
            foreignKey: 'id'
        })

        Poll.hasMany(models.Answer, {
            as: 'Result',
            foreignKey: 'id'
        })
    }

    return Poll
}
