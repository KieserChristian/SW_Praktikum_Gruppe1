from datetime import datetime
from bo.BusinessObject import BusinessObject

"""Realisierung der Bewertungsklasse für die Benotung von Teilnahmen an Projekten"""

class Grading(BusinessObject):
        
    def __init__(self):   
        super().__init__()
        self._grade = 0.0
        self._participation_id = None # Fremdschlüsselbeziehung zu einer Participation

    def set_grade(self, grade):
        """Setzen der Note"""
        self._grade = grade
    
    def get_grade(self):
        """Auslesen der Note"""
        return self._grade

    def set_participation_id(self, participation):
        """Setzen eines Fremdschlüssels zur Participation"""
        self._participation_id = participation

    def get_participation_id(self):
        """Auslesen des Fremdschlüssels zu Participation."""
        return self._participation_id

    def to_dict(self):
        """Umwandeln Grading() in ein Python dictionary dict ()"""
        result = {
            "id": self.get_id(),
            "grade": self.get_grade(),
            "creation_date": self.get_creation_date(),
            "participation_id": self.get_participation_id()
        }
        return result
    
    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Bewertungsinstanz"""
        return "Bewertung: {} {}".format(self.get_id(), self.get_grade(), self.get_participation_id())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict () in eine Note/Bewertung"""
        grad = Grading()
        grad.set_id(dictionary["id"])
        grad.set_grade(dictionary["grade"])
        grad.set_creation_date(dictionary["creation_date"])
        grad.set_participation_id(dictionary["participation_id"])
        return grad