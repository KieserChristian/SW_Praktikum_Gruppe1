from Person import Person
from datetime import datetime

class Student(Person):

    def __init__(self):
        super.__init__()
        self.__matriculation_number = 0
        self.__course_abbreviation = 0
        self.__id = 0
        self.__creation_date =datetime.datetime.now()

    def get_matriculation_number(self):
        """Immatrikulationsnummer auslesen"""
        return self.__matriculation_number

    def set_matriculation_number(self, value):
        """Immatrikulationsnummer setzen"""
        self.__matriculation_number = value

    def get_course_abbreviation(self):
        """Kurs-Kürzel auslesen"""
        return self.__edv_number

    def set_coure_abbreviation(self, abbreviation):
        """Kurs-Kürzel setzen"""
        self.__course_abbreviation = value

    def get_id (self):
        """Auslesen der ID"""
        return self.__id

    def get_creation_date(self):
        """Auslesen des Erstelldatums"""
        return self.__creation_date

    def set_id (self, id):
        """ID setzen"""
        self.__id = value 

    def set_creation_date (self, creation_date):
        """Erstellungsdatum setzen"""
        self.__creation_date = creation_date

@staticmethod
def from_dict(dictionary=dict()):
    """Umwandeln eines Python dict () """
    student = Student()
    student.set_id(dictionary["id"])
    student.set_creation_date(dictionary["creation_date"])
    student.set_matriculation_number(dictionary["matriculation_number"])
    student.set_course_abbreviation(dictionary["course_abbreviation"])
    return student