import * as bcrypt from "bcryptjs";
import * as chai from "chai";
import * as sinon from "sinon";

const chaiHttp = require("chai-http");

import { describe } from "mocha";
import { app } from "../../src/app";
import UsersSequelizeModel from "../database/models/users.model";
import {
    invalidEmailLoginBody,
    invalidPasswordLoginBody,
    noFields,
    user,
    validLoginBody,
} from "../tests/mocks/userMock";

chai.use(chaiHttp);

const { expect } = chai;

describe.only("Testando funcionamento do login de User", function () {
  afterEach(() => {
    sinon.restore();
  });

  describe("Testando casos de /login e /role ", function () {
    it("Testa se faz o login com login valido", async function () {
      sinon.stub(bcrypt, "compareSync").returns(true);
      sinon
        .stub(UsersSequelizeModel, "findOne")
        .resolves(user as UsersSequelizeModel);

      const loginData = validLoginBody;

      const { status, body } = await chai
        .request(app)
        .post("/login")
        .send(loginData);

      expect(status).to.be.eq(200);
      expect(body).to.haveOwnProperty("token");
    });

    it("Testa se lança o erro ao entra com email inválido", async function () {
      sinon.stub(UsersSequelizeModel, "findOne").resolves(user as any);

      const { status, body } = await chai
        .request(app)
        .post("/login")
        .send(invalidEmailLoginBody);

      expect(status).to.be.eq(401);
      expect(body).to.deep.eq({
        message: "Invalid email or password",
      });
    });

    it("Testa se lança o erro ao entra com email inexistente", async function () {
      sinon.stub(UsersSequelizeModel, "findOne").resolves(null);

      const { status, body } = await chai
        .request(app)
        .post("/login")
        .send(invalidEmailLoginBody);

      expect(status).to.be.eq(401);
      expect(body).to.deep.eq({
        message: "Invalid email or password",
      });
    });

    it("Testa se lança o erro ao entra com password inválido", async function () {
      sinon.stub(UsersSequelizeModel, "findOne").resolves(user as any);

      const { status, body } = await chai
        .request(app)
        .post("/login")
        .send(invalidPasswordLoginBody);

      expect(status).to.be.eq(401);
      expect(body).to.deep.eq({
        message: "Invalid email or password",
      });
    });

    it("Testa se lança o erro ao nao passar email e/ou senha", async function () {
      sinon.stub(UsersSequelizeModel, "findOne").resolves(user as any);

      const { status, body } = await chai
        .request(app)
        .post("/login")
        .send(noFields);

      expect(status).to.be.eq(400);
      expect(body).to.deep.eq({
        message: "All fields must be filled",
      });
    });

    it("Testa se lança o erro ao nao passar token", async function () {
      const { status, body } = await chai.request(app).get("/login/role");

      expect(status).to.be.eq(401);
      expect(body).to.deep.eq({
        message: "Token not found",
      });
    });
  });
});
