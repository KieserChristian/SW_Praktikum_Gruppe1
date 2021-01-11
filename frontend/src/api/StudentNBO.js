/* import PersonNBO from "./PersonNBO";

export default class StudentNBO extends PersonNBO {

    constructor(aname,anid){
        super(aname,anid);
        this.matriculation_number = amatriculation_number
        this.course_abbreviation = acourse_abbreviation
    }

    setMatriculationNumber (amatriculation_number){
        this.matriculation_number = amatriculation_number
    }

    getMatriculationNumber(){
        return this.matriculation_number
    }

    setCourseAbbreviation(acourse_abbreviation){
        this.course_abbreviation = acourse_abbreviation
    }

    getCourseAbbreviation(){
        return this.course_abbreviation
    }
    
    static fromJSON(student) {
        let result = [];

       if (Array.isArray(student)) {
           project.forEach((s) => {
               Object.setPrototypeOf(s,StudentNBO.prototype);
               result.push(s);
           })
       }else {
           let s = student;
           Object.setPrototypeOf(s,StudentNBO.prototype);
           result.push(s);
       }

       return result;
   }
} */


