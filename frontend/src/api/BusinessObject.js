/**Basis für alle BusinessObjects, die eine id und creation date besitzen */
export default class BusinessOject {
    constructor() {
        this.id =0;
    }

    /** Setzen der ID des BOs @ param aid - neue id des Bos 

    *@param {*} aid */

    setid(aid) {
        this.id = aid;
    }


    /**Gibt die ID des Bos zurück */

    getid() {
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