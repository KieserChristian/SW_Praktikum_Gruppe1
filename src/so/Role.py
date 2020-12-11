from datetime import datetime
#from so.Automat import Automat
 
"""Basisklasse, für die Zuweisung der Berechtigungen der Personen"""

class Role():

    """ student = Role ("Student")
    dozent = Role  ("Dozent")
    admin = Role ("Admin") """

    def __init__(self):
        #Vererbung noch einmal überarbeiten
        #super().__init__()
        self._id = 0
        self._creation_date = datetime.now()
        self._static_attribute = ""

    def set_static_attribute(self, static_attribute):
        """Setzen eines statischen Attributs"""
        self._static_attribute = static_attribute

    def get_static_attribute(self, static_attribute):
        """Auslesen eines statischen Attributs"""
        return self._static_attribute

    def get_id(self):
        """Auslesen der ID"""
        return self._id

    def get_creation_date(self):
        """Auslesen des Erstelldatums"""
        return self._creation_date

    def set_id(self, value):
        """ID setzen"""
        self._id = value

    def set_creation_date(self, creation_date):
        """Erstellungsdatum setzen"""
        self._creation_date = creation_date
