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
                                          unix_socket='/cloudsql/sw-praktikum-gruppe1:europe-west3:sw-praktikum',
                                          database='sw_praktikum_cloud')
        else:

            self._cnx = connector.connect(user='demo', password='demo',
                                  host='127.0.0.1', port='3307',
                                  database='sw_praktikum_cloud')

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
