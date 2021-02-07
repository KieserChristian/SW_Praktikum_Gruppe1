import PersonNBO from './PersonNBO';

/**Repräsentiert einen Student des Systems */

export default class StudentNBO extends PersonNBO {

    constructor(aMatriculationNumber, aCourseAbbreviation, aParticipationId){
        super();
        this.matriculation_number = aMatriculationNumber;
        this.course_abbreviation = aCourseAbbreviation;
        this.participation_id = aParticipationId;
    }

    setMatriculationNumber (aMatriculationNumber){
        this.matriculation_number = aMatriculationNumber;
    }

    getMatriculationNumber(){
        return this.matriculation_number;
    }

    setCourseAbbreviation(aCourseAbbreviation){
        this.course_abbreviation = aCourseAbbreviation;
    }

    getCourseAbbreviation(){
        return this.course_abbreviation;
    }

    setParticipationId(aParticipationId) {
        this.participation_id = aParticipationId;
    }

    getParticipationId() {
        return this.participation_id;
    }
    
    static fromJSON(student) {
        let result = [];

       if (Array.isArray(student)) {
           student.forEach((s) => {
               Object.setPrototypeOf(s,StudentNBO.prototype);
               result.push(s);
           })
       } else {
           let s = student;
           Object.setPrototypeOf(s,StudentNBO.prototype);
           result.push(s);
       }

       return result;
   }
}


