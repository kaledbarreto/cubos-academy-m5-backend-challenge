const yup = require("./yup");

const squemaCadastrarCobranca = yup.object().shape({
  descricao: yup.string().required("O campo descrição é obrigatório!"),
  statuscobranca: yup.string().required("O campo status é obrigatório!"),
  valor: yup.string().required("O campo valor é obrigatório!"),
  vencimento: yup.string().required("O campo vencimento é obrigatório!"),
  nomecliente: yup.string().required("O campo nome é obrigatório!")
});

module.exports = squemaCadastrarCobranca;