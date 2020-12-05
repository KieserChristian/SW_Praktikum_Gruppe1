from abc import ABC, abstractmethod
from datetime import datetime

class BusinessObject(ABC):
    def __init__(self):
        """Basisklasse, die in jede Klasse übernommen wird"""
        self.__id = 0 
        self.__creation_date = datetime.datetime.now()

    def __str__ (self): 
        """Darstellung des Objekts wird ausgegeben"""
        return str(self.__id)


    def __repr__(self):
        """Darstellung des Strings, muss ein string sein, auf den sich das Objekt beruft"""
        return str (self.__creation_date)


    def get_id (self):
        """Auslesen der ID"""
        return self.__id

    def get_creation_date(self):
        """Auslesen des Erstelldatums"""
        return self.__creation_date

    def set_id (self, value):
        """ID setzen"""
        self.__id = value 

    def set_creation_date (self, creation_date):
        """Erstellungsdatum setzen"""
        self.__creation_date = creation_date


    

    