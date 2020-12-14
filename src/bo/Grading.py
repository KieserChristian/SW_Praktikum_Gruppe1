from datetime import datetime
from bo.BusinessObject import BusinessObject

"""Realisierung der Bewertungsklasse für die Benotung von Teilnahmen an Projekten"""

class Grading(BusinessObject):
        
    def __init__(self):   
        super().__init__()
        self._grade = 0.0

    def set_grade(self, grade):
        """Setzen der Note"""
        self._grade = grade
    
    def get_grade(self):
        """Auslesen der Note"""
        return self._grade

    def to_dict(self):
        """Umwandeln Grading() in ein Python dictionary dict ()"""
        result = {
            "id": self.get_id(),
            "grade": self.get_grade(),
            "creation_date": self.get_creation_date()
        }
        return result
    
        def __str__(self):
        return "Grading list: {}, Grading_id: {}, view of creation_date {}".format(self.get_grade(), self.get_id(), self.get_creation_date())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict () in eine Note/Bewertung"""
        grad = Grading()
        grad.set_id(dictionary["id"])
        grad.set_grade(dictionary["grade"])
        grad.set_creation_date(dictionary["creation_date"])
        return grad