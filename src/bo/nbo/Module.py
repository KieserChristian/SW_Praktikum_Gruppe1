from BusinessOn
from NamedBusinessObjects import NamedBusinessObject
from datetime import datetime

class Module(NamedBusinessObject):
    
    def __init__(self):
        super.__init__()
        self.__edv_number = 0
        self.__name = ""
        self.__id = 0
        self.__creation_date =datetime.datetime.now()


    def get_edv_number(self):
        return self.__edv_number

    def set_edv_number(self, value):
        self.__edv_number = value


    def get_id (self):
        """Auslesen der ID"""
        return self.__id

    def get_creation_date(self):
        """Auslesen des Erstelldatums"""
        return self.__creation_date

    def set_id (self, value):
        """ID setzen"""
        self.__id = value 

    def set_creation_date (self, creation_date):
        """Erstellungsdatum setzen"""
        self.__creation_date = creation_date

   

@staticmethod
def from_dict(dictionary=dict()):
    """Umwandel eines Python dict () """
    module = Module()
    module.set__id(dictionary["id"])
    module.set__creation_date(dictionary["creation_date"])
    return module