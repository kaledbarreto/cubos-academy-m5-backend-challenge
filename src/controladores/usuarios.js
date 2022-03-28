const knex = require("../bacodedados/conexao");
const bcrypt = require("bcrypt");
const squemaCadastrarUsuario = require("../validacoes/squemaCadastrarUsuario");
const squemaEditarUsuario = require("../validacoes/squemaEditarUsuario");

const listarUsuarios = async (req, res) => {
  const { usuario } = req;
  return res.status(200).json(usuario);
}

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha, cpf, telefone } = req.body;

  try {
    await squemaCadastrarUsuario.validate(req.body);

    const verificaEmailUnico = await knex("usuarios").where({ email }).first();
    if (verificaEmailUnico) return res.status(400).json(`O email '${email}', já foi cadastrado!`);

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await knex("usuarios").insert({
      nome,
      email,
      senha: senhaCriptografada,
      cpf,
      telefone
    });
    if (!usuario) return res.status(404).json("Não foi possível cadastrar o usuário!");

    return res.status(200).json("Usuário cadastrado com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const editarUsuario = async (req, res) => {
  let { nome, email, senha, cpf, telefone } = req.body;
  const { id } = req.usuario;

  try {
    await squemaEditarUsuario.validate(req.body);

    const usuarioExiste = await knex("usuarios").where({ id }).first();
    if (!usuarioExiste) return res.status(404).json("Usuário não encontrado!");

    if (email !== req.usuario.email) {
      const verificaEmailUnico = await knex("usuarios").where({ email }).first();
      if (verificaEmailUnico) return res.status(400).json(`O email '${email}', já foi cadastrado!`);
    }

    if (cpf > 0 && cpf !== req.usuario.cpf) {
      const verificaCpfUnico = await knex("usuarios").where({ cpf }).first();
      if (verificaCpfUnico) return res.status(400).json(`O cpf '${cpf}', já foi cadastrado!`);
    }

    if (senha && senha !== "") {
      senha = await bcrypt.hash(senha, 10);
    } else {
      senha = undefined;
    }

    const usuarioEditado = await knex("usuarios").where({ id }).update({
      nome,
      email,
      senha,
      cpf,
      telefone
    });
    if (!usuarioEditado) return res.status(400).json("O usuario não foi editado");

    return res.status(200).json("Usuário editado com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarUsuario,
  editarUsuario,
  listarUsuarios
};
