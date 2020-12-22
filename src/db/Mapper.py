import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod


class Mapper (AbstractContextManager, ABC):
    
    def __init__(self):
        self._cnx = None

    def __enter__(self):
        
        if os.getenv('GAE_ENV', '').startswith('standard'):
            
            self._cnx = connector.connect(user='demo', password='demo',
                                          #unix_socket(Anbindung muss noch ergänzt werden)
                                          database='it_projekt')
        else:

            self._cnx = connector.connect(user='root', password='',
                                  host='127.0.0.1',
                                  database='it_projekt')

        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self._cnx.close()

   

    @abstractmethod
    def find_all(self):
        pass

    @abstractmethod
    def insert(self, object):
        pass

    @abstractmethod
    def update(self, object):
        pass

    @abstractmethod
    def delete(self, object):
        pass
