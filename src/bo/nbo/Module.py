from BusinessObject import BusinessObject
from NamedBusinessObjects import NamedBusinessObject

class Module(NamedBusinessObject):
    
    def __init__(self):
        super.__init__(self)
        self.__edv_number = 0
        self.__name = name


    def get_edv_number(self):
        return self.__edv_number

    def set_edv_number(self, value):
        self.__edv_number = value

   

@staticmethod
def from_dict(dictionary=dict()):
    """Umwandel eines Python dict () """
    module = Module()
    module.set__id(dictionary["id"])
    module.set__creation_date(dictionary["creation_date"])
    return module