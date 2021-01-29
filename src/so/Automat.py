from so.State import State
from bo.nbo.NamedBusinessObject import NamedBusinessObject
from datetime import datetime

"""Realisierung der Hilfsklasse Automat für die Modellierung von Zuständen für Projekte"""

"""Die Klasse Automat besitzt keine ID und kein Erstellungsdatum und enthält lediglich den momentanen Zustand
und die zugehörigen Methoden für Setzen und Auslesen des Zustandes sowie die Abfrage des momentanen Zustands.
Die Klasse Project erbt von NamedBusinessObject bzw. BusinessObject und Automat. 
In der Klasse BusinessObject sind bereits ID und Erstellungszeitpunkt enthalten, weshalb diese Attribute
in Automat nicht definiert werden (sonst käme es bei der Vererbung an Project zu einer Doppelung).
Projekte sind Automaten und jegliche Methoden und Attribute werden auch nur über Projekt realisiert.
Die Klasse Automat ist somit eher als Hilfsklasse anzusehen ähnlich wie die abstrakten Basisklassen 
BusinessObject und NamedBusinessObject."""

class Automat(NamedBusinessObject):

    def __init__(self):
        """Beim Erzeugen des Objekts (Projekt) wird der Zustand automatisch auf neu gesetzt"""
        super().__init__()
        self._current_state = "Neu"

    def get_state(self):
        return self._current_state

    def set_state(self, state):
        self._current_state = state

    #def is_in_state(self, state):
    #    """Überprüfung, ob der momentane Zustand mit dem übertragenen Attribut übereinstimmt. Falls ja, gibt er True aus, falls nein, gibt er False aus."""
    #    return state == self._current_state