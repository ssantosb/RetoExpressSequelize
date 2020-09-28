const WebSocket = require("ws");
const messageLogic = require("./chat/logic/messageLogic");
const messagePersistence = require("./chat/persistence/messagePersistence");
const clients = [];

const sendMessages = () => {
  clients.forEach((client) => {
    messagePersistence.getMessages().then((result) => {
      let messages = [];
      result.forEach((mensaje) => {
        messages.push(mensaje.dataValues);
      });
      messages = JSON.stringify(messages);
      client.send(messages);
    });
  });
};

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      message = JSON.parse(message);
      const { error } = messageLogic.validateMessage(message);
      if (error) {
        const msgString = "Last error: " + error.details[0].message;
        ws.send(JSON.stringify({ error: msgString }));
        msgString.value = "";
      } else {
        messagePersistence.createMessage(message.message, message.author);
      }
      sendMessages();
    });
  });
};

exports.wsConnection = wsConnection;
exports.sendMessages = sendMessages;
