import Cavidades from "./cavidades.js";
import Armazem from "./armazem.js";
import Jogada from "./jogada.js";


class Tabuleiro{// class do tabuleiro
    constructor(nSeeds, nCavs, mode, difficulty, pl1, pl2){
      this.cavidades = new Cavidades(nSeeds, nCavs);
      this.armazemLeft = new Armazem(0);
      this.armazemRight = new Armazem(0);

      this.players = {p1:this.create_player(this.armazemLeft, this.cavidades.cavTop, 'p1'), p2: this.create_player(this.armazemRight, this.cavidades.cavBot, 'p2')}
      this.players.p1.reverse(); // inverte os elementos para o player de cima ser tratado da mesma forma que o de baixo
      this.players.p1.push(pl1);
      this.players.p2.push(pl2);

      this.tabuleiro = document.getElementById('tabuleiro');

      document.getElementById('quitGame').style.visibility = 'hidden';
      document.getElementById('surrender').style.visibility = 'visible';
      this.draw_objects();
      this.jogada = new Jogada(this.tabuleiro, this.cavidades, this.players, mode, difficulty);
    }

    draw_objects(){ // desenha o tabuleiro
        this.tabuleiro.prepend(this.armazemLeft.ele);

        this.cavidades.cavTop.forEach(cav =>{
            this.cavidades.cavTop.ele.append(cav.ele); // As cavidades são inseridas como elementos filhos do elemento cavTop
        })

        this.cavidades.cavBot.forEach(cav =>{
            this.cavidades.cavBot.ele.append(cav.ele); // As cavidades são inseridas como elementos filhos do elemento cavBot
        })

        this.tabuleiro.append(this.armazemRight.ele);
    }

    create_player(armazem, cavs, p){ // cria os jogadores
        const player = [];
        if(p == 'p1'){
            player.push(armazem);
            cavs.reverse();
        } 

        cavs.forEach(cav =>{
            player.push(cav);
        })
        
        if(p == 'p2') player.push(armazem);
        return player;
    }

    clean_board(){ // limpa o tabuleiro
        if(this.jogada.changeTurn == 'p2' && this.jogada.lastTurn == '' && this.jogada.mode == 'computer')
            this.jogada.remove_Text_On_Board('.message', 0);
        if(this.jogada.changeTurn == 'computer' && this.jogada.lastTurn == '' && this.jogada.mode == 'computer')
            this.jogada.remove_Text_On_Board('.message', 0);

        document.querySelector('.counter').remove();

        this.armazemLeft.ele.remove(); 
        this.armazemRight.ele.remove(); 

        this.players = {};
        this.cavidades.cavTop.ele.innerHTML = '';
        this.cavidades.cavBot.ele.innerHTML = '';
    }
}

export default Tabuleiro;