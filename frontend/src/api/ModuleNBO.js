import NamedBusinessObject from './NamedBusinessObject';

export default class ModuleNBO extends NamedBusinessObject {

    //konstruiert eine ModuleNBO mit einem gegebenen Namen

     

    constructor(aName, anEdv_number, aModule) {
        super(aName);
            this.name = aName;
            this.edv_number = anEdv_number
            this.module = aModule
    }

    setEdv_number(){
        this.edv_number = null
    }

    getEdv_number(){
        return this.edv_number
    }

    setModule(aModule) {
        this.module = aModule;
    }

    getModule() {
        return this.module;
    }


    static fromJSON(module) {
        let result = [];

        if (Array.isArray(module)) {
            module.forEach((m) => {
                Object.setPorototypeOf(m, ModuleNBO.prototype);
                result.push(m);
            })
        }    else { 
            //ist ein singuläres Objekt (nur vereinzelnt vorkommend), ein Modul, bsp. ADS kann nicht einzeln existieren
            let m = module;
            Object.setPrototypeOf(m, ModuleNBO.prototype);
            result.push(m);
        }
        
        return result;
    }
}