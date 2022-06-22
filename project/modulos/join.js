const crypto = require('crypto');
let gamesOnHold = [];

module.exports = async function(aux, nick, password) {
    let game = JSON.parse(aux);
    let dataToSend = [];
    let data = [];

    if(game.nick != nick || game.password != password){
        dataToSend.stat = 401;
        dataToSend.msg = {};
        return dataToSend;
    }

    console.log(gamesOnHold);

    if(gamesOnHold.length == 0){
        try{ // criar hash code para o gameId
            const gameId = crypto
                .createHash('md5')
                .update(game.size.toString() + game.initial.toString() + (new Date()).toString())
                .digest('hex');
            data.msg = {game : gameId};
        } catch{
            dataToSend.stat = 500;
            dataToSend.msg = {};
            return dataToSend;
        }
        gamesOnHold.push({group: game.group, game: data.msg.game});

        dataToSend.stat = 200;
        dataToSend.msg = data.msg;
        return dataToSend;
    }
    else {
        let i = 0;
        gamesOnHold.forEach(ele => {
            if(ele.group == game.group){
                dataToSend.stat = 200;
                dataToSend.msg = {game: ele.game};
                gamesOnHold.splice(i, 1);
                console.log(gamesOnHold);
            }
            i++;
        })

        if(dataToSend.stat == 200) return dataToSend; 
        else{
            try{ // criar hash code para o gameId
                const gameId = crypto
                    .createHash('md5')
                    .update(game.size.toString() + game.initial.toString() + (new Date()).toString())
                    .digest('hex');
                data.msg = {game : gameId};
            } catch{
                dataToSend.stat = 500;
                dataToSend.msg = {};
                return dataToSend;
            }
        }
        dataToSend.stat = 200;
        dataToSend.msg = data.msg;
        return dataToSend;
    }
}