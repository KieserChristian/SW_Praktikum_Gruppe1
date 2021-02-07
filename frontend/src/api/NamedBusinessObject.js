import BusinessObject from './BusinessObject';

/**Basis für alle NamedBusinessObjects, die einen name besitzen */
export default class NamedBusinessObject extends BusinessObject{

    constructor(aName) {
        super();
        this.name = aName;
    }

    /** Setzen des Namens des NBOs @ param aname - neuer name des NBOs*/

    setName(aName){
        this.name = aName 
    }

    getName(){
        return this.name
    }

    /**Erzeugt eine string Representation, nützlich zum debuggen */

    toString(){
        let result = "";
        for (var prop in this) {
            result += prop + ":" + this[prop] + "";
        }
        return result;
    }
}