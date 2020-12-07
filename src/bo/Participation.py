from datetime import datetime
from abc import ABC
from bo.BusinessObject import BusinessObject


class Participation(BusinessObject):
    def __init__(self):
    
        """ Realisierung der Teilnahmeklasse Bestehend aus einer ID und einem Erstellungsdatum"""
        super().__init__()

    def __str__(self):
        return "view of creation_date {}, participation_id {}".format(self.get_id(), self.get_creation_date())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandel eines Python dict () """
        participation = Participation()
        participation.set_id(dictionary["id"])
        participation.set_creation_date(dictionary["creation_date"])
        return participation