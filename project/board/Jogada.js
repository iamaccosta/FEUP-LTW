class Jogada{
    constructor(tabuleiro, cavidades, players, mode, difficulty){
        this.tabuleiro = tabuleiro;
        this.cavidades = cavidades;
        this.players = players;
        this.mode = mode;
        this.difficulty = difficulty;
        this.surrender = false;
        this.victory = false;

        this.gameOver = false; // fica a true quando o jogo acaba (serve para limpar o Game Over do tabuleiro)
        this.changeTurn = 'You'; // muda para a vez do outro jogador
        this.lastTurn = '';

        if(this.mode == 'computer') this.showMessage("Your turn");
        this.checkIfClicked();
    }

    checkIfClicked(){ // vê se cada cavidade foi clickada  
        this.counter();

        if(this.mode == 'computer'){ // modo vs computer
            let max_Seeds = 0;
            let cav_aux;

            if(this.difficulty == 'easy'){ // Dificuldade easy

                if(this.changeTurn == 'computer'){

                    // Escolhe a cavidade com mais sementes mais à direita
                    this.cavidades.cavTop.forEach(cav =>{
                        if(cav.nSeeds > max_Seeds) {
                            max_Seeds = cav.nSeeds;
                            cav_aux = cav;
                        }
                    })
                    
                    this.jogada(cav_aux, cav_aux.id, this.players.p1, this.players.p2);
                }

                if(this.changeTurn == 'You' && this.lastTurn == ''){ // this.lastTurn == '' , pois só queremos acrescentar o event na primeira vez
                    this.cavidades.cavBot.forEach(cav =>{
                        cav.ele.addEventListener('click', this.jogada.bind(this, cav, cav.id, this.players.p2, this.players.p1));
                    })
                }
            }
            else if(this.difficulty == 'medium'){ // Dificuldade medium
                if(this.changeTurn == 'computer'){
                    let found = false;

                    for(let i = this.players.p1.length-3; i >=0; i--){
                        if(this.players.p1.at(i).nSeeds == (this.players.p1.length-2 - i) ){
                            cav_aux = this.players.p1.at(i);
                            found = true;
                            break;
                        }
                    }

                    if(found == false){
                        // Escolhe a cavidade com mais sementes mais à direita
                        this.cavidades.cavTop.forEach(cav =>{
                            if(cav.nSeeds > max_Seeds) {
                                max_Seeds = cav.nSeeds;
                                cav_aux = cav;
                            }
                        })
                    }
                    
                    this.jogada(cav_aux, cav_aux.id, this.players.p1, this.players.p2);
                }
                if(this.changeTurn == 'You' && this.lastTurn == ''){ // this.lastTurn == '' , pois só queremos acrescentar o event na primeira vez
                    this.cavidades.cavBot.forEach(cav =>{
                        cav.ele.addEventListener('click', this.jogada.bind(this, cav, cav.id, this.players.p2, this.players.p1));
                    })
                } 
            }
            else if(this.difficulty == 'hard'){ // Dificuldade medium
                if(this.changeTurn == 'computer'){
                    let found = false;

                    for(let i = this.players.p1.length-3; i >=0; i--){
                        if(this.players.p1.at(i).nSeeds == (this.players.p1.length-2 - i) ){
                            cav_aux = this.players.p1.at(i);
                            found = true;
                            break;
                        }
                    }


                    if(found == false){
                        let found2 = false;

                        //codigo do hard
                        for(let i = 0; i <= this.players.p1.length-3; i++){
                            let nrSeeds = this.players.p1.at(i).nSeeds;

                            if(nrSeeds == 0 || this.players.p1.at(i+nrSeeds) == undefined || this.players.p1.at(i+nrSeeds) == 'computer') {
                                continue;
                            }
                            else if(this.players.p1.at(i+nrSeeds).nSeeds == 0 && this.players.p2.at(this.players.p2.length - (i + nrSeeds + 3)).nSeeds != 0){
                                cav_aux = this.players.p1.at(i);
                                found2 = true;
                                break;
                            }
                        }

                        // vê se o outro player consegue roubar sementes, se sim joga essa
                        for(let i = 0; i <= this.players.p2.length-3; i++){
                            let nrSeeds = this.players.p2.at(i).nSeeds;

                            if(nrSeeds == 0 || this.players.p2.at(i+nrSeeds) == undefined || this.players.p2.at(i+nrSeeds) == 'You') {
                                continue;
                            }
                            else if(this.players.p2.at(i+nrSeeds).nSeeds == 0 && this.players.p1.at(this.players.p2.length - (i + nrSeeds + 3)).nSeeds != 0){
                                cav_aux = this.players.p1.at(this.players.p2.length - (i + nrSeeds + 3));
                                found2 = true;
                                break;
                            }
                        }


                        if(found2 == false){
                            // Escolhe a cavidade com mais sementes mais à direita
                            this.cavidades.cavTop.forEach(cav =>{
                                if(cav.nSeeds > max_Seeds) {
                                    max_Seeds = cav.nSeeds;
                                    cav_aux = cav;
                                }
                            })
                        }
                    }

                    this.jogada(cav_aux, cav_aux.id, this.players.p1, this.players.p2);
                }
                if(this.changeTurn == 'You' && this.lastTurn == ''){ // this.lastTurn == '' , pois só queremos acrescentar o event na primeira vez
                    this.cavidades.cavBot.forEach(cav =>{
                        cav.ele.addEventListener('click', this.jogada.bind(this, cav, cav.id, this.players.p2, this.players.p1));
                    })
                } 
            }
        }
    }

    jogada(cav, id, player, outro_Player){ // trata de cada jogada
        let seedsToTransfer = 0;
        
        if(this.gameOver == true) return; // game over

        if(player.at(player.length - 1) != this.changeTurn){ // não é a tua vez de jogar
            this.msgNoTabuleiro('É a vez do adversário!', 1000);
            return;
        }

        if(cav.nSeeds == 0){
            this.msgNoTabuleiro('Jogada Impossíel!\nTenta outra cavidade!', 1000);
            return;
        }

        cav.seeds.forEach(seed =>{
            seedsToTransfer ++;
            seed.remove();
        })

        cav.nSeeds = 0;
        cav.setNewNumberSeeds();

        let result = this.transferSeeds(player, seedsToTransfer, id, outro_Player); // começa a transferência das Seeds

        if(result != -1){ // se a última semente não caiu no armazem, vê se o outro player tem sementes para jogar, se caiu, continua a jogar pois o outro player pode vir a ter mais sementes
            if(this.check_Player_Cavs(outro_Player, player)) return; // vê se as cavidades do outro player estão todas vazias
        }

        if(result == -1){ // se a ultima semente caiu no armazem dá check às cavidades do próprio jogador, se não, não dá, pois o outro jogador ainda vai jogar
            if(this.check_Player_Cavs(player, outro_Player)) return; // vê se as cavidades do player que está a jogar ficaram vazias com a ultima jogada
        }

        this.lastTurn = this.changeTurn;

        if(result == -1) {
            this.counter();
            if(this.mode == 'computer' && this.changeTurn == 'computer') {
                setTimeout(() => {this.checkIfClicked()}, 3000);
            }
            return; // quando a ultima seed cai no armazem joga de novo
        }

        this.remove_Text_On_Board('.message');

        this.changeTurn = outro_Player.at(outro_Player.length - 1); // muda para a vez do outro jogador
        this.counter();

        if(this.mode == 'computer' && this.changeTurn == 'computer') { // se estiver no modo vs computador e for a vez do computador, chama a função novamente para o computador jogar
            this.showMessage("Computer's turn");
            setTimeout(() => {this.checkIfClicked()}, 2000); // 3 segundos para o computador jogar
        }
        else this.showMessage("Your turn");
    }

    transferSeeds(player, seedsToTransfer, id, outro_Player){ // faz a transferência das Seeds recursivamente, caso chegue ao aramazem ainda com Seeds para distribuir

        for(let i = id + 1; i < player.length - 1; i++){
            if(seedsToTransfer == 0) break;


            if(player.at(i).nSeeds == 0 && seedsToTransfer == 1 && player.at(length - 1) == this.changeTurn && i != player.length - 2 && outro_Player.at(outro_Player.length - (i + 3)).nSeeds != 0) {
                this.steal_Seeds(i, player, outro_Player);
                player.at(i).nSeeds --;
                player.at(i).setNewNumberSeeds();
            }
            
            player.at(i).nSeeds ++;
            player.at(i).setNewNumberSeeds();

            if(seedsToTransfer == 1 && i == player.length - 2) return -1; // caso a última semente seja a do armazem

            seedsToTransfer --;

            // caso chegue ao fim das cavidades do adversário ainda com sementes para tranferir, salta o armazem do adversário e continua nas suas cavidades de baixo
            if(seedsToTransfer >= 1 && i == player.length - 3 && player.at(player.length - 1) != this.changeTurn){
                this.transferSeeds(outro_Player, seedsToTransfer, -1, player); // recursiva
                return;
            }
        }

        if(seedsToTransfer == 0) {
            return;
        }
        else{
            this.transferSeeds(outro_Player, seedsToTransfer, -1, player); // recursiva
        }  
    }

    steal_Seeds(id, player, outro_Player){
        const helper_guy = outro_Player.at(outro_Player.length - (id + 3)).nSeeds;
        outro_Player.at(outro_Player.length - (id + 3)).nSeeds = 0;
        outro_Player.at(outro_Player.length - (id + 3)).setNewNumberSeeds();

        player.at(player.length - 2).nSeeds += helper_guy + 1;
        player.at(player.length - 2).setNewNumberSeeds();
    }

    check_Player_Cavs(player, outro_Player){
        let helper_guy = 0;
        for(let i = 0; i < player.length - 2; i++){
            if(player.at(i).nSeeds != 0){
                helper_guy = 1;
            }
        }

        if(helper_guy == 0) {
            let restOfSeeds = 0, i;
           
            for(i = 0; i < outro_Player.length - 2; i++){
                restOfSeeds += outro_Player.at(i).nSeeds;
                outro_Player.at(i).seeds.forEach(seed =>{
                    seed.remove();
                })
                outro_Player.at(i).nSeeds = 0;
                outro_Player.at(i).setNewNumberSeeds();
            }

            outro_Player.at(i).nSeeds += restOfSeeds;
            outro_Player.at(i).setNewNumberSeeds();

            this.GameOver();
            return true;
        }
    }

    showMessage(message){
        const msg = document.createElement('span');
        msg.innerText = message;
        msg.classList.add('message');
        this.tabuleiro.append(msg);
    }

    msgNoTabuleiro(mensagem, time){ // jogada impossivel
        const msg = document.createElement('span');
        msg.innerText = mensagem;
        msg.classList.add('textOnBoard');
        this.tabuleiro.append(msg);
        this.remove_Text_On_Board('.textOnBoard', time);
    }

    remove_Text_On_Board(msgToRemove, time){ // remove a msg que está no tabuleiro
        setTimeout(() => {document.querySelector(msgToRemove).remove()}, time); // Ao fim de x ms a função remove o alerta de "Jogada Impossível";
    }

    counter(){ // contador das sementes nos armazens
        if(this.lastTurn != '' || this.surrender == true) document.querySelector('.counter').remove();
        const counter = document.createElement('span');
        counter.innerText = this.players.p1.at(this.players.p1.length-1) + ': ' + this.players.p1.at(this.players.p1.length-2).nSeeds + '\n\n' + this.players.p2.at(this.players.p2.length-1) + ': ' + this.players.p2.at(this.players.p2.length-2).nSeeds;
        counter.classList.add('counter');
        this.tabuleiro.append(counter);
    }

    setSurrender(){ // surrender foi carregado
        this.surrender = true;
        if(this.mode == 'computer') this.GameOver();
    }

    GameOver(){ // termina o jogo
        this.counter();
        if(this.surrender == true){
            this.gameOver = true;

            this.remove_Text_On_Board('.message');

            this.changeTurn = '';
            return;
        }

        document.getElementById('surrender').style.visibility = 'hidden';
        document.getElementById('quitGame').style.visibility = 'visible';
        
        this.remove_Text_On_Board('.message');
        const gameOver = document.createElement('span');
        if(this.players.p1.at(this.players.p1.length-2).nSeeds > this.players.p2.at(this.players.p2.length-2).nSeeds){
            gameOver.innerText = 'Computer Won! You Lost :(\n Computer: ' + this.players.p1.at(this.players.p1.length-2).nSeeds + '\n You: ' + this.players.p2.at(this.players.p2.length-2).nSeeds;
        }
        else if(this.players.p1.at(this.players.p1.length-2).nSeeds < this.players.p2.at(this.players.p2.length-2).nSeeds){
            gameOver.innerText = 'You Won The Match! :)\n Computer: ' + this.players.p1.at(this.players.p1.length-2).nSeeds + '\n You: ' + this.players.p2.at(this.players.p2.length-2).nSeeds;
            this.victory = true;
        }
        else{
            gameOver.innerText = 'Close Match, That is a Tie! :|';
        }
        gameOver.classList.add('textOnBoard');
        this.tabuleiro.append(gameOver);
        this.gameOver = true;
        this.changeTurn = '';
    }

    setGameStarted(){
        this.gameStarted = 'started';
    }
}

export default Jogada;