from ..Role import Role
from datetime import datetime

class Person (Role):

     student = Role ("Student")
     dozent = Role  ("Dozent")
     admin = Role ("Admin")

     def __init__ (self,id,creation_date,email, google_id,authorization, name):
        super.__init__()
        self.__name = ""
        self.__authorization = role
        self.__id = 0
        self.__creation_date =datetime.datetime.now()
        self.__google_id = 0
        self.__email = ""

    def set_authorization (self, name):
        """Berechtigung setzen"""
        self.__authorization = name

    def get_authorization (self):
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

     def get_google_id (self):
        """Auslesen der Google Id"""
        return self.__google_id

    def get_email (self):
        """Auslesen der Mail"""
        return self.__email

    def set_google_id(self, value):
        """Google Id setzen"""
        self.__google_id == 0




@staticmethod
    def from_tuples (tuples-list()):
        """Umwandeln eines DB tuples in ein Python Objekt (Person())"""
        result = []
        for (person_id, id, creation_date, email, google_id, authorization, name ) in tuples:
            person = Person()
            person.set_id (person_id)
            person.set_creation_date (creation_date)
            person.set_email (email)
            person.set_google_id (google_id)
            person.set_authorization (authorization)
            person.set_name (name)
            result.append (person)
        return result

@staticmethod
def from_dict(dictionary=dict()):
    """Umwandel eines Python dict () """
    person = Person()
    person.set__id(dictionary["id"])
    person.set__creation_date(dictionary["creation_date"])
    person.set__name(dictionary["name"])
    person.set__authorization(dictionary["authorization"])
    return person


if __name__ == "__main__":

    """Person wird testhalber eine Berechtigung zugewiesen"""

    Mensch1 = Person ()
    Mensch1.set_authorization(Person.student)
    Mensch1.set_name ("Dani")
    Mensch1.set_id (1)
    print(Mensch1)

