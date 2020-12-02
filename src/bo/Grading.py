from abc import ABC
from datetime import datetime
from BusinessObjects import BusinessObject



class Grading(BusinessObject):
    """ Realisierung der Benotungsklasse
    Bestehend aus einer Note und Noten-ID und einem Erstellungsdatum"""
        

    def __init__(self):   
<<<<<<< HEAD
        super().__init__()
        self.__grade = 0.0
=======
        super().__init__(self):
        self.__grading = 0.0
>>>>>>> c77b1448049ac6ecb636a0593c19a15236a78d3b
        self.__id = 0
        self.__creation_date = datetime.datetime.now()

    def __str__(self):
        return "Grading list: {}, Grading_id: {}, view of creation_date {}".format (self.get__grade(),self.get__id(),self.get__creation_date())


    def get__grade (self):
        """Auslesen der Note"""
        return self.__grade

    def set___grade (self, value):
        """Setzen der Note"""
<<<<<<< HEAD
        self.__grade = value
=======
        self.__grading = 0.0
>>>>>>> c77b1448049ac6ecb636a0593c19a15236a78d3b

    def to_dict (self):
        """Umwandeln Grading() in ein Python dictionary dict ()"""
        result = {
            "id": self.get__id (),
            "grading": self.get__grade(),
            "creation_Date": self.get__creation_date()
        }
        return result

@staticmethod
def from_dict(dictionary=dict()):
    """Umwandel eines Python dict () in eine Note/Bewertung"""
    grading = Grading()
    grading.set__id(dictionary["id"])
    grading.set__grade(dictionary["grade"])
    grading.set__creation_date(dictionary["creation_date"])
    return grading