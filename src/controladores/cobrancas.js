const knex = require("../bacodedados/conexao");
const squemaCadastrarCobranca = require("../validacoes/squemaCadastrarCobranca");
const squemaEditarCobranca = require("../validacoes/squemaEditarCobranca");

const cadastrarCobranca = async (req, res) => {
  const { id } = req.params;
  const { descricao, statuscobranca, valor, vencimento, nomecliente } = req.body;

  try {
    await squemaCadastrarCobranca.validate(req.body);

    const nomeCliente = await knex("clientes").where({ id }).select("nome").first();
    if (!nomeCliente) return res.status(400).json("Cliente não encontrado!");

    const cobranca = await knex("cobrancas").insert({
      cliente_id: id,
      nomecliente: nomeCliente.nome,
      descricao,
      statuscobranca,
      valor,
      vencimento
    });
    if (!cobranca) return res.status(404).json("Não foi possível cadastrar a cobrança!");

    return res.status(200).json("Cobrança cadastrada com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const listarCobrancas = async (req, res) => {
  try {
    const cobrancas = await knex("cobrancas");

    return res.status(200).json(cobrancas);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const listarCobranca = async (req, res) => {
  const { id } = req.params;

  try {
    const cobranca = await knex("cobrancas")
      .select(
        "id",
        "nomecliente",
        "descricao",
        "statuscobranca",
        "valor",
        "vencimento"
      )
      .where({ id })
      .first();

    return res.status(200).json(cobranca);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const editarCobranca = async (req, res) => {
  const { id } = req.params;
  const { descricao, statuscobranca, valor, vencimento } = req.body;

  try {
    await squemaEditarCobranca.validate(req.body);

    const cobrancaEditada = await knex("cobrancas").where({ id }).update({
      descricao,
      statuscobranca,
      valor,
      vencimento
    });
    if (!cobrancaEditada) return res.status(400).json("Não foi possível editar a cobrança!");

    return res.status(200).json("Cobrança editada com suceso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const excluirCobranca = async (req, res) => {
  const { id } = req.params;

  try {
    const cobranca = await knex("cobrancas").where({ id }).first();
    if (!cobranca) return res.status(400).json("Cobrança não encontrada!");

    const cobrancaExcluida = await knex("cobrancas").where({ id }).delete();
    if (!cobrancaExcluida) return res.status(400).json("Não foi possível excluir a cobrança!");

    return res.status(200).json("Cobrança excluída com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const mudarNomeClienteEmCobrancas = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await knex("clientes").select("nome", "id").where({ id }).first();
    if (!cliente) return res.status(400).json("Cliente não encontrado!")

    const nomeClienteEditado = await knex("cobrancas").where("cliente_id", cliente.id).update({
      nomecliente: cliente.nome
    });

    return res.status(200).json("Nome do cliente editado com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarCobranca,
  listarCobrancas,
  listarCobranca,
  editarCobranca,
  excluirCobranca,
  mudarNomeClienteEmCobrancas
};
