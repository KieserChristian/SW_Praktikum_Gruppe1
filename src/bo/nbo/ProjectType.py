from bo.nbo.NamedBusinessObject import NamedBusinessObject
from datetime import datetime

"""Realisierung der Projekttypklasse für die Charakterisierung und Klassifizierung von Projekten"""

class ProjectType(NamedBusinessObject):

    # transdisciplinary = "Transdiziplinäres Projekt"     # sws=10   ects=20
    # interdisciplinary = "Interdisziplinäres Projekt"    # sws=5    ects=10
    # subject_specific = "Fachspezifisches Projekt"       # sws=3    ects=5

    def __init__(self):
        super().__init__()
        self._number_ects = 0
        self._number_sws = 0

    def set_number_ects(self, number_ects):
        """ects anzahl setzen"""
        self._number_ects = number_ects
    
    def get_number_ects(self):
        """ects anzahl auslesen"""
        return self._number_ects
    
    def set_number_sws(self,number_sws):
        """semester wochenstunden setzen"""
        self._number_sws = number_sws
    
    def get_number_sws(self):
        """semester wochenstunden auslesen"""
        return self._number_sws

    def to_dict(self):
        """Umwandeln von ProjectType() in ein Python dictionary dict()"""
        result = {
            "id": self.get_id(),
            "creation_date": self.get_creation_date(),
            "name": self.get_name(),
            "number_ects": self.get_number_ects(),
            "number_sws": self.get_number_sws()
        }
        return result
    
    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Projekttypinstanz"""
        return "Projekttyp: {} {}, Anzahl der ECTS: {}, Anzahl der SWS: {}".format(self.get_id(), self.get_name(), self.get_number_ects(), self.get_number_sws())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict () """
        project_type = ProjectType()
        project_type.set_id(dictionary["id"])
        project_type.set_name(dictionary["name"])
        project_type.set_creation_date(dictionary["creation_date"])
        project_type.set_number_ects(dictionary["number_ects"])
        project_type.set_number_sws(dictionary["number_sws"])
        return project_type