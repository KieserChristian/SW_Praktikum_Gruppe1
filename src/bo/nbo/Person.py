<<<<<<< HEAD
from ..Role import Role
from datetime import datetime
=======
from Role import Role
>>>>>>> c77b1448049ac6ecb636a0593c19a15236a78d3b

class Person (Role):

     student = Role ("Student")
     dozent = Role  ("Dozent")
     admin = Role ("Admin")

<<<<<<< HEAD
     def __init__ (self, name):
        super.__init__()
        self.__name = ""
        self.__berechtigung = role
        self.__id = 0
        self.__creation_date =datetime.datetime.now()

    def set_berechtigung (self, role):
=======
    def __init__ (self, name, berechtigung):

        super().__init__:

         self.__name = name
         self.__berechtigung = None

    def set_berechtigung (self, rolle):
>>>>>>> c77b1448049ac6ecb636a0593c19a15236a78d3b
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
