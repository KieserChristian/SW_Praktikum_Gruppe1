from BusinessObject import BusinessObject
from abc import ABC
from datetime import datetime

class NamedBusinessObject(BusinessObject,ABC):
    
    """Basisklasse, die in jede Klasse übernommen wird, die einen Namen als Attribut hat"""

    def __init__(self, name):
        super.__init__()
        self._name = ""
        self._id = 0
        self._creation_date =datetime.datetime.now()

    def get_name(self):

        """Auslesen des Namens"""
        return self._name

    def set_name(self, name):
        """Setzen des Namens"""
        self._name = name

    def get_id (self):
        """Auslesen der ID"""
        return self._id

    def get_creation_date(self):
        """Auslesen des Erstelldatums"""
        return self._creation_date

    def set_id (self, value):
        """ID setzen"""
        self._id = value 

    def set_creation_date (self, creation_date):
        """Erstellungsdatum setzen"""
        self._creation_date = creation_date