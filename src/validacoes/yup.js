const yup = require("yup");
const { pt } = require("yup-locales");
const { setLocale } = require("yup");
setLocale(pt);
setLocale({
  string: {
    email: "Email inválido!",
    min: "A senha deve ter no mínimo 8 caracteres!"
  }
});

module.exports = yup;