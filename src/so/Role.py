 from datetime import datetime
 from Automat import Automat
 
"""Basisklasse, für die Zuweisung der Berechtigungen der Personen"""
class Role():

    def __init__(self):

            super().__init__()
            self.__id = 0
            self.__creation_date = datetime.datetime.now()
            self.__name = ""

        def set_name (self, name):
            """Setzen eines Rollenname"""
            self._name = name 

        def get_name (self):
            """Auslesen des Rollennamen"""
            return self._name

        def __str__ (self):
            return self._name

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
