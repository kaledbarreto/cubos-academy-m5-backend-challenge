const yup = require("./yup");

const squemaCadastrarUsuario = yup.object().shape({
  nome: yup.string().required("O campo nome é obrigatório!"),
  email: yup.string().email().required("O campo email é obrigatório!"),
  senha: yup.string().min(8).strict().required("O campo senha é obrigatório!"),
  cpf: yup.string(),
  telefone: yup.string().max(15)
});

module.exports = squemaCadastrarUsuario;