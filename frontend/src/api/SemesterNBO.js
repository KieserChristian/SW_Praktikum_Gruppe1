import NamedBusinessObject from './NamedBusinessObject';

export default class SemesterBO extends NamedBusinessObject {

    constructor() {
        super();
    }

    static fromJSON(semester) {
        let result = [];

        if (Array.isArray(semester)) {
            semester.forEach((s) => {
                Object.setPrototypeOf(s, SemesterBO.prototype);
                result.push(s);
            })
        } else {
            let s = semester;
            Object.setPrototypeOf(s, SemesterBO.prototype);
            result.push(s)
        }
        return result;
        }
}