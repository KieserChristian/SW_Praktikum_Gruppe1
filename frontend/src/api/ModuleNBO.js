import NamedBusinessObject from './NamedBusinessObject';

export default class ModuleNBO extends NamedBusinessObject {

    constructor(anEdvNumber) {
        super();
            this.edv_number = anEdvNumber;
    }

    setEdvNumber(anEdvNumber){
        this.edv_number = anEdvNumber; 
    }

    getEdvNumber(){
        return this.edv_number
    }

    static fromJSON(module) {
        let result = [];

        if (Array.isArray(module)) {
            module.forEach((m) => {
                Object.setPorototypeOf(m, ModuleNBO.prototype);
                result.push(m);
            })
        }    else {
            let m = module;
            Object.setPrototypeOf(m, ModuleNBO.prototype);
            result.push(m);
        }
        
        return result;
    }
}