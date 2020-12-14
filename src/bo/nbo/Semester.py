from bo.nbo.NamedBusinessObject import NamedBusinessObject
from abc import ABC
from datetime import datetime

"""Realisierung der Semesterklasse für das Projektangebot in Semestern"""

class Semester(NamedBusinessObject):
    
    def __init__(self):
        super().__init__()

    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Semesterinstanz"""
        return "Semester: {}, Name: {} ".format(self.get_id(), self.get_name())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandel eines Python dict ()"""
        semester = Semester()
        semester.set_id(dictionary["id"])
        semester.set_creation_date(dictionary["creation_date"])
        semester.set_name(dictionary["name"])
        return semester
