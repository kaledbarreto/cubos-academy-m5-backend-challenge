CREATE DATABASE desafio_m05;

CREATE TABLE IF NOT EXISTS usuarios (
 	id SERIAL PRIMARY KEY,
  	nome TEXT NOT NULL,
  	email TEXT NOT NULL UNIQUE,
  	senha TEXT NOT NULL,
  	cpf TEXT,
  	telefone TEXT
);

CREATE TABLE IF NOT EXISTS clientes (
 	id SERIAL PRIMARY KEY,
  	nome TEXT NOT NULL,
  	email TEXT NOT NULL UNIQUE,
  	cpf TEXT NOT NULL,
  	telefone TEXT NOT NULL,
  	cep TEXT,
  	logradouro TEXT,
  	complemento TEXT,
  	bairro TEXT,
  	cidade TEXT,
  	estado TEXT,
  	statuscliente TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cobrancas (
	id SERIAL PRIMARY KEY,
  	cliente_id INTEGER NOT NULL REFERENCES clientes(id),
  	nomecliente TEXT NOT NULL,
  	descricao TEXT NOT NULL,
  	statuscobranca TEXT NOT NULL,
  	valor TEXT NOT NULL,
  	vencimento TIMESTAMP NOT NULL
);