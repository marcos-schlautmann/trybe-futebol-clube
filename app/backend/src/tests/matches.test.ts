import * as chai from 'chai';
import * as sinon from 'sinon';

// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import MatchesSequelizeModel from '../database/models/matches.models';
import UserSequelizeModel from '../database/models/users.model';
import { user, validLoginBody } from '../tests/mocks/userMock';

import { match, matches } from '../tests/mocks/matchesMock';

chai.use(chaiHttp);

const { expect } = chai;

describe.only('Testando todas as rotas /matches', function () {
  afterEach(() => {
    sinon.restore();
  });

  let chaiHttpResponse: Response;

  describe('Testa a rota /matches', function () {
    it('Testa se retorna todas as partidas', async function () {
      sinon.stub(UserSequelizeModel, 'findOne').resolves(user as any);

      const token = await chai.request(app).post('/login').send(validLoginBody);

      sinon.stub(MatchesSequelizeModel, 'findAll').resolves(matches as any);

      chaiHttpResponse = await chai
        .request(app)
        .get('/matches')
        .set('Authorization', 'Bearer' + token);

      expect(chaiHttpResponse.status).to.eq(200);
      expect(chaiHttpResponse.body).to.deep.eq(match);
    });

    it('Testa se finaliza a partida passando o ID', async function () {
      sinon.stub(UserSequelizeModel, 'findOne').resolves(user as any);

      const token = await chai.request(app).post('/login').send(validLoginBody);

      sinon.stub(MatchesSequelizeModel, 'findOne').resolves(match as any);

      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/finish')
        .set('Authorization', 'Bearer' + token);

      expect(chaiHttpResponse.status).to.eq(200);
      expect(chaiHttpResponse.body).to.deep.eq({ message: 'Finished' });
    });
      
       it('Testa se faz update de uma partida com sucesso', async function () {
         sinon.stub(UserSequelizeModel, 'findOne').resolves(user as any);

         const token = await chai
           .request(app)
           .post('/login')
           .send(validLoginBody);

         sinon.stub(MatchesSequelizeModel, 'findOne').resolves(match as any);

         chaiHttpResponse = await chai
           .request(app)
           .patch('/matches/1')
           .set('Authorization', 'Bearer' + token);

         expect(chaiHttpResponse.status).to.eq(200);
         expect(chaiHttpResponse.body).to.deep.eq(match);
       });
      
       it("Testa se foi criado uma partida com sucesso", async function () {
         sinon.stub(UserSequelizeModel, "findOne").resolves(user as any);

         const token = await chai
           .request(app)
           .post("/login")
           .send(validLoginBody);

         sinon.stub(MatchesSequelizeModel, "findOne").resolves(match as any);

         chaiHttpResponse = await chai
           .request(app)
           .post("/matches")
           .set("Authorization", "Bearer" + token);

         expect(chaiHttpResponse.status).to.eq(201);
         expect(chaiHttpResponse.body).to.deep.eq(match);
       });      
  });
});
