from datetime import datetime

"""Realisierung der Zustandsklasse für die Beschreibung von Projekten (Automaten)"""

class State():
    
    """Unveränderliche oder statische Variablen für die Zustände, die nach dem Anlegen eines Projekts diesem zugeordnet werden können"""

    state_new = "Neu"
    state_accepted = "Genehmigt"
    state_declined = "Abgelehnt"
    state_inReview = "In Bewertung"
    state_reviewCompleted = "Bewertung abgeschlossen"

    def __init__(self):
        self._state_name = ""
        self._id = 0
        self._creation_date = datetime.now()

    def set_state_name(self, state_name):
        """State setzen"""
        self._state_name = state_name
    
    def get_state_name(self):
        """State auslesen"""
        return self._state_name

    def set_id(self, value):
        """ID setzen"""
        self._id = value

    def get_id(self):
        """Auslesen der ID"""
        return self._id

    def set_creation_date(self, creation_date):
        """Erstellungsdatum setzen"""
        self._creation_date = creation_date

    def get_creation_date(self):
        """Auslesen des Erstelldatums"""
        return self._creation_date

    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Zustandinstanz"""
        return "Momentaner Zustand: {} {}".format(self.get_id(), self.get_state_name())