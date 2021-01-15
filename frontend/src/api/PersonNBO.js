import NamedBusinessObject from "./NamedBusinessObject"

/**Repräsentiert eine Person des Systems */

export default class PersonNBO extends NamedBusinessObject {

    constructor(aEmail,aGoogleId) {
        super();
        this.email = aEmail;
        this.google_id = aGoogleId;
    }

    setEmail(aEmail) {
        this.email = aEmail;
    }

    getEmail () {
        return this.email;
    }

    setGoogleID (aGoogleId) {
        this.google_id = aGoogleId;
    }

    getGoogleID () {
        return this.google_id;
    }

    /** Gibt ein Array der PersonNBOs von den gegebenen JSON Strukturen zurück
     * 
     */
    
    static fromJSON(person) {
        let result = [];

        if (Array.isArray(person)) {
            person.forEach((pe) => {
                Object.setPrototypeOf(pe,PersonNBO.prototype);
                result.push(pe);
            })
        }else {
            /**Bei persons handelt es sich um ein singuläres Objekt (nur vereinzelt vorkommend), eine Person Bsp. daniel weinert
             * kann nicht zweimal existieren
             */
            let pe = person;
            Object.setPrototypeOf(pe,PersonNBO.prototype);
            result.push(pe);
        }
        return result;
    }
}
