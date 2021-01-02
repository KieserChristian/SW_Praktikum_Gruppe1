from abc import ABC, abstractmethod
from datetime import datetime

"""Realisierung der abstrakten Basisklasse für die gemeinsame Nutzung der relevanten Klassen"""

class BusinessObject(ABC):

    def __init__(self):
        self._id = 0 
        self._creation_date = datetime.now()

    def set_id(self, value):
        """ID setzen"""
        self._id = value 
    
    def get_id(self):
        """Auslesen der ID"""
        return self._id

    def set_creation_date(self, creation_date):
        """Erstellungsdatum setzen"""
        self._creation_date = datetime.now()
    
    def get_creation_date(self):
        """Auslesen des Erstelldatums"""
        return self._creation_date