O projeto TFC (Trybe Futebol Clube) é um site informativo sobre partidas e classificações de futebol.

## O que foi desenvolvido:

- Desenvolvimento de uma API via sequelize e POO utilizando o método TDD e também integrei com o docker-compose as aplicações (backend que desenvolvi e frontend já fornecido no projeto) para que funcionem utilizando o banco de dados.
  
- Desenvolvimento de autenticação para o login com o auxílio do JWT.

## Os seguintes endpoints foram desenvolvidos para a aplicação:

#### Teams:

- Endpoint `GET /teams` - onde retorna todos os times;
- Endpoint `GET /teams/:id` onde retorna dados de um time específico;

#### Login:

- Endpoint `POST /login` - para a pessoa usuária fazer login dentro da aplicação;
```
// exemplo de body que precisa ser enviado:
 {
   "email": "user@user.com",
   "password": "secret_user"
 }
```
- Endpoint `/login/role` para ver sua função (precisa enviar no cabeçalho um token válido);

#### Matches:

- Endpoint `GET /matches` - retorna todas as partidas;
- Endpoint `GET /matches?inProgress=true` - você utilizará a query inProgress para filtrar as partidas em andamento;
- Endpoint `PATCH /matches/:id/finish` - para finalizar uma partida (precisará enviar no header um token válido);
- Endpoint `PATCH /matches/:id` - para atualizar uma partida em andamento (precisará enviar no header um token válido);
```
// exemplo de body que precisa ser enviado:
 {
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```
- Endpoint `POST /matches` - para criar uma nova partida;
```
// exemplo de body que precisa ser enviado:
 {
  "homeTeamId": 16, 
  "awayTeamId": 8, 
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}
```
#### Leaderboard:
- Endpoint `GET /leaderboard/home` - Retorna informações de performance dos times que jogaram em casa;
- Endpoint `GET /leaderboard/away` - Retorna informações de performance dos times que jagaram fora da casa;
- Endpoint `GET /leaderboard` - retorna a classificação geral dos times;


## Principais tecnologias utilizadas:

- TypeScript;
- MySql;
- Docker;
- Node.js;
- Express.js;
- JWT.

## Observações

Desenvolvi apenas a parte do backend do projeto e os Dockerfiles, o frontend e os demais arquivos forma feitos pela Escola de Programação Trybe.
