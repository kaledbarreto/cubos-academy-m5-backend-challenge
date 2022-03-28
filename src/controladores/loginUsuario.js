const knex = require("../bacodedados/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../jwt_secret");
const squemaLoginUsuario = require("../validacoes/squemaLoginUsuario");

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    await squemaLoginUsuario.validate(req.body);

    const usuario = await knex("usuarios").where({ email }).first();
    if (!usuario) return res.status(404).json("Email ou senha incorretos!");

    const senhaVerificada = await bcrypt.compare(senha, usuario.senha);
    if (!senhaVerificada) return res.status(400).json("Email ou senha incorretos!");

    const token = jwt.sign({ id: usuario.id }, jwtSecret, { expiresIn: "30d" });

    return res.status(200).json({ "token": token });

  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  loginUsuario
}