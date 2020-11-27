from datetime import datetime
from abc import ABC
from BusinessObjects import BusinessObject


class Participation(BusinessObject):
    def __init__(self):
    

        super().__init__(self)
        self.id = 0
        self._creation_date =datetime.datetime.now()

    def __str__(self):
        return "view of creation_date {}, participation_id {}"