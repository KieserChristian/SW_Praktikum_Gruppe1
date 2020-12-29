import BusinessObject from './BusinessObject';

export default class Participation extends BusinessObject{

    //konstruiert ein ParticipationBO mit einem gegebenen Namen

    /** 
     * @param {*} anId der Name der ParticipationBO
     */

    constructor(anId) {
        super(anId);
    }


    toString(){
        let result = "";
        for (var prop in this)
            result += prop + ":" + this[prop] + "";

        return result;
    }
}