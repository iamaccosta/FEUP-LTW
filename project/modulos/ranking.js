const fs = require('fs');

module.exports = async function() {
    rank = fs.readFileSync('./modulos/files/ranking.json');
    
    dados = JSON.parse(rank.toString());

    let dataToSend = [];
    dados.ranking.sort(function(x,y){return y["victories"]-x["victories"]})
    dataToSend.stat = 200;
    dataToSend.msg = {ranking: dados.ranking.slice(0,10)};

    return dataToSend;
}