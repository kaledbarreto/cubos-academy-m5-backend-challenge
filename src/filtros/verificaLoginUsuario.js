const knex = require("../bacodedados/conexao");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../jwt_secret");

const verificaLoginUsuario = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization === "Bearer") return res.status(401).json("Token não informado!");

  try {
    const token = authorization.replace("Bearer", "").trim();

    const { id } = jwt.verify(token, jwtSecret);

    const usuarioExiste = await knex("usuarios").where({ id }).first();
    if (!usuarioExiste) return res.status(404).json("Usuário não encontrado!");

    const { senha, ...usuario } = usuarioExiste;

    req.usuario = usuario;

    next();

  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  verificaLoginUsuario
}