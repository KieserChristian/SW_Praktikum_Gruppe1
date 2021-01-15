import BusinessObject from './BusinessObject';

export default class ParticipationBO extends BusinessObject{

    constructor() {
        super();
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