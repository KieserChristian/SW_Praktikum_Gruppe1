from BusinessObjects import BusinessObject  
from abc import ABC



class NamedBusinessObject(BusinessObject,ABC):
    
    """Basisklasse, die in jede Klasse übernommen wird, die einen Namen als Attribut hat"""

    def __init__(self, name):
        self.name = name


    def get_name(self):

        """Auslesen des Namens"""
        return self.__name

    def set_name(self, name ):

        """Setzen des Namens"""
        self.__name = name