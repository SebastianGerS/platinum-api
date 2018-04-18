// question: {	
// 	$id:  {type: Schema.Types.ObjectID},
// 	name: {type: String, required:true},
// 	type: {type:String, enum:['select-one”, 'multiselect”, 'short-text”], required:true}
// 	options: [ {type: Schema.Types.ObjectID, ref: option, required:true}]
// }


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
        foreignKey: 'id',

    })
    Question.hasMany(models.Vote, {
        as: 'Vote',
        foreignKey: 'id'
    })
    }

    return Question
}
