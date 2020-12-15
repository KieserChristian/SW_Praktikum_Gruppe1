from bo.BusinessObject import BusinessObject
from abc import ABC
from datetime import datetime

"""Realisierung der benannten abstrakten Basisklasse für die gemeinsame Nutzung der relevanten Klassen"""

class NamedBusinessObject(BusinessObject,ABC):
    
    """Basisklasse, die in jede Klasse übernommen wird, die einen Namen als Attribut hat"""

    def __init__(self):
        super().__init__()
        self._name = ""

    def set_name(self, name):
        """Setzen des Namens"""
        self._name = name
        
    def get_name(self):
        """Auslesen des Namens"""
        return self._name