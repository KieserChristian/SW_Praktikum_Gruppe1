from bo.nbo.NamedBusinessObject import NamedBusinessObject
from bo.nbo.Person import Person
from datetime import datetime

"""Realisierung der Studentenklasse als Spezialisierung der Personenklasse"""

class Student(Person, NamedBusinessObject):

    def __init__(self):
        super().__init__()
        super().__init__()
        self._matriculation_number = ""
        self._course_abbreviation = ""

    def set_matriculation_number(self, matriculation_number):
        """Immatrikulationsnummer setzen"""
        self._matriculation_number = matriculation_number
    
    def get_matriculation_number(self):
        """Immatrikulationsnummer auslesen"""
        return self._matriculation_number

    def set_course_abbreviation(self, course_abbreviation):
        """Studiengangkürzel setzen"""
        self._course_abbreviation = course_abbreviation
    
    def get_course_abbreviation(self):
        """Studiengangkürzel auslesen"""
        return self._course_abbreviation

    def to_dict(self):
        """Umwandeln von Student() in ein Python dictionary dict()"""
        result = {
            """id, creation_date, name, google_id und email sind bereits in der Person-Klasse in der to_dict-Methode definiert, daher hier auskommentiert."""
            """ "id": self.get_id(),
            "creation_date": self.get_creation_date(),
            "name": self.get_name(),
            "google_id": self.get_google_id(),
            "email": self.get_email(), """
            "matriculation_number": self.get_matriculation_number(),
            "course_abbreviation": self.get_course_abbreviation()
        }
        return result
    
    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Studenteninstanz"""
        return "Student: {} {}, Google-ID: {}, E-Mail: {}, Matrikelnummer: {}, Studiengangkürzel: {}".format(self.get_id(), self.get_name(), self.get_google_id(), self.get_email(), self.get_matriculation_number(), self.get_course_abbreviation())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict () """
        student = Student()
        student.set_id(dictionary["id"])
        student.set_creation_date(dictionary["creation_date"])
        student.set_name(dictionary["name"])
        student.set_google_id(dictionary["google_id"])
        student.set_email(dictionary["email"])
        student.set_matriculation_number(dictionary["matriculation_number"])
        student.set_course_abbreviation(dictionary["course_abbreviation"])
        return student