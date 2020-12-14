from bo.nbo.NamedBusinessObject import NamedBusinessObject
from bo.nbo.Person import Person
from datetime import datetime

"""Realisierung der Studentenklasse als Spezialisierung der Personenklasse"""

class Student(Person, NamedBusinessObject):

    def __init__(self):
        super.__init__()
        self._matriculation_number = 0
        self._course_abbreviation = ""

    def set_matriculation_number(self, matriculation_number):
        """Immatrikulationsnummer setzen"""
        self._matriculation_number = matriculation_number
    
    def get_matriculation_number(self):
        """Immatrikulationsnummer auslesen"""
        return self._matriculation_number

    def set_course_abbreviation(self, course_abbreviation):
        """Kurs-Kürzel setzen"""
        self._course_abbreviation = course_abbreviation
    
    def get_course_abbreviation(self):
        """Kurs-Kürzel auslesen"""
        return self._edv_number
    
    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Studenteninstanz"""
        return "Student: {}, Matrikelnummer: {}, Studiengangskürzel: {} ".format(self.get_id(), self.get_matriculation_number(), self.get_course_abbreviation())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict () """
        student = Student()
        student.set_id(dictionary["id"])
        student.set_creation_date(dictionary["creation_date"])
        student.set_matriculation_number(dictionary["matriculation_number"])
        student.set_course_abbreviation(dictionary["course_abbreviation"])
        return student