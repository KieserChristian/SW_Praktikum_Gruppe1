import BusinessObject from './BusinessObject';

/**Repräsentiert ein Benotung eines Projekts für einen Studenten des Systems */

export default class GradingBO extends BusinessObject{

    constructor(aGrade) {
        super();
            this.grade = aGrade
    }

    setGrade(aGrade) {
        this.grade = aGrade;
    }

    getGrade() {
        return this.grade;
    }

    static fromJSON(grading) {
        let result = [];

        if (Array.isArray(grading)) {
            grading.forEach((g) => {
                Object.setPrototypeOf(g,GradingBO.prototype);
                result.push(g);
            })
        } else {
            let g = grading;
            Object.setPrototypeOf(g,GradingBO.prototype);
            result.push(g);
        }
        return result;
    }
}