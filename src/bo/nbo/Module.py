#from BusinessObject import BusinessObject
from NamedBusinessObject import NamedBusinessObject
from datetime import datetime

class Module(NamedBusinessObject):
    
    def __init__(self):
        super.__init__()
        self._edv_number = 0

    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Modulinstanz"""
        return "Modul: {}, mit der EDV-Nummer {} ".format(self.get_id(), self._edv_number)

    def get_edv_number(self):
        return self._edv_number

    def set_edv_number(self, edv_number):
        self._edv_number = value

    def get_name (self,name);
        return self._name

    def set_name (self):
        self._name = ""

    def get_id (self):
        """Auslesen der ID"""
        return self._id

    def get_creation_date(self):
        """Auslesen des Erstelldatums"""
        return self._creation_date

    def set_id (self, id):
        """ID setzen"""
        self._id = value 

    def set_creation_date (self, creation_date):
        """Erstellungsdatum setzen"""
        self._creation_date = creation_date

@staticmethod
def from_dict(dictionary=dict()):
    """Umwandel eines Python dict () """
    module = Module()
    module.set_id(dictionary["id"])
    module.set_creation_date(dictionary["creation_date"])
    module.set_name(dictionary["Name"])
    return module