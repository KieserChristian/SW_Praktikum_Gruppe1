from bo.nbo.NamedBusinessObject import NamedBusinessObject
from abc import ABC
from datetime import datetime


class Semester(BusinessObject, NamedBusinessObject):
    
    def __init__(self):
        
        """ Realisierung der Semesterklasse Bestehend aus einer ID und einem Erstellungsdatum"""
        super().__init__()

    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Semesterinstanz"""
        return "Semester: {}, Name: {} ".format(self.get_id(), self.get_name())

    def get_id(self):
        """Auslesen der ID"""
        return self._id

    def get_creation_date(self):
        """Auslesen des Erstelldatums"""
        return self._creation_date

    def get_name(self):
        return self._name

    def set_name(self, name):
        self._name = ""

    def set_id(self, value):
        """ID setzen"""
        self._id = value 

    def set_creation_date(self, creation_date):
        """Erstellungsdatum setzen"""
        self._creation_date = creation_date

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandel eines Python dict ()"""
        semester = Semester()
        semester.set_id(dictionary["id"])
        semester.set_creation_date(dictionary["creation_date"])
        semester.set_name(dictionary["name"])
        return semester
