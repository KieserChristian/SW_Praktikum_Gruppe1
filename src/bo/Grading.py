from abc import ABC
from datetime import datetime
from bo.BusinessObjects import BusinessObject



class Grading(BusinessObject):
    """ Realisierung der Benotungsklasse
    Bestehend aus einer Note und Noten-ID und einem Erstellungsdatum"""
        

    def __init__(self):   
        super().__init__()
        self.grading = 0.0
        self.id = ""
        self.creation_date = datetime.datetime.now()

    def __str__(self):
        return "Grading list: {}, Grading_id: {}, view of creation_date {}".format (self.get_grading(),self.get_id(),self.get_creation_date())


    def get_grading (self):
        """Auslesen der Note"""
        return self._grading

    def set_grading (self, value):
        """Setzen der Note"""
        self._grading = value

    def to_dict (self):
        """Umwandeln Grading() in ein Python dictionary dict ()"""
        result = {
            "id": self.get_id (),
            "grading": self.get_grading(),
            "creation_Date": self.get_creation_date()
        }
        return result

@staticmethod
def from_dict(dictionary=dict()):
    """Umwandel eines Python dict () in eine Note/Bewertung"""
    grading = Grading()
    grading.set_id(dictionary["id"])
    grading.set_grading(dictionary["grading"])
    grading.set_creation_date(dictionary["creation_date"])
    return grading