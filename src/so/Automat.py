from so.State import State
from datetime import datetime

class Automat():
    """Unveränderliche oder statische Variablen für die Zustände, die nach dem anlegen eines Automats(Projekts) diesem zugeordnet werden können."""
    """Die statischen Variablen initiert ein Objekt der Klasse State"""

    state_new = State("Neu")
    state_accepted = State("Genehmigt")
    state_declined = State("Abgelehnt")
    state_inReview = State("In Bewertung")
    state_reviewCompleted = State("Bewertung abgeschlossen")

    def __init__(self, anfangszustand):
        """Beim erzeugen des Objekts (Projekt) wird der Zustand automatisch auf neu gesetzt"""

        self.current_state = anfangszustand
        super().__init__()
        self._id = 0
        self._creation_date = datetime.now()

    def set_current_state(self, current_state):
        self.current_state = current_state

    def get_current_state(self):
        return self.current_state

    def is_in_state(self, state):
        """Überprüfung, ob der momentane Zustand mit dem übertragenen Attribut übereinstimmt, ja gibt er true aus, sonst False"""
        return state == self.current_state



if __name__ == "__main__":

    a = Automat(Automat.state_new)

    if a.is_in_state(Automat.state_new):
        print("Zustand des Projekts: Neu")

    a.set_current_state(Automat.state_accepted)

    if a.is_in_state(Automat.state_accepted):
        print("Zustand des Projekts: Genehmigt")

    a.set_current_state(Automat.state_declined)

    if a.is_in_state(Automat.state_declined):
        print("Zustand des Projekts: Abgelehnt")

    a.set_current_state(Automat.state_inReview)

    if a.is_in_state(Automat.state_inReview):
        print("Zustand des Projekts: In Bewertung")

    a.set_current_state(Automat.state_reviewCompleted)

    if a.is_in_state(Automat.state_reviewCompleted):
        print("Zustand des Projekts: Bewertung abgeschlossen")