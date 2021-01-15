from datetime import datetime
from bo.BusinessObject import BusinessObject

"""Realisierung der Teilnahmeklasse für die Teilnahme von Studenten an Projekten"""

class Participation(BusinessObject):
    
    def __init__(self):
        super().__init__()
        self._student_id = None # Fremdschlüsselbeziehung zu einem Student.

    def get_student_id(self):
        """Auslesen des Fremdschlüssels zum Student."""
        return self._student_id

    def set_student_id(self, student):
        """Setzen eines Fremdschlüssels zum Student."""
        self._student_id = student

    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Teilnahmeinstanz"""
        return "Teilnahme: {}, von {}".format(self.get_id(), self.get_student_id())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict () """
        participation = Participation()
        participation.set_id(dictionary["id"])
        participation.set_creation_date(dictionary["creation_date"])
        participation.set_student_id(dictionary["student_id"])
        return participation