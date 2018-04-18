'use strict'

export default (sequelize, DataTypes) => {

    const Option = sequelize.define('Option', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type:DataTypes.STRING,
        required:true
    },
    createdAt: DataTypes.DATE,
    });


    Option.associate = (models) => {

    Option.belongsToMany(models.Question, {
        through: 'QuestionOption'
    })

    Option.belongsToMany(models.Vote, {
        as: 'Votes',
        through: 'OptionVote'
    })

    }

    return Option
}
