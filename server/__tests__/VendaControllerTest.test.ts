import request from "supertest";
import { app } from "../api/src/app";
import Database from "../api/src/db";
import { User } from "../api/src/models/User";
import sigIn from "../api/src/session/sigIn";
import { Venda } from "../api/src/models/Venda";

describe("Testes Post Venda Controller ", () => {
  let db: Database;
  const user = new User();
  user.name = "user";
  user.password = "root";

  const token = sigIn(user.toJSON());

  beforeAll(async () => {
    db = new Database();
    await db.connectToPostgreSQL();
  });

  afterAll(async () => {
    db.sequelize?.close();
  });

  test("Deve criar uma nova Venda", async () => {
    const newVendaData = {
      clienteId: 1,
      produtos: [
        {
          codigo: 4,
          quantidade: 1,
        },
        {
          codigo: 5,
          quantidade: 10000000,
        },
      ],
      formaPagamentoId: 1,
      parcelas: 3,
      total: 50043213,
    };

    const response = await request(app)
      .post("/services/venda/novo")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token} `)
      .send(newVendaData);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Sucesso!");
    expect(response.body.message).toBe("Venda Cadastrada!");
    expect(response.body.venda.clienteId).toBe(newVendaData.clienteId);
  });
});

describe("Testes filtradoAll Venda Controller ", () => {
  let db: Database;
  const user = new User();
  user.name = "user";
  user.password = "root";

  const token = sigIn(user.toJSON());

  beforeAll(async () => {
    db = new Database();
    await db.connectToPostgreSQL();
  });

  afterAll(async () => {
    db.sequelize?.close();
  });

  test("Deve retornar 200, significando que todos as vendas serão retornados", async () => {
    const response = await request(app)
      .get("/services/venda/filtradoAll")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token} `);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Ok!");
  });
});
