import NamedBusinessObject from "./NamedBusinessObject"

export default class ProjectNBO extends NamedBusinessObject {

    constructor () {
        super ();
        this.current_state = null;
        this.capacity = null;
        this.external_partners = null;
        this.short_description = null;
        this.weekly_flag = null
        this.bd_before_lecture_period = null;
        this.bd_in_exam_period = null;
        this.bd_in_lecture_period = null;
        this.bd_preferred_in_lecture_period = null;
        this.special_room = null;
        this.project_type_id = null;
        this.person_id = null;
        this.module_id = null;
        this.semester_id = null;
    }

    setState(aState) {
        this.current_state = aState;
    }

    getState() {
        return this.current_state;
    }

    setCapacity(aCapacity) {
        this.capacity = aCapacity;
    }

    getCapacity() {
        return this.capacity;
    }

    setExternalPartners(aPartner) {
        this.external_partners = aPartner;
    }

    getExternalPartners() {
        return this.external_partners;
    }

    setShortDescription(aDescription) {
        this.short_description =aDescription;
    }

    getShortDescription() {
        return this.short_description;
    }

    setWeeklyFlag(aFlag) {
        this.weekly_flag = aFlag;
    }

    getWeeklyFlag() {
        return this.weekly_flag
    }

    setBDbeforeLecture(aBDbeforeLecture) {
        this.bd_before_lecture_period = aBDbeforeLecture;
    }

    getBDbeforeLecture() {
        return this.bd_before_lecture_period;
    }

    setBDinExam(aBDinExam) {
        this.bd_in_exam_period = aBDinExam;
    }

    getBDinExam() {
        return this.bd_in_exam_period;
    }

    setBDinLecture(aBDinLecture) {
        this.bd_in_lecture_period = aBDinLecture;
    }

    getBDinLecture() {
        return this.bd_in_lecture_period;
    }

    setBDpreferredInLecture(aBDpreferredInLecture){
        this.bd_preferred_in_lecture_period = aBDpreferredInLecture;
    }

    getBDpreferredInLecture() {
        return this.bd_preferred_in_lecture_period;
    }

    setSpecialRoom(aRoom) {
        this.special_room = aRoom;
    }

    getSpecialRoom() {
        return this.special_room;
    }
    
    getProjectTypeId() {
        return this.project_type_id;
    }

    setProjectTypeId(aProjectTypeId) {
        this.project_type_id = aProjectTypeId;
    }

    getPersonId() {
        return this.person_id;
    }

    setPersonId(aPersonId) {
        this.person_id = aPersonId;
    }

    getModuleId() {
        return this.module_id;
    }

    setModuleId(aModuleId) {
        this.module_id = aModuleId;
    }

    getSemesterId() {
        return this.semester_id;
    }

    setSemesterId(aSemesterId) {
        this.semester_id = aSemesterId;
    }

    setBDinExam(aBDinExam) {
        this.bd_in_exam_period = aBDinExam;
    }

    setBDpreferredInLecture(aBDpreferredInLecture) {
        this.bd_preferred_in_lecture_period = aBDpreferredInLecture;
    }

    setSpecialRoom(aRoom) {
        this.special_room = aRoom;
    }

    // Gibt ein Array der PersonNBOs von den gegebenen JSON Strukturen zurück

    static fromJSON(project) {
        let result = [];

        if (Array.isArray(project)) {
            project.forEach((p) => {
                Object.setPrototypeOf(p,ProjectNBO.prototype);
                result.push(p);
            })
        } else {
            let p = project;
            Object.setPrototypeOf(p,ProjectNBO.prototype);
            result.push(p);
        }
        return result;
    }
}