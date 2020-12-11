from bo.nbo.NamedBusinessObject import NamedBusinessObject
from datetime import datetime

class ProjectType(NamedBusinessObject):

    transdisciplinary = ProjectType("Transdiziplinäres Projekt", 10, 20)
    interdisciplinary = ProjectType("Interdisziplinäres Projekt", 5, 10)
    subject-specific = ProjectType("Fachspezifisches Projekt", 3, 5)

    def __init__(self):
        super.__init__()
        self._number_ects = 0
        self._number_sws = 0
    
    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Projekttypinstanz"""
        return "Projekttyp: {}, Anzahl der ECTS: {}, Anzahl der SWS: {} ".format(self.get_id(), self.get_number_ects(), self.get_number_sws())

    def get_number_ects(self):
        """ects anzahl auslesen"""
        return self._number_ects

    def set_number_ects(self, value):
        """ects anzahl setzen"""
        self._number_ects = value

    def get_number_sws(self):
        """semester wochenstunden auslesen"""
        return self._number_sws

    def set_number_sws(self,number_sws):
        """semester wochenstunden setzen"""
        self._number_sws = value

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict () """
        project_type = ProjectType()
        project_type.set_id(dictionary["id"])
        project_type.set_creation_date(dictionary["creation_date"])
        project_type.set_number_ects(dictionary["number_ects"])
        project_type.set_number_sws(dictionary["number_sws"])
        return project_type