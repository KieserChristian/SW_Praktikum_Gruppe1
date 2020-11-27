from datetime import datetime
from abc import ABC
from BusinessObjects import BusinessObject


class Participation(BusinessObject):
    def __init__(self):
    
        """ Realisierung der Teilnahmeklasse
    Bestehend aus einer ID und einem Erstellungsdatum"""
        super().__init__(self)
        self.__id = 0
        self.__creation_date =datetime.datetime.now()

    def __str__(self):
        return "view of creation_date {}, participation_id {}".format (self.get__id(),self.get__creation_date())

    

@staticmethod
def from_dict(dictionary=dict()):
    """Umwandel eines Python dict () """
    participation = Participation()
    participation.set__id(dictionary["id"])
    participation.set__creation_date(dictionary["creation_date"])
    return participation