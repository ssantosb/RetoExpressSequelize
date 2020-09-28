const Message = require("../models/Message");

function getMessages() {
  return Message.findAll();
}

function getMessage(idTs) {
  return Message.findAll({ where: { ts: idTs } });
}

function createMessage(text, author) {
  return Message.create({
    message: text,
    ts: new Date.getTime(),
    author: author,
  });
}

function updateMessage(text, idTs) {
  return Message.update(text, { where: { ts: idTs } });
}

function deleteMessage(idTsViejo) {
  return Message.destroy({ where: { ts: idTsViejo } });
}

exports.deleteMessage = deleteMessage;
exports.updateMessage = updateMessage;
exports.createMessage = createMessage;
exports.getMessage = getMessage;
exports.getMessages = getMessages;
