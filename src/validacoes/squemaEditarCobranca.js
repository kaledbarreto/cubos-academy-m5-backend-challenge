const yup = require("./yup");

const squemaEditarCobranca = yup.object().shape({
    descricao: yup.string().required("O campo descrição é obrigatório!"),
    statuscobranca: yup.string().required("O campo status é obrigatório!"),
    valor: yup.string().required("O campo valor é obrigatório!"),
    vencimento: yup.string().required("O campo vencimento é obrigatório!")
});

module.exports = squemaEditarCobranca;