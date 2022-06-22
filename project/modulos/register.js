const fs = require('fs');
const crypto = require('crypto');

module.exports = async function(logs) {
    let login = JSON.parse(logs);

    let dataToSend = [];

    if(login.nick == null || login.nick == ""){ // caso o nick seja inválida
        dataToSend.stat = 400;
        dataToSend.msg = {error: 'nick is not a valid string'};
        return dataToSend;
    }

    if(login.password == null || login.password == ""){ // caso a password seja inválida
        dataToSend.stat = 400;
        dataToSend.msg = {error: 'password is not a valid string'};
        return dataToSend;
    }

    dataToSend.nick = login.nick;
    dataToSend.password = login.password;

    let user;
    try{ // criar hass codes para as passwords
        const hashedPassword = crypto
            .createHash('md5')
            .update(login.password)
            .digest('hex');
            user = {nick : login.nick, password : hashedPassword};
    } catch{
        dataToSend.stat = 500;
        dataToSend.msg = {};
        return dataToSend;
    }

    regist = fs.readFileSync('./modulos/files/login.json');

    try{
        dados= JSON.parse(regist.toString());
    } catch {
        dados = [];
    }

    if(dados.length == 0){ // caso esteja vazio
        fs.writeFile('./files/login.json', JSON.stringify(dados), function (err) {
            if(err){;
                return console.log(err);
            }
        });
        dataToSend.stat = 200;
        dataToSend.msg = {};
        return dataToSend;
    }
    else{
        let helper_guy = 0;
        dados.forEach(player => {
            if(player.nick == user.nick && player.password == user.password){ // login successfuly
                helper_guy = 1;
                dataToSend.stat = 200;
                dataToSend.msg = {};
            }

            if(player.nick == user.nick && player.password != user.password){ // password errada
                helper_guy = 2;
                dataToSend.stat = 400;
                dataToSend.msg = {error: 'User registered with a different password'};
            }
        })
        
        if(helper_guy == 1 || helper_guy == 2) return dataToSend;

        if(helper_guy == 0){ // login successfuly de um user novo
            dados.push(user);
            fs.writeFile('login.json', JSON.stringify(dados), function (err) {
                if(err){
                    return console.log(err);
                }
            });
            dataToSend.stat = 200;
            dataToSend.msg = {};
            return dataToSend;
        }
    }
}