from Role import Role

class Person (Role):

     student = Role ("Student")
     dozent = Role  ("Dozent")
     admin = Role ("Admin")

    def __init__ (self, name,authorization):

        super().__init__(self):
        
         self.__name = name
         self.__authorization = None

    def set_authorization(self, rolle):
            
        """Berechtigung setzen"""
        self.__authorization = rolle

    def get_authorization (self, rolle):
        """Berechtigung auslesen"""
        return self.__authorization
    
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
    Mensch1.set_authorization(Person.student)
    print (Mensch1.get_authorization())
