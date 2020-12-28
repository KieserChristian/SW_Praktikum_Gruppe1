import BusinessObject from './BusinessObject';

export default class Grading extends BusinessObject{

    //konstruiert ein GradingBO mit einem gegebenen Namen

    /** 
     * @param {*} anId der Name der GradingBO
     */

    constructor(anId, aGrade) {
        super(anId);
            this.id = anId
            this.grade = aGrade

    }

    /**
     * setzt neue Benotung
     * die get-syntax  gibt die Benotung aus
     */

    setGrade(aGrade) {
        this.grade = aGrade
    }

    getGrade() {
        return this.grade
    }

    toString(){
        let result = "";
        for (var prop in this)
            result += prop + ":" + this[prop] + "";

        return result;
    }
}