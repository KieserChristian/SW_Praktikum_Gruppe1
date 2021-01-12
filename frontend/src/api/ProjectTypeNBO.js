import NamedBusinessObject from './NamedBusinessObject';

export default class ProjectTypeNBO extends NamedBusinessObject {

    constructor (aNumberEcts, aNumberSws) {
        super();
        this.number_ects = aNumberEcts;
        this.number_sws = aNumberSws;
    }

    setNumberEcts(aNumberEcts) {
        this.number_ects = aNumberEcts;
    }

    getNumberEcts() {
        return this.number_ects;
    }

    setNumberSws(aNumberSws) {
        this.number_sws = aNumberSws;
    }

    getNumberSws() {
        return this.number_sws;
    }

    // Returns an Array of ProjectType from a given JSON structure

    static fromJSON(projecttype) {
        let result = [];

        if (Array.isArray(projecttype)) {
            projecttype.forEach((p) => {
                Object.setPrototypeOf(p, ProjectTypeNBO.prototype);
                result.push(p);
            })
        } else {
            let p = projecttype;
            Object.setPrototypeOf(p, ProjectTypeNBO.prototype);
            result.push(p);
        }
        return result;
        }
}