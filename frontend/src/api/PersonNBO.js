
import NamedBusinessObject from "./NamedBusinessObject"


/**Repräsentiert eine Person des Systems */

export default class PersonNBO extends NamedBusinessObject {

    constructor(aname,anemail,agoogle_id,anid) {
        super(aname,anid);
        
        this.email = anemail
        this.google_id = agoogle_id
        
    }

   
    setEmail(anemail) {
        this.email = anemail
    }

    getEmail () {
        return this.email
    }

    setGoogleID (agoogle_id) {
        this.google_id = agoogle_id
    }

    getGoogleID () {
        return this.google_id
    }


    /** Gibt ein Array der PersonNBOs von den gegebenen JSON Strukturen zurück
     * 
     */
    static fromJSON(person) {
        let result = [];

        if (Array.isArray(person)) {
            person.forEach((p) => {
                Object.setPrototypeOf(p,PersonNBO.prototype);
                result.push(p);
            })
        }else {
            /**Bei persons handelt es sich um ein singuläres Objekt (nur vereinzelt vorkommend), eine Person Bsp. daniel weinert
             * kann nicht zweimal existieren
             */
            let p = person;
            Object.setPrototypeOf(p,PersonNBO.prototype);
            result.push(p);
        }

        return result;
    }

}
