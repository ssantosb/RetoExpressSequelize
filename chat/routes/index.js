const express = require("express");
const router = express.Router();
const messageLogic = require("../logic/messageLogic");
const messagePersistence = require("../persistence/messagePersistence");
const ws = require("../../wslib");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//Get todos los mensajes
router.get("/chat/api/messages", (req, res) => {
  messagePersistence.getMessages().then((res2) => {
    res.send(res2);
  });
});

//Get de un mensaje con ts dado
router.get("/chat/api/messages/:id", (req, res) => {
  messagePersistence.getMessage(req.params.id).then((res2) => {
    if (res2.length === 0)
      return res.status(404).send("No se encontro el mensaje");
    res.send(response);
  });
});

//Post de un nuevo mensaje
router.post("/chat/api/messages", (req, res) => {
  if (!messageLogic.validarMensaje(req.body)) {
    return res.status(400).send(messageLogic.validarMensaje(req.body));
  }
  messagePersistence
    .createMessage(req.body.message, req.body.author)
    .then((res2) => {
      ws.sendMessages();
      res.send(res2);
    });
});

//Put de un mensaje con el id dado por url
router.put("/chat/api/messages/:id", (req, res) => {
  const { error } = messageLogic.validateMessage(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  messagePersistence.updateMessage(req.body, req.params.id).then((response) => {
    if (response[0] !== 0) {
      ws.sendMessages();
      res.send({ message: "Message actualizado" });
    } else {
      res.status(404).send("Message no fue encontrado :(");
    }
  });
});

router.delete("/chat/api/messages/:id", (req, res) => {
  messagePersistence.deleteMessage(req.params.id).then((res2) => {
    if (res2 === 1) {
      ws.sendMessages();
      res.status(204).send();
    } else {
      res - status(404).send("Message no fue encontrado :(");
    }
  });
});

express().listen(3001, () => console.log("Escuchando en el puerto 3001"));
express().use(express.json());
module.exports = router;
