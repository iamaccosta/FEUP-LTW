import Cavidade from "./cavidade.js"

// class que contém as cavidades do top e as do bottom
class Cavidades{
    constructor(nSeeds, nCavs){
      this.cavTop = this.create_Array(nCavs, nSeeds);
      this.cavTop.ele = document.getElementById('top_cavidades');

      this.cavBot = this.create_Array(nCavs, nSeeds);
      this.cavBot.ele = document.getElementById('bottom_cavidades');

      this.ele = document.getElementById('cavidades');
    }

    create_Array(nCavs, nSeeds){ // cria o vetor das cavidades tanto para as top, como para as bottom, que por sua vez irá chamar a função que cria as seeds
      const cavidades = [];
      for(let i = 0; i < nCavs; i++) {
          const item = new Cavidade(nSeeds, i);
          cavidades.push(item);
      }
      return cavidades;
    }
}

export default Cavidades;