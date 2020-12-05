from abc import ABC, abstractmethod
from datetime import datetime

class BusinessObject(ABC):
    def __init__(self):
        """Basisklasse, die in jede Klasse übernommen wird"""
        self._id = 0 
        self._creation_date = datetime.datetime.now()

    def __str__ (self): 
        """Darstellung des Objekts wird ausgegeben"""
        return str(self._id)

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


    

    