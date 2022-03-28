const yup = require("./yup");

const squemaEditarUsuario = yup.object().shape({
  nome: yup.string().required("O campo nome é obrigatório!"),
  email: yup.string().email().required("O campo email é obrigatório!"),
  senha: yup.string().strict(),
  cpf: yup.string(),
  telefone: yup.string().max(15)
});

module.exports = squemaEditarUsuario;