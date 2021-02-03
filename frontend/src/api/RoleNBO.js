import NamedBusinessObject from "./NamedBusinessObject"

/**Repräsentiert eine Rolle des Systems */

export default class RoleNBO extends NamedBusinessObject {

    constructor(StaticAttribute, RoleId, PersonId, PersonName) {
        super();
        this.static_attribute = StaticAttribute;
        this.role_id = RoleId
        this.person_id = PersonId
        this.person_name = PersonName
    }

    setStaticAttribute (aStaticAttribute) {
        this.static_attribute = aStaticAttribute;
    }

    getStaticAttribute () {
        return this.static_attribute;
    }

    setRoleId(aRoleId) {
        this.role_id = aRoleId;
    }

    getRoleId() {
        return this.role_id;
    }

    setPersonId(PersonId) {
        this.person_id = PersonId;
    }

    getPersonId(){
        return this.person_id;
    }

    setPersonName(PersonName){
        this.person_name = PersonName;
    }

    getPersonName(){
        return this.person_name;
    }

    /** Gibt ein Array der PersonNBOs von den gegebenen JSON Strukturen zurück
     * 
     */
    
    static fromJSON(role) {
        let result = [];

        if (Array.isArray(role)) {
            role.forEach((pe) => {
                Object.setPrototypeOf(pe,RoleNBO.prototype);
                result.push(pe);
            })
        }else {
            /**Bei roles handelt es sich um ein singuläres Objekt (nur vereinzelt vorkommend), eine Role Bsp. daniel weinert
             * kann nicht zweimal existieren
             */
            let pe = role;
            Object.setPrototypeOf(pe,RoleNBO.prototype);
            result.push(pe);
        }
        return result;
    }
}
