# CRUD

## Endpoints

### Cliente

Todos os endpoints seguem o mesmo padrão, mudando apenas a entidade a qual se direciona

Entidades: produto, cliente, venda, formaPagamento

- `PUT /entidade/editar/:id`

  - Description: Usado para editar os dados
  - Parameters: Apenas o id cadastrado da entidade
  - Responses: Retorna apenas as mensagens de sucesso ou erro.

- `POST /"entidade"/novo`

  - Description: Usado para criar os dados

  - Responses:

- `DELETE /"entidade"/delete/:id`

  - Description:
  - Parameters:
  - Responses:

- `GET /"entidade"/filtradoAll`

  - Description: Usado para pegar o que já foi salvo e popular as grids
  - Responses: Retorna todos os registros de uma determinada entidade

- `GET /"entidade"/filtrado/:id`

  - Description: Usado para pegar um registro a partir de seu respectivo id
  - Parameters: Apenas o id cadastrado da entidade
  - Responses: Retorna os dados do registro encontrado pelo id

- Exemplos de uso de cada metodo

### novo

- `POST /cliente/novo`:
  {
  "nome": "teste",
  "cpf": "321321321",
  "endereco": {
  "rua": "teste",
  "numero": "321321",
  "bairro": "teste",
  "cidade": "Concórdia",
  "estado": "SC",
  "cep": "89709162"
  },
  "email": "handryos12@gmail.com"
  }
- `POST  /formaPagamento/novo`:
  {
  "nome": "testess",
  "parcelas": 222,

  }

- `POST  /produto/novo`:
  {
  "nome": "testess",
  "quantidade": 222,
  "preco": 222
  }

- `POST  /venda/novo`:
  {
  "total": 4884,
  "produtos": [
  {
  "codigo": 8,
  "quantidade": 22
  }
  ],
  "formaPagamentoId": 3,
  "clienteId": 25
  }

## editar

- `PUT /cliente/editar/:id`:
  {
  "nome": "teste",
  "cpf": "321321321",
  "endereco": {
  "rua": "teste",
  "numero": "321321",
  "bairro": "teste",
  "cidade": "Concórdia",
  "estado": "SC",
  "cep": "89709162"
  },
  "email": "handryos12@gmail.com"
  }
- `PUT /formaPagamento/editar/:id`:
  {
  "nome": "testess",
  "parcelas": 222,
  }
- `PUT /produto/editar/:id`:
  {
  "nome": "testess",
  "quantidade": 222,
  "preco": 222
  }

- `PUT /venda/editar/:id`:
  {
  "total": 4884,
  "produtos": [
  {
  "codigo": 8,
  "quantidade": 22
  }
  ],
  "formaPagamentoId": 3,
  "clienteId": 25
  }

## delete

- `DELETE /cliente/delete/:id`:
  {
  "nome": "teste",
  "cpf": "321321321",
  "endereco": {
  "rua": "teste",
  "numero": "321321",
  "bairro": "teste",
  "cidade": "Concórdia",
  "estado": "SC",
  "cep": "89709162"
  },
  "email": "handryos12@gmail.com"
  }
- `DELETE /formaPagamento/delete/:id`:
  {
  "nome": "testess",
  "parcelas": 222,
  }
- `DELETE /produto/delete/:id`:
  {
  "nome": "testess",
  "quantidade": 222,
  "preco": 222
  }

- `DELETE /venda/delete/:id`:
  {
  "total": 4884,
  "produtos": [
  {
  "codigo": 8,
  "quantidade": 22
  }
  ],
  "formaPagamentoId": 3,
  "clienteId": 25
  }

## filtradoAll

- `GET /cliente/filtradoAll`

- `GET /produto/filtradoAll`

- `GET /venda/filtradoAll`

- `GET /formaPagamento/filtradoAll`

## filtrado

- `GET /cliente/filtrado/id`

- `GET /produto/filtrado/id`

- `GET /venda/filtrado/id`

- `GET /formaPagamento/filtrado/id`
