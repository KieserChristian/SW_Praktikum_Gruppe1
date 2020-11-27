from NamedBusinessObject import NamedBusinessObject
from abc import ABC
from datetime import datetime


class Semester(BusinessObject, NamedBusinessObject):
    
    def __init__(self):
        
        """ Realisierung der Semesterklasse
    Bestehend aus einer ID und einem Erstellungsdatum"""
        super().__init__(self)
        self.__id = 0
        self.__creation_date =datetime.datetime.now()

@staticmethod
def from_dict(dictionary=dict()):
    """Umwandel eines Python dict ()"""
    semester = Semester()
    semester.set__id(dictionary["id"])
    semester.set__creation_date(dictionary["creation_date"])
    return semester
