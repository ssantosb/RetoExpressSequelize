//Lógica de Message. Se verifican con Joi las reglas que se le aplican a los mensajes manejados en el chat
const Joi = require("joi");

const validarMensaje = function (mensaje) {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    author: Joi.string()
      .pattern(new RegExp("([a-zA-Z]+[ ][a-zA-Z]+)"))
      .required(),
    ts: Joi.number().required(),
  });

  return schema.validate(mensaje);
};
exports.validarMensaje = validarMensaje;
