from datetime import datetime
from abc import ABC
from BusinessObjects import BusinessObject


class Participation(BusinessObject):
    def __init__(self):
    
        """ Realisierung der Teilnahmeklasse
    Bestehend aus einer ID und einem Erstellungsdatum"""
        super().__init__()
        self.__id = 0
        self.__creation_date =datetime.now()

    def __str__(self):
        return "view of creation_date {}, participation_id {}".format (self.get__id(),self.get__creation_date())

    def get__creation_date (self):
        """Auslesen des Erstellungsdatums"""
        return self.__creation_date

    def get__id (self):
        """Auslesen der ID"""
        return self.__id
              
    def set__creation_date (self):
        self.__creation_date =

    def set__id (self, creation_date):
        self.__id = creation_date   

@staticmethod
def from_dict(dictionary=dict()):
    """Umwandel eines Python dict () """
    participation = Participation()
    participation.set__id(dictionary["id"])
    participation.set__creation_date(dictionary["creation_date"])
    return participation