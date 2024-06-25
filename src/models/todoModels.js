const { DataTypes } = require('sequelize');
const sequelize = require('../../db/sequelize');

const Todo = sequelize.define('Todo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    timestamps: false
});

Todo.sync({ alter: true });

module.exports = Todo;
