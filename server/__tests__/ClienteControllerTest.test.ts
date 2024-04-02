import request from "supertest";
import { app } from "../api/src/app";
import Database from "../api/src/db";
import { User } from "../api/src/models/User";
import sigIn from "../api/src/session/sigIn";
import { Cliente } from "../api/src/models/Cliente";

describe("Testes Post Cliente Controller ", () => {
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

  const generateRandomNumber = (): string => {
    const randomNumber = Math.floor(Math.random() * 10000000000);
    const paddedNumber = randomNumber.toString().padStart(10, "0");
    return paddedNumber;
  };

  const randomNumber = generateRandomNumber();

  const randomString = generateRandomString(8);

  beforeAll(async () => {
    db = new Database();
    await db.connectToPostgreSQL();
  });

  afterAll(async () => {
    db.sequelize?.close();
  });

  test("Deve criar um novo Cliente", async () => {
    const newClienteData = {
      nome: randomString,
      cpf: randomNumber,
      endereco: {
        rua: "123 Main St",
        cidade: "Anytown",
        estado: "NY",
        cep: "12345",
      },
      email: "teste@example.com",
      cep: "12345",
    };

    const response = await request(app)
      .post("/services/cliente/novo")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token} `)
      .send(newClienteData);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Sucesso!");
    expect(response.body.message).toBe("Cliente Cadastrado com Sucesso!");
    expect(response.body.cliente.nome).toBe(newClienteData.nome);

    const createdCliente = await Cliente.findOne({
      where: { nome: newClienteData.nome },
    });
    expect(createdCliente?.nome).toBe(createdCliente?.nome);
    expect(createdCliente?.cpf).toBe(createdCliente?.cpf);
  });
});

describe("Testes Put Cliente Controller ", () => {
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

  test("Deve atualizar o cliente com id 1", async () => {
    const newClienteData = {
      nome: "sofia",
      cpf: "1234678321",
      endereco: {
        rua: "123 Main St",
        cidade: "Anytown",
        estado: "NY",
        cep: "12345",
      },
      email: "john@example.com",
      cep: "12345",
    };

    const response = await request(app)
      .put("/services/cliente/editar/1")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token} `)
      .send(newClienteData);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Sucesso!");
    expect(response.body.cliente.nome).toBe(newClienteData.nome);

    const createdCliente = await Cliente.findOne({
      where: { nome: newClienteData.nome },
    });
    expect(createdCliente?.nome).toBe(newClienteData?.nome);
    expect(createdCliente?.cpf).toBe(newClienteData.cpf);
  });
});

describe("Testes filtradoAll Cliente Controller ", () => {
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

  test("Deve retornar 200, significando que todos os clientes serão retornados", async () => {
    const response = await request(app)
      .get("/services/cliente/filtradoAll")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token} `);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Ok!");
  });
});

describe("Testes GetById Cliente Controller ", () => {
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

  test("Deve pesquisar pelo cliente com id 1, caso retorne 200, o cliente existe", async () => {
    const response = await request(app)
      .get("/services/cliente/filtrado/1")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token} `);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Sucesso!");
  });
});
