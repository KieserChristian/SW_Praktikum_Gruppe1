from NamedBusinessObjects import NamedBusinessObject
from datetime import datetime

class ProjectType(NamedBusinessObject):

    def __init__(self):
        super.__init__(self)
        self.__number_ects = 0
        self.__number_sws = 0
        self.__name = ""
        self.__id = 0
        self.__creation_date =datetime.now()


    def get_number_ects(self):
        """ects anzahl auslesen"""
        return self.__number_ects

    def set_number_ects(self, value):
        """ects anzahl setzen"""
        self.__number_ects = value

    def get_number_sws(self):
        """semester wochenstunden auslesen"""
        return self.__number_sws

    def set_number_sws(self,number_sws):
        """semester wochenstunden setzen"""
        self.__number_sws = value

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
    projecttype = ProjectType()
    projecttype.set_id(dictionary["id"])
    projecttype.set_creation_date(dictionary["creation_date"])
    projecttype.set_number_ects(dictionary["number_ects"])
    projecttype.set_number_sws(dictionary["number_sws"])
    return projecttype