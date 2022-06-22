const http = require('http');
const hostname = 'twserver.alunos.dcc.fc.up.pt';
const port = 9097;

const register = require('./modulos/register.js');
const ranking = require('./modulos/ranking.js');
const join = require('./modulos/join.js');


let nick, password;

const server = http.createServer(function (request, response) {
    switch (request.method) {
        case 'POST':
          switch (request.url) {
            case '/register':
                let logs = '';  
                request.on('data', chunk => {
                    logs += chunk;
                })
                request.on('end', () => {
                    let moduloRegister = register(logs);

                    moduloRegister.then((dataToSend) => {
                        nick = dataToSend.nick;
                        password = dataToSend.password;

                        response.writeHead(dataToSend.stat, {"Access-Control-Allow-Origin": "*"});
                        json = JSON.stringify(dataToSend.msg);
                        response.end(json);
                    })
                })
              break;
            case '/ranking':
                let ranks = '';  
                request.on('data', chunk => {
                    ranks += chunk;
                })
                request.on('end', () => {  
                    let moduloRanking = ranking();

                    moduloRanking.then((dataToSend) =>{
                        response.writeHead(dataToSend.stat, {"Access-Control-Allow-Origin": "*"});
                        json = JSON.stringify(dataToSend.msg);
                        response.end(json);
                    })                 
                })
              break;
            case '/join':
                let aux = '';
                request.on('data', chunk => {
                  aux += chunk;
                })
                request.on('end', () => {
                    let moduloJoin = join(aux, nick, password);

                    moduloJoin.then((dataToSend) => {
                        response.writeHead(dataToSend.stat, {"Access-Control-Allow-Origin": "*"});
                        json = JSON.stringify(dataToSend.msg);
                        response.end(json);
                    })
                })   
                break;
            default:
                response.writeHead(501, {'Content-Type': 'application/json'});
                response.end();
                break;
          }
          break;
    }
});

server.listen(port, hostname, (err) => {
    if (err) {
        console.log('Something went wrong', err);
    } else {
        console.log(`Server running at http://${hostname}:${port}`);
    }
});