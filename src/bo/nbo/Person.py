from ..Role import Role

class Person ():

     student = Role ("Student")
     dozent = Role  ("Dozent")
     admin = Role ("Admin")

     def __init__ (self, name):

         self.__name = name
         self.__berechtigung = rolle

    def set_berechtigung (self, rolle):
        """Berechtigung setzen"""
        self.__berechtigung = rolle

    def get_berechtigung (self, rolle):
        """Berechtigung auslesen"""
        return self.__berechtigung


if __name__ == "__main__":

    """Person wird testhalber eine Berechtigung zugewiesen"""

    Mensch1 = Person ("Dani")
    Mensch1.set_berechtigung(Person.student)
    print (Mensch1.get_berechtigung())
