from abc import ABC
from datetime import datetime
from bo.BusinessObject import BusinessObject

class Grading(BusinessObject):
    """ Realisierung der Benotungsklasse
    Bestehend aus einer Note und Noten-ID und einem Erstellungsdatum"""
        
    def __init__(self):   
        super().__init__()
        self._grade = 0.0

    def __str__(self):
        return "Grading list: {}, Grading_id: {}, view of creation_date {}".format(self.get_grade(), self.get_id(), self.get_creation_date())

    def get_grade(self):
        """Auslesen der Note"""
        return self._grade

    def set_grade(self, value):
        """Setzen der Note"""
        self._grade = value

    def to_dict(self):
        """Umwandeln Grading() in ein Python dictionary dict ()"""
        result = {
            "id": self.get_id(),
            "grading": self.get_grade(),
            "creation_Date": self.get_creation_date()
        }
        return result

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandel eines Python dict () in eine Note/Bewertung"""
        grad = Grading()
        grad.set_id(dictionary["id"])
        grad.set_grade(dictionary["grade"])
        grad.set_creation_date(dictionary["creation_date"])
        return grad