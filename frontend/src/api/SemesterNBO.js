import NamedBusinessObject from './NamedBusinessObject';

// Repräsentiert ein Semester

export default class SemesterBO extends NamedBusinessObject {

    constructor(aName) {
        super(aName);
    }


    // Returns an Array of Semester from a given JSON structure

    static fromJSON(semesters) {
        let result = [];

        if (Array.isArray(semesters)) {
            semesters.forEach((sem) => {
                Object.setPrototypeOf(sem, SemesterBO.prototype)
                result.push(sem)
            })

        } else {

            let sem = articles
            Object.setPrototypeOf(sem, SemesterBO.prototype)
            result.push(sem)
        }

        return result;
        }
}