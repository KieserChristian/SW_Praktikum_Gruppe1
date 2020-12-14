from datetime import datetime
from bo.BusinessObject import BusinessObject

"""Realisierung der Teilnahmeklasse für die Teilnahme von Studenten an Projekten"""

class Participation(BusinessObject):
    
    def __init__(self):
        super().__init__()

    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Teilnahmeinstanz"""
        return "Teilahme: {}".format(self.get_id())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict () """
        participation = Participation()
        participation.set_id(dictionary["id"])
        participation.set_creation_date(dictionary["creation_date"])
        return participation