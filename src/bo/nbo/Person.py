<<<<<<< HEAD
from Role import Role
=======
from ..Role import Role
>>>>>>> master
from datetime import datetime

class Person (Role):

     student = Role ("Student")
     dozent = Role  ("Dozent")
     admin = Role ("Admin")

<<<<<<< HEAD
def __init__ (self, id, creation_date, email, google_id, authorization, name):

        super().__init__()
        self.__creation_date = datetime.datetime.now()
        self.__id = 0
        self.__name == {1:student, 2:dozent, 3:admin}   
        self.__authorization = None   
        self.__google_id = 0 
        self.__email = ""

    

    def set_authorization(self, name):
            
        """Berechtigung setzen"""
        self.__authorization = name

    def get_authorization (self, name):
=======
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
>>>>>>> master
        """Berechtigung auslesen"""
        return self.__authorization
    
    def get_id (self):
        """Auslesen der ID"""
        return self.__id

<<<<<<< HEAD
=======
    def get_id (self):
        """Auslesen der ID"""
        return self.__id

>>>>>>> master
    def get_creation_date(self):
        """Auslesen des Erstelldatums"""
        return self.__creation_date

    def set_id (self, value):
        """ID setzen"""
        self.__id = value 

    def set_creation_date (self, creation_date):
        """Erstellungsdatum setzen"""
        self.__creation_date = creation_date

<<<<<<< HEAD
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
            person.set_creation_date(creation_date)
            person.set_email (email)
            person.set_google_id (google_id)
            person.set_authorization(authorization)
            person.set_name(name)
            result.append(person)
        return result


@staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict () """
        person = Person()
        person.set__id(dictionary["id"])
        person.set__creation_date(dictionary["creation_date"])
        person.set_email(dictionary["email"])
        person.set_google_id(dictionary["google_id"])
        person.set_authorization(dictionary["authorization"])
        person.set_name(dictionary["name"])
    return person
=======
>>>>>>> master

if __name__ == "__main__":

    """Person wird testhalber eine Berechtigung zugewiesen"""

    Mensch1 = Person ()
    Mensch1.set_authorization(Person.student)
    Mensch1.set_name ("Dani")
    Mensch1.set_id (1)
    print(Mensch1)

