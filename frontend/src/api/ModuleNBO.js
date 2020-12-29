import NamedBusinessObject from './NamedBusinessObject';

export default class Module extends NamedBusinessObject, BusinessObject{

    //konstruiert eine ModuleNBO mit einem gegebenen Namen

    /** 
     * @param {String} aName der Name der ModuleNBO
     */

    constructor(aName, anEdv_number) {
        super(aName);
            this.name = aName;
            this.edv_number = anEdv_number 
    }

    setEdv_number(){
        this.edv_number = null
    }

    getEdv_number(){
        return this.edv_number
    }

    /**
     * Gibt Array von ModuleNBOs von gegebenen JSON strukturen zurück
     */

    static fromJSON(modules) {
        let result = [];

        if (Array.isArray(modules)) {
            modules.forEach((m) => {
                Object.setPorototypeOf(m, ModuleNBO.prototype);
                result.push(m);
            })
        }    else { 
            //ist ein singuläres Objekt (nur vereinzelnt vorkommend), ein Modul, bsp. ADS kann nicht einzeln existieren
            let m = modules;
            Object.setPrototypeOf(m, ModuleNBO.prototype);
            result.push(m);
        }
        
        return result;
    }
}