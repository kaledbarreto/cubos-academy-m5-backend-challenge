const yup = require("./yup");

const squemaCadastrarEditarCliente = yup.object().shape({
  nome: yup.string().required("O campo nome é obrigatório!"),
  email: yup.string().email().required("O campo email é obrigatório!"),
  cpf: yup.string().required("O campo cpf é obrigatório!"),
  telefone: yup.string().required("O campo telefone é obrigatório!"),
  cep: yup.string(),
  logradouro: yup.string(),
  complemento: yup.string(),
  bairro: yup.string(),
  cidade: yup.string(),
  estado: yup.string()
});

module.exports = squemaCadastrarEditarCliente;