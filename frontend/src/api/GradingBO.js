import BusinessObject from './BusinessObject';

/**Repräsentiert ein Benotung eines Projekts für einen Studenten des Systems */

export default class GradingBO extends BusinessObject{

    constructor(aGrade, aParticipationId) {
        super();
            this.grade = aGrade
            this.participation_id = aParticipationId
    }

    setGrade(aGrade) {
        this.grade = aGrade;
    }

    getGrade() {
        return this.grade;
    }

    setParticipationId(aParticipationId) {
        this.participation_id = aParticipationId;
    }

    getParticipationId() {
        return this.participation_id;
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