import Cavidade from "./cavidade.js";

class Armazem extends Cavidade{
    constructor(nSeeds){
        super(nSeeds);

        this.ele = this.draw(); 
    }

    draw(){
        const arm = document.createElement('div');
        arm.classList.add('armazem');
        return arm;
    }
}

export default Armazem;