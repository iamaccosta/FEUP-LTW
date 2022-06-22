//class da cavidade
class Cavidade{
  constructor(nSeeds, id){
    this.nSeeds = nSeeds;
    this.id = id;

    this.ele = this.draw();
    this.seeds = this.create_seeds();
    this.drawSeeds(); // Novo método para inserir as sementes na DOM (ver abaixo)
  }

  draw(){ // cria a cavidade
      const cav = document.createElement('div');
      cav.classList.add('cavidade');
      this.attachListeners(cav);
      return cav;
  }

  create_seeds(){ // cria o vetor de seeds para as cavidades
    const seeds = [];
    for(let i = 0; i < this.nSeeds; i++) {
        const item = new Seed();
        seeds.push(item.ele);
    }
    return seeds;
  }

  drawSeeds() { // faz append das seeds à cavidade
    this.seeds.forEach(seed => this.ele.append(seed)); 
  }

  setNewNumberSeeds(){ // quando a cavidade é clickada, o número de seeds é alterado
    this.seeds.forEach(seed => { seed.remove() });
    
    this.seeds = this.create_seeds();
    this.drawSeeds();
  }

  attachListeners(cav) { // função que trata de mostrar o número de seeds da cavidade que tem o cursor por cima
    cav.addEventListener('mouseover', (evt) => {
    	const numSeeds = document.createElement('span');
      numSeeds.innerText = this.nSeeds;
      numSeeds.classList.add('num-seeds')
    	evt.target.append(numSeeds);
    })
    
    cav.addEventListener('mouseout', (evt) => {
    	document.querySelector('.num-seeds').remove();
    })
  }
}

// class do feijão 
class Seed{
  constructor(){
    this.ele = this.draw();
  }

  draw(){ // cria o feijao
    const seed = document.createElement('div');
    seed.classList.add('feijao');
    return seed;
  }
}

export default Cavidade;