 from datetime import datetime
 from Automat import Automat
 from Person import Person
 
"""Basisklasse, für die Zuweisung der Berechtigungen der Personen"""
class Role(Person):

    student = Role ("Student")
    dozent = Role  ("Dozent")
    admin = Role ("Admin")

    def __init__(self):

            super().__init__()
            self.__id = 0
            self.__creation_date = datetime.datetime.now()
            self.__static_attribute = ""

        def set_static_attribute (self, static_attribute):
            """Setzen eines statischen Attributs"""
            self.__static_attribute = static_attribute

        def get_static_attribute (self, static_attribute):
            """Auslesen eines statischen Attributs"""
            return self.__static_attribute
        
        #def set_role (self, person_id):
            """Setzen einer Rolle""" 
            
        #def get_role (self, person_id):
            """Auslesen einer Rolle"""

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
