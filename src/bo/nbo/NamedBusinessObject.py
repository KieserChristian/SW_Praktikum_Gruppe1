from bo.BusinessObject import BusinessObject
from abc import ABC
from datetime import datetime

class NamedBusinessObject(BusinessObject,ABC):
    
    """Basisklasse, die in jede Klasse übernommen wird, die einen Namen als Attribut hat"""

    def __init__(self, name):
        super.__init__()
        self._name = ""

    def get_name(self):
        """Auslesen des Namens"""
        return self._name

    def set_name(self, name):
        """Setzen des Namens"""
        self._name = name