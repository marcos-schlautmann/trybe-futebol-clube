import * as chai from "chai";
import * as sinon from "sinon";

// @ts-ignore
import chaiHttp = require("chai-http");

import { Response } from "superagent";
import { app } from "../app";
import MatchesSequelizeModel from "../database/models/matches.models";
import UserSequelizeModel from "../database/models/users.model";
import { user } from "../tests/mocks/userMock";

import {
  createMatch,
  match,
  matches,
  token,
  updateMatchesBody,
} from "../tests/mocks/matchesMock";

chai.use(chaiHttp);

const { expect } = chai;

describe.only("Testando todas as rotas /matches", function () {
  afterEach(() => {
    sinon.restore();
  });

  let chaiHttpResponse: Response;

  describe("Testa a rota /matches", function () {
    it("Testa se retorna todas as partidas", async function () {
      sinon.stub(UserSequelizeModel, "findOne").resolves(user as any);

      sinon.stub(MatchesSequelizeModel, "findAll").resolves(matches as any);

      chaiHttpResponse = await chai
        .request(app)
        .get("/matches")
        .set("Authorization", "Bearer " + token);

      expect(chaiHttpResponse.status).to.eq(200);
      expect(chaiHttpResponse.body).to.deep.eq(matches);
    });

    it("Testa se finaliza a partida passando o ID", async function () {
      sinon.stub(UserSequelizeModel, "findOne").resolves(user as any);

      // const {
      //   body: { token },
      // } = await chai.request(app).post("/login").send(validLoginBody);

      sinon.stub(MatchesSequelizeModel, "findOne").resolves(match as any);

      const { status, body } = await chai
        .request(app)
        .patch("/matches/1/finish")
        .set("Authorization", "Bearer " + token);

      expect(status).to.eq(200);
      expect(body).to.deep.eq({ message: "Finished" });
    });

    it("Testa se faz update de uma partida com sucesso", async function () {
      sinon.stub(UserSequelizeModel, "findOne").resolves(user as any);

      // const {
      //   body: { token },
      // } = await chai.request(app).post("/login").send(validLoginBody);

      sinon.stub(MatchesSequelizeModel, "findOne").resolves(match as any);

      chaiHttpResponse = await chai
        .request(app)
        .patch("/matches/1")
        .send(updateMatchesBody)
        .set("Authorization", "Bearer " + token);

      expect(chaiHttpResponse.status).to.eq(200);
      expect(chaiHttpResponse.body).to.deep.eq({ message: "Scores Updated!" });
    });

    it("Testa se foi criado uma partida com sucesso", async function () {
      sinon.stub(UserSequelizeModel, "findOne").resolves(user as any);

      // const {
      //   body: { token },
      // } = await chai.request(app).post("/login").send(validLoginBody);

      sinon.stub(MatchesSequelizeModel, "create").resolves(match as any);

      chaiHttpResponse = await chai
        .request(app)
        .post("/matches")
        .send(createMatch)
        .set("Authorization", "Bearer " + token);

      expect(chaiHttpResponse.status).to.eq(201);
      expect(chaiHttpResponse.body).to.deep.eq(match);
    });
  });
});
