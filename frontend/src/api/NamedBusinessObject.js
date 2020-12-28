import BusinessObject from './BusinessObject';

export default class NamedBusinessObject extends BusinessObject{

    //konstruiert ein RoleBO mit einem gegebenen Namen

    /** 
     * @param {String} aName der Name der RoleBO
     */

    constructor(aName) {
        super();
        this.name = aName;
    }

    setName(aName){
        this.name = aName 
    }

    getName(){
        return this.name
    }

    toString(){
        let result = "";
        for (var prop in this) {
            result += prop + ":" + this[prop] + "";
        }
        return result;
    }
}