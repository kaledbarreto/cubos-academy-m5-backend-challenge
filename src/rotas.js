const express = require("express");
const {
  cadastrarUsuario,
  editarUsuario,
  listarUsuarios
} = require("./controladores/usuarios");
const { loginUsuario } = require("./controladores/loginUsuario");
const { verificaLoginUsuario } = require("./filtros/verificaLoginUsuario");
const {
  cadastrarCliente,
  editarCliente,
  listarClientes,
  listarCliente,
  mudarStatusCliente
} = require("./controladores/clientes");
const {
  cadastrarCobranca,
  listarCobrancas,
  listarCobranca,
  editarCobranca,
  excluirCobranca,
  mudarNomeClienteEmCobrancas
} = require("./controladores/cobrancas");

const rotas = express();

rotas.post("/usuarios", cadastrarUsuario);
rotas.post("/loginusuario", loginUsuario);

rotas.post("/clientes", cadastrarCliente);
rotas.put("/clientes/:id", editarCliente);
rotas.get("/clientes", listarClientes);
rotas.get("/:id/clientes", listarCliente);
rotas.put("/:id/clientes", mudarStatusCliente);

rotas.post("/:id/cobrancas", cadastrarCobranca);
rotas.get("/cobrancas", listarCobrancas);
rotas.get("/cobrancas/:id", listarCobranca);
rotas.put("/cobrancas/:id", editarCobranca);
rotas.delete("/cobrancas/:id", excluirCobranca);
rotas.put("/nomeclientecobranca/:id", mudarNomeClienteEmCobrancas);

rotas.use(verificaLoginUsuario);

rotas.put("/usuarios", editarUsuario);
rotas.get("/usuarios", listarUsuarios);

module.exports = rotas;
