import BusinessObject from './BusinessObject';

/**Repräsentiert Die Teilnahme eines Projekts des Systems */

export default class ParticipationBO extends BusinessObject{

    constructor(aStudentId, aProjectId) {
        super();
        this.student_id = aStudentId;
        this.project_id = aProjectId;
    }

    setStudentId(aStudentId) {
        this.student_id = aStudentId;
    }

    getStudentId() {
        return this.student_id;
    }

    setProjectId(aProjectId) {
        this.project_id = aProjectId;
    }

    getProjectId() {
        return this.project_id;
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