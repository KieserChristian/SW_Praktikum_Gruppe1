import NamedBusinessObject from './NamedBusinessObject';

export default class SemesterNBO extends NamedBusinessObject {

    constructor() {
        super();
    }

    static fromJSON(semester) {
        let result = [];

        if (Array.isArray(semester)) {
            semester.forEach((s) => {
                Object.setPrototypeOf(s, SemesterNBO.prototype);
                result.push(s);
            })
        } else {
            let s = semester;
            Object.setPrototypeOf(s, SemesterNBO.prototype);
            result.push(s)
        }
        return result;
        }
}