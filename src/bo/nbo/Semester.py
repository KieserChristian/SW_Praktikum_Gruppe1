from NamedBusinessObject import NamedBusinessObject
from abc import ABC
from datetime import datetime


class Semester(BusinessObject, NamedBusinessObject):
    
    def __init__(self):
        
        """ Realisierung der Semesterklasse
    Bestehend aus einer ID und einem Erstellungsdatum"""
        super().__init__()
        self.__name = ""
        self.__id = 0
        self.__creation_date =datetime.datetime.now()

    def __str__ (self): 
        """Darstellung des Objekts wird ausgegeben"""
        return str(self.__id)


    def __repr__(self):
        """Darstellung des Strings, muss ein string sein, auf den sich das Objekt beruft"""
        return str (self.__creation_date)


    def get_id (self):
        """Auslesen der ID"""
        return self.__id

    def get_creation_date(self):
        """Auslesen des Erstelldatums"""
        return self.__creation_date

    def get_name (self):
        return self.__name

    def set_name (self,name):
        self.__name = ""

    def set_id (self, value):
        """ID setzen"""
        self.__id = value 

    def set_creation_date (self, creation_date):
        """Erstellungsdatum setzen"""
        self.__creation_date = creation_date

@staticmethod
def from_dict(dictionary=dict()):
    """Umwandel eines Python dict ()"""
    semester = Semester()
    semester.set__id(dictionary["id"])
    semester.set__creation_date(dictionary["creation_date"])
    semeser.set__name(dictionary["name"])
    return semester
