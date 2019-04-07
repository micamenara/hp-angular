"user strict";
const jwt = require("jwt-simple");
const moment = require("moment");
const secret = "clave_secreta_";

exports.ensureAuth = function(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "La peticion no tiene la cabecera de autenticación" });
  } else {
    const token = req.headers.authorization.replace(/['"]+/g, "");
    try {
      const payload = jwt.decode(token, secret);
      if (payload.exp > moment().unix()) {
        return res.status(401).send({
          message: "EL token ha expirado"
        });
      }
    } catch (ex) {
      return res.status(404).send({
        message: "EL token no es valido"
      });
    }
    req.user = payload;
    next();
  }
};
