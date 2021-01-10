from so.State import State
from datetime import datetime

"""Realisierung der Hilfsklasse Automat für die Modellierung von Zuständen für Projekte"""

class Automat():

    def __init__(self, initial_state):
        """Beim Erzeugen des Objekts (Projekt) wird der Zustand automatisch auf neu gesetzt"""
        self._current_state = initial_state

    def set_state(self, state):
        self._current_state = state

    def get_state(self):
        return self._current_state

    def is_in_state(self, state):
        """Überprüfung, ob der momentane Zustand mit dem übertragenen Attribut übereinstimmt. Falls ja, gibt er True aus, falls nein, gibt er False aus."""
        return state == self._current_state