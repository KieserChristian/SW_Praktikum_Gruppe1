from abc import ABC
from datetime import datetime
from BusinessObjects import BusinessObject



class Grading(BusinessObject):
    """ Realisierung der Benotungsklasse
    Bestehend aus einer Note und Noten-ID und einem Erstellungsdatum"""
        

    def __init__(self):   
        super().__init__()
        self.__grading = 0.0
        self.__id = 0
        self.__creation_date = datetime.datetime.now()

    def __str__(self):
        return "Grading list: {}, Grading_id: {}, view of creation_date {}".format (self.get__grading(),self.get__id(),self.get__creation_date())


    def get__grading (self):
        """Auslesen der Note"""
        return self.__grading

    def set___grading (self, value):
        """Setzen der Note"""
        self.__grading = value

    def to_dict (self):
        """Umwandeln Grading() in ein Python dictionary dict ()"""
        result = {
            "id": self.get__id (),
            "grading": self.get__grading(),
            "creation_Date": self.get__creation_date()
        }
        return result

@staticmethod
def from_dict(dictionary=dict()):
    """Umwandel eines Python dict () in eine Note/Bewertung"""
    grading = Grading()
    grading.set__id(dictionary["id"])
    grading.set__grading(dictionary["grading"])
    grading.set__creation_date(dictionary["creation_date"])
    return grading