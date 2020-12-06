from bo.nbo.NamedBusinessObject import NamedBusinessObject
from datetime import datetime

class ProjectType(NamedBusinessObject):

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

    def get_id(self):
        """Auslesen der ID"""
        return self._id

    def get_creation_date(self):
        """Auslesen des Erstelldatums"""
        return self._creation_date

    def set_id(self, id):
        """ID setzen"""
        self._id = value 

    def set_creation_date(self, creation_date):
        """Erstellungsdatum setzen"""
        self._creation_date = creation_date

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict () """
        projecttype = ProjectType()
        projecttype.set_id(dictionary["id"])
        projecttype.set_creation_date(dictionary["creation_date"])
        projecttype.set_number_ects(dictionary["number_ects"])
        projecttype.set_number_sws(dictionary["number_sws"])
        return projecttype