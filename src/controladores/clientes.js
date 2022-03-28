const knex = require("../bacodedados/conexao");
const squemaCadastrarEditarCliente = require("../validacoes/squemaCadastrar-EditarCliente");

const cadastrarCliente = async (req, res) => {
  const {
    nome,
    email,
    cpf,
    telefone,
    cep,
    logradouro,
    complemento,
    bairro,
    cidade,
    estado,
    statuscliente
  } = req.body;

  try {
    await squemaCadastrarEditarCliente.validate(req.body);

    const verificaEmailUnico = await knex("clientes").where({ email }).first();
    if (verificaEmailUnico) return res.status(400).json(`O email '${email}', já foi cadastrado!`);

    const verificaCpfUnico = await knex("clientes").where({ cpf }).first();
    if (verificaCpfUnico) return res.status(400).json(`O cpf '${cpf}', já foi cadastrado!`);

    const cliente = await knex("clientes").insert({
      nome,
      email,
      cpf,
      telefone,
      cep,
      logradouro,
      complemento,
      bairro,
      cidade,
      estado,
      statuscliente
    });
    if (!cliente) return res.status(400).json("Não foi possível cadastrar o cliente!");

    return res.status(200).json("Cliente cadastrado com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const editarCliente = async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    email,
    cpf,
    telefone,
    cep,
    logradouro,
    complemento,
    bairro,
    cidade,
    estado
  } = req.body;

  try {
    await squemaCadastrarEditarCliente.validate(req.body);

    const cliente = await knex("clientes").where({ id }).first();
    if (!cliente) return res.status(404).json("Cliente não encontrado!");

    if (email !== cliente.email) {
      const verificaEmailUnico = await knex("clientes").where({ email }).first();
      if (verificaEmailUnico) return res.status(400).json(`O email '${email}', já foi cadastrado!`);
    }

    if (cpf !== cliente.cpf) {
      const verificaCpfUnico = await knex("clientes").where({ cpf }).first();
      if (verificaCpfUnico) return res.status(400).json(`O cpf '${cpf}', já foi cadastrado!`);
    }

    const clienteEditado = await knex("clientes").where({ id }).update({
      nome,
      email,
      cpf,
      telefone,
      cep,
      logradouro,
      complemento,
      bairro,
      cidade,
      estado
    });
    if (!clienteEditado) return res.status(400).json("Não foi possível editar o cliente!");

    return res.status(200).json("Cliente editado com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const listarClientes = async (req, res) => {
  try {
    const statusCliente = await knex("clientes");

    return res.status(200).json(statusCliente);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const listarCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await knex("clientes").where({ id }).first();
    if (!cliente) return res.status(400).json("Cliente não encontrado!");

    const cobranca = await knex("cobrancas")
      .select(
        "id",
        "descricao",
        "statuscobranca",
        "valor",
        "vencimento",
        "cliente_id",
        "nomecliente"
      )
      .where("cliente_id", cliente.id);
    cliente.cobrancas = cobranca;
    return res.status(200).json(cliente);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const mudarStatusCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await knex("clientes").where({ id }).first();
    if (!cliente) return res.status(400).json("Cliente não encontrado!");

    const cobranca = await knex("cobrancas")
      .select(
        "id",
        "descricao",
        "statuscobranca",
        "valor",
        "vencimento"
      )
      .where("cliente_id", cliente.id);
    cliente.cobrancas = cobranca;

    for (let i = 0; i < cobranca.length; i++) {
      if (cobranca[i].statuscobranca == "Vencida") {
        cliente.statuscliente = "Inadimplente";
      } else {
        cliente.statuscliente = "Em dia";
      }
    }

    const clienteEditado = await knex("clientes").where({ id }).update({
      statuscliente: cliente.statuscliente
    });
    if (!clienteEditado) return res.status(400).json("O cliente não foi editado!");

    return res.status(200).json("Status do cliente atualizado!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarCliente,
  editarCliente,
  listarClientes,
  listarCliente,
  mudarStatusCliente
};
