import BusinessObject from './BusinessObject';

export default class NamedBusinessObject extends BusinessObject{

    //konstruiert ein RoleBO mit einem gegebenen Namen

    /** 
     * @param {String} aname der Name der RoleBO
     */

    constructor(aname) {
        super();
            this.name = aname;
    }

    setName(aname){
        this.name = aname 
    }

    getName(){
        return this.name
    }

    toString(){
        let result = "";
        for (var prop in this)
            result += prop + ":" + this[prop] + "";

        return result;
    }
}