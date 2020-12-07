from datetime import datetime

class State():

    def __init__(self, state_name):
        self._state_name = state_name
        super().__init__()
        self._id = 0
        self._creation_date = datetime.now()

    def get_state_name(self):
        """State auslesen"""
        return self._state_name

    def set_state_name(self, state_name):
        """State setzen"""
        self._state_name = state_name

    def get_id(self):
        """Auslesen der ID"""
        return self._id

    def set_id(self, value):
        """ID setzen"""
        self._id = value

    def get_creation_date(self):
        """Auslesen des Erstelldatums"""
        return self._creation_date

    def set_creation_date(self, creation_date):
        """Erstellungsdatum setzen"""
        self._creation_date = creation_date

    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Stateinstanz."""
        return "Id: {}, im Zustand: {} ".format(self.get_id(), self.get_state_name())