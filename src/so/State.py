from so.Automat import Automat
from datetime import datetime

class State(Automat):

    def __init__(self):
        self._state_name = ""
        super().__init__()
        self._id = 0
        self._creation_date = datetime.now()
   
    def get_state_name(self):
        """State auslesen"""
        return self._state_name

    def set_state_name(self, state_name):
        """State setzen"""
        self._state_name = state_name

    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Stateinstanz."""
        return "Status: {}, im Zustand: {} ".format(self.get_id(), self.get_state_name())


if __name__ == "__main__":

    a = Automat(Automat.state_new)

    if a.is_in_state(Automat.state_new):
        print("Zustand des Projekts: Neu")

    a.set_state(Automat.state_approved)

    if a.is_in_state(Automat.state_approved):
        print("Zustand des Projekts: Genehmigt")

    a.set_state(Automat.state_declined)

    if a.is_in_state(Automat.state_declined):
        print("Zustand des Projekts: Abgelehnt")

    a.set_state(Automat.state_inReview)

    if a.is_in_state(Automat.state_inReview):
        print("Zustand des Projekts: In Bewertung")

    a.set_state(Automat.state_reviewCompleted)

    if a.is_in_state(Automat.state_reviewCompleted):
        print("Zustand des Projekts: Bewertung abgeschlossen")

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