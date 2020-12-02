from Person import Person

class Student(Person):

    def __init__(self):
        super.__init__(self)
        self.__matriculation_number = 0
        self.__course_abbreviation = 0

    def get_matriculation_number(self):
        """Immatrikulationsnummer auslesen"""
        return self.__matriculation_number

    def set_matriculation_number(self, value):
        """Immatrikulationsnummer setzen"""
        self.__matriculation_number = value

    def get_course_abbreviation(self):
        """Kurs-Kürzel auslesen"""
        return self.__edv_number

    def set_coure_abbreviation(self, value):
        """Kurs-Kürzel setzen"""
        self.__course_abbreviation = value

@staticmethod
def from_dict(dictionary=dict()):
    """Umwandeln eines Python dict () """
    student = Student()
    student.set_id(dictionary["id"])
    student.set_creation_date(dictionary["creation_date"])
    student.set_matriculation_number(dictionary["matriculation_number"])
    student.set_course_abbreviation(dictionary["course_abbreviation"])
    return student