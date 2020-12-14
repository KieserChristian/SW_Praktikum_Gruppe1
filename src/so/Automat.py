from so.State import State
from datetime import datetime

"""Realisierung der Automatenklasse für die Modellierung von Zuständen für Projekte"""

class Automat():

    def __init__(self, initial_state):
        """Beim Erzeugen des Objekts (Projekt) wird der Zustand automatisch auf neu gesetzt"""
        self._current_state = initial_state
        self._id = 0
        self._creation_date = datetime.now()

    def set_state(self, state):
        self._current_state = state

    def get_state(self):
        return self._current_state
    
    def set_id(self, value):
        self._id = value

    def get_id(self):
        return self._id

    def set_creation_date(self, creation_date):
        """Erstellungsdatum setzen"""
        self._creation_date = creation_date
    
    def get_creation_date(self):
        """Auslesen des Erstelldatums"""
        return self._creation_date

    def is_in_state(self, state):
        """Überprüfung, ob der momentane Zustand mit dem übertragenen Attribut übereinstimmt. Falls ja, gibt er True aus, falls nein, gibt er False aus."""
        return state == self._current_state



""" if __name__ == "__main__":

    a = Automat(Automat.state_new)

    if a.is_in_state(Automat.state_new):
        print("Zustand des Projekts: Neu")

    a.set_state(Automat.state_accepted)

    if a.is_in_state(Automat.state_accepted):
        print("Zustand des Projekts: Genehmigt")

    a.set_state(Automat.state_declined)

    if a.is_in_state(Automat.state_declined):
        print("Zustand des Projekts: Abgelehnt")

    a.set_state(Automat.state_inReview)

    if a.is_in_state(Automat.state_inReview):
        print("Zustand des Projekts: In Bewertung")

    a.set_state(Automat.state_reviewCompleted)

    if a.is_in_state(Automat.state_reviewCompleted):
        print("Zustand des Projekts: Bewertung abgeschlossen") """