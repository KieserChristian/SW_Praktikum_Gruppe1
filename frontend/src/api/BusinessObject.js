/**Basis für alle BusinessObjects, die eine id und creation date besitzen */
export default class BusinessOject {
    constructor() {
        this.id =0;
    }

    /** Setzen der ID des BOs @ param aid - neue id des Bos 

    *@param {*} anid */

    setId(anid) {
        this.id = anid;
    }


    /**Gibt die ID des Bos zurück */

    getId() {
        return this.id;
    }

    /**Erzeugt eine string Representation, nützlich zum debuggen */

    toString() {
        let result = "";
        for (var prop in this) {
            result += prop + ":" + this[prop] + "";
        }
        return result;
    }
}