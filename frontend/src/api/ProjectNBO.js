import NamedBusinessObject from "./NamedBusinessObject"

export default class ProjectNBO extends NamedBusinessObject {

    
    constructor (aname,anid,anedv_number,acapacity,anexternal_partner,ashort_description,aweekly_flag,abd_before_lecture_periode,abd_in_lecture_periode,abd_preferred_in_lecture_periode,aspecial_room) {
        super (aname,anid);
        this.edv_number = anedv_number
        this.capacity = acapacity
        this.external_partner = anexternal_partner
        this.short_description = ashort_description
        this.weekly_flag = aweekly_flag
        this.bd_before_lecture_periode = abd_before_lecture_periode
        this.bd_in_lecture_periode = abd_in_lecture_periode
        this.bd_preferred_in_lecture_periode = abd_preferred_in_lecture_periode
        this.special_room = aspecial_room
        /**  this.module = null        /**Project ist einem Modul zugeweisen und sollte womöglich auch dargestellt werden */
        /**this.dozent = [] /**Ein Dozent erstellt/verwaltet ein Project, soll in der Liste dann ausgegeben werden*/
        /**this.semester = null /**Ein Semester ist einem Project zugewiesen und soll auch in die Liste(oder ähnliches) dargestellt werden (Wer veranstaltet das Project Dozent Thies) */
        /**this.project_state = null   /**Auslesen in welchem Status das Projekt momentan ist  */
        /**this.project_type = null*/   /**Für die Darstellung des Projecttypes möglich in ner Liste also was für ein Project ist das  */
    }

    setName(aname){
        this.name = aname
    }

    getName() {
       return this.name 
    }

    setEdv_Number(anedv_number){
        this.edv_number = anedv_number
    }

    getEdv_Number(){
        return this.edv_number
    }

    setCapacity(acapacity){
        this.capacity = acapacity
    }

    getCapacity(){
        return this.capacity
    }

    setExternal_Partner(anexternal_partner){
        this.external_partner = anexternal_partner
    }

    getExternal_Partners(){
        return this.external_partner
    }

    setShort_Description(ashort_description){
        this.short_description =ashort_description
    }

    getShort_Description(){
        return this.short_description
    }

    setWeekly_Flag(aweekly_flag){
        this.weekly_flag = aweekly_flag
    }

    getWeekly_Flag(){
        return this.weekly_flag
    }

    setBD_Before(abd_before_lecture_periode){
        this.bd_before_lecture_periode = abd_before_lecture_periode
    }

    getBD_Before(){
        return this.bd_before_lecture_periode
    }

    setBD_IN(abd_in_lecture_periode){
        this.bd_in_lecture_periode = abd_in_lecture_periode
    }

    getBD_IN(){
        return this.bd_in_lecture_periode
    }

    setBD_Preferred(abd_preferred_in_lecture_periode){
        this.bd_preferred_in_lecture_periode = abd_preferred_in_lecture_periode
    }

    getBD_Preferred(){
        return this.bd_preferred_in_lecture_periode
    }

    setSpecial_Room(aspecial_room){
        this.special_room = aspecial_room
    }

    getSpecial_Room(){
        return this.special_room
    }

       /** Gibt ein Array der PersonNBOs von den gegebenen JSON Strukturen zurück
     * 
     */
    static fromJSON(project) {
        let result = [];

        if (Array.isArray(project)) {
            project.forEach((pr) => {
                Object.setPrototypeOf(pr,ProjectNBO.prototype);
                result.push(pr);
            })
        }else {
            /**Bei persons handelt es sich um ein singuläres Objekt (nur vereinzelt vorkommend), eine Person Bsp. daniel weinert
             * kann nicht zweimal existieren
             */
            let pr = project;
            Object.setPrototypeOf(pr,ProjectNBO.prototype);
            result.push(pr);
        }

        return result;
    }
}