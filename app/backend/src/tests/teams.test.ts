import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeTeam from '../database/models/teams.model';
import { teamMock, teamsMock } from '../tests/mocks/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota teams', function () {
    afterEach(() => {
        sinon.restore();
    })

    it('Testa se retorna todos os times', async function () {
        sinon.stub(SequelizeTeam, 'findAll').resolves(teamsMock as any);

        const { status, body } = await chai.request(app).get('/teams');

        expect(status).to.eq(200);
        expect(body).to.deep.eq(teamsMock);
    });

    it('Testa se retorna um time pelo id', async function () {
        sinon.stub(SequelizeTeam, 'findOne').resolves(teamMock as any);

        const { status, body } = await chai.request(app).get('/teams/1');

        expect(status).to.eq(200);
        expect(body).to.deep.eq(teamMock);
    });

    it('Testa se lança um erro caso nao encontre um time', async function () {
        sinon.stub(SequelizeTeam, 'findOne').resolves(null);

        const { status, body } = await chai.request(app).get('/teams/1');

        expect(status).to.eq(404);
        expect(body.message).to.equal('Team 1 not found');
    });
});
