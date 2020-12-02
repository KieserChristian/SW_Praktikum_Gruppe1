from ..Role import Role
from datetime import datetime

class Person ():

     student = Role ("Student")
     dozent = Role  ("Dozent")
     admin = Role ("Admin")

     def __init__ (self, name):
        super.__init__()
        self.__name = ""
        self.__berechtigung = role
        self.__id = 0
        self.__creation_date =datetime.datetime.now()

    def set_berechtigung (self, role):
        """Berechtigung setzen"""
        self.__berechtigung = role

    def get_berechtigung (self, role):
        """Berechtigung auslesen"""
        return self.__berechtigung

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


if __name__ == "__main__":

    """Person wird testhalber eine Berechtigung zugewiesen"""

    Mensch1 = Person ("Dani")
    Mensch1.set_berechtigung(Person.student)
    print (Mensch1.get_berechtigung())
