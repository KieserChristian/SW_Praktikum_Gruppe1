import NamedBusinessObject from './NamedBusinessObject';

// Repräsentiert einen ProjectType

export default class ProjectTypeBO extends NamedBusinessObject {

    constructor (aName, aNumberEcts, aNumberSws) {
        super(aName);
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

    static fromJSON(projecttypes) {
        let result = [];

        if (Array.isArray(projecttypes)) {
            projecttypes.forEach((projtyp) => {
                Object.setPrototypeOf(projtyp, ProjectTypeBO.prototype)
                result.push(projtyp)
            })

        } else {

            let projtyp = projecttypes
            Object.setPrototypeOf(projtyp, ProjectTypeBO.prototype)
            result.push(projtyp)
        }

        return result;
        }
}