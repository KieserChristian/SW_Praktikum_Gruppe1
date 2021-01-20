import BusinessObject from './BusinessObject';

export default class ParticipationBO extends BusinessObject{

    constructor(aStudentId) {
        super();
            this.student_Id = aStudentId
    }

    setStudentId(aStudentId) {
        this.student_Id = aStudentId;
    }

    getStudentId() {
        return this.student_Id;
    }

    static fromJSON(participation) {
        let result = [];

        if (Array.isArray(participation)) {
            participation.forEach((pa) => {
                Object.setPrototypeOf(pa,ParticipationBO.prototype);
                result.push(pa);
            })
        } else {
            let pa = participation;
            Object.setPrototypeOf(pa,ParticipationBO.prototype);
            result.push(pa);
        }
        return result;
    }
}