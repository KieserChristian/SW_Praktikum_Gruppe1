import PersonNBO from './PersonNBO';

export default class StudentNBO extends PersonNBO {

    constructor(aMatriculationNumber, aCourseAbbreviation, aParticipationId){
        super();
        this.matriculation_number = aMatriculationNumber;
        this.course_abbreviation = aCourseAbbreviation;
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


