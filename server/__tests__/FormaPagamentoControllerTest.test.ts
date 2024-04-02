import request from "supertest";
import { app } from "../api/src/app";
import Database from "../api/src/db";
import { User } from "../api/src/models/User";
import sigIn from "../api/src/session/sigIn";
import { Produto } from "../api/src/models/Produto";
import { FormaPagamento } from "../api/src/models/FormaPagamento";

describe("Testes Post Produto Controller ", () => {
  let db: Database;
  const user = new User();
  user.name = "user";
  user.password = "root";

  const token = sigIn(user.toJSON());

  const generateRandomString = (length: number): string => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };

  const randomString = generateRandomString(8);

  beforeAll(async () => {
    db = new Database();
    await db.connectToPostgreSQL();
  });

  afterEach(async () => {
    db.sequelize?.close();
  });

  test("Deve criar uma nova forma de pagamento", async () => {
    const newFormaData = {
      nome: randomString,
      parcelas: 10,
    };

    const response = await request(app)
      .post("/services/formaPagamento/novo")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token} `)
      .send(newFormaData);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Sucesso!");
    expect(response.body.message).toBe(
      "Forma de psagamento Cadastrado com Sucesso!"
    );
    expect(response.body.formaPagamento.nome).toBe(newFormaData.nome);

    const createdForma = await FormaPagamento.findOne({
      where: { nome: newFormaData.nome },
    });
    expect(createdForma?.nome).toBe(newFormaData.nome);
    expect(createdForma?.parcelas).toBe(newFormaData.parcelas);
  });
});

describe("Testes Put FormaPagamento Controller ", () => {
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

  test("Deve atualizar a forma de pagamento com id 1", async () => {
    const newFormaData = {
      nome: "teste",
      parcelas: 10,
    };

    const response = await request(app)
      .put("/services/formaPagamento/editar/1")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token} `)
      .send(newFormaData);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Sucesso!");
    expect(response.body.formaPagamento.nome).toBe(newFormaData.nome);

    const createdForma = await FormaPagamento.findOne({
      where: { nome: newFormaData.nome },
    });
    expect(createdForma?.nome).toBe(newFormaData.nome);
    expect(createdForma?.parcelas).toBe(newFormaData.parcelas);
  });
});

describe("Testes filtradoAll FormaPagamento Controller ", () => {
  let db: Database;
  const user = new User();
  user.name = "user";
  user.password = "root";

  const token = sigIn(user.toJSON());

  beforeAll(async () => {
    db = new Database();
    await db.connectToPostgreSQL();
  });

  afterEach(async () => {
    db.sequelize?.close();
  });

  test("Deve retornar 200, significando que todos as formas de pagamento serão retornados", async () => {
    const response = await request(app)
      .get("/services/formaPagamento/filtradoAll")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token} `);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Ok!");
  });
});

describe("Testes GetById Forma Pagamento Controller ", () => {
  let db: Database;
  const user = new User();
  user.name = "user";
  user.password = "root";

  const token = sigIn(user.toJSON());

  beforeAll(async () => {
    db = new Database();
    await db.connectToPostgreSQL();
  });

  afterEach(async () => {
    db.sequelize?.close();
  });

  test("Deve pesquisar pelo Forma Pagamento com id 1", async () => {
    const response = await request(app)
      .get("/services/formaPagamento/filtrado/1")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token} `);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Sucesso!");
  });
});
