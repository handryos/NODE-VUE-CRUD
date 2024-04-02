import request from "supertest";
import { app } from "../api/src/app";
import Database from "../api/src/db";
import { User } from "../api/src/models/User";
import sigIn from "../api/src/session/sigIn";
import { Produto } from "../api/src/models/Produto";

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

  test("Deve criar um novo produto", async () => {
    const newProdutoData = {
      nome: randomString,
      quantidade: 10,
      preco: 50.0,
    };

    const response = await request(app)
      .post("/services/produto/novo")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token} `)
      .send(newProdutoData);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Sucesso!");
    expect(response.body.message).toBe("Produto Cadastrado com Sucesso!");
    expect(response.body.produto.nome).toBe(newProdutoData.nome);

    const createdProduto = await Produto.findOne({
      where: { nome: newProdutoData.nome },
    });
    expect(createdProduto?.quantidade).toBe(newProdutoData.quantidade);
    expect(createdProduto?.preco).toBe(newProdutoData.preco);
  });
});

describe("Testes Put Produto Controller ", () => {
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

  test("Deve atualizar o produto com id 1", async () => {
    const newProdutoData = {
      nome: "atualizacao test",
      quantidade: 600,
      preco: 10,
    };

    const response = await request(app)
      .put("/services/produto/editar/1")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token} `)
      .send(newProdutoData);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Sucesso!");
    expect(response.body.produto.nome).toBe(newProdutoData.nome);

    const createdProduto = await Produto.findOne({
      where: { nome: newProdutoData.nome },
    });
    expect(createdProduto?.quantidade).toBe(newProdutoData.quantidade);
    expect(createdProduto?.preco).toBe(newProdutoData.preco);
  });
});

describe("Testes filtradoAll Produto Controller ", () => {
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

  test("Deve retornar 200, significando que todos os produtos serão retornados", async () => {
    const response = await request(app)
      .get("/services/produto/filtradoAll")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token} `);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Ok!");
  });
});

describe("Testes GetById Produto Controller ", () => {
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

  test("Deve pesquisar pelo produto com id 1", async () => {
    const response = await request(app)
      .get("/services/produto/filtrado/1")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token} `);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Sucesso!");
  });
});
