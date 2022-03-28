const yup = require("./yup");

const squemaLoginUsuario = yup.object().shape({
  email: yup.string().required("O campo email é obrigatório!"),
  senha: yup.string().strict().required("O campo senha é obrigatório!")
});

module.exports = squemaLoginUsuario;