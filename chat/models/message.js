const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/sequelize");
class Message extends Model {}

Message.init(
  {
    message: { type: DataTypes.STRING, allowNull: false },
    ts: { type: DataTypes.INTEGER },
    author: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "Message" }
);

Message.sync();
module.exports = Message;
