from bo.nbo.NamedBusinessObject import NamedBusinessObject
from datetime import datetime

"""Realisierung der Modulklasse für die Anrechnung von Projekten zu Modulen"""

class Module(NamedBusinessObject):
    
    def __init__(self):
        super().__init__()
        self._edv_number = None

    def set_edv_number(self, edv_number):
        self._edv_number = edv_number
    
    def get_edv_number(self):
        return self._edv_number

    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Modulinstanz"""
        return "Modul: {} {}, EDV-Nummer: {}".format(self.get_id(), self.get_name(), self.get_edv_number())
    
    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandel eines Python dict () """
        module = Module()
        module.set_id(dictionary["id"])
        module.set_creation_date(dictionary["creation_date"])
        module.set_edv_number(dictionary["edv_number"])
        module.set_name(dictionary["name"])
        return module