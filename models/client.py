from pydantic import BaseModel
from typing import Optional

class Client(BaseModel):
    id_client: str
    name_client: str
    lastname_client: str
    phone_client: str
    type_client: str
    email_client: str
    spouse_name: Optional[str] = ''
    spouse_ocupation: Optional[str] = ''
    spouse_direction: Optional[str] = ''
    spouse_salary: Optional[float] = 0.0
    spouse_entity: Optional[str] = ''
    direction_client: Optional[str] = ''
    ocupation_client: Optional[str] = ''
    salary_client: Optional[float] = 0.0
    marital_status_client: Optional[str] = ''
    entity_client: Optional[str] = ''
    direction_entity: Optional[str] = ''
    entity_name: Optional[str] = ''

    def __init__(self, id_client: str, name_client: str, lastname_client: str, phone_client: str,
                 type_client: str, email_client: str, spouse_name: Optional[str] = '',
                 spouse_ocupation: Optional[str] = '', spouse_direction: Optional[str] = '',
                 spouse_salary: Optional[float] = 0.0, spouse_entity: Optional[str] = '',
                 direction_client: Optional[str] = '', ocupation_client: Optional[str] = '',
                 salary_client: Optional[float] = 0.0, marital_status_client: Optional[str] = '',
                 entity_client: Optional[str] = '', direction_entity: Optional[str] = '',
                 entity_name: Optional[str] = ''):

        self.id_client = id_client
        self.name_client = name_client
        self.lastname_client = lastname_client
        self.phone_client = phone_client
        self.type_client = type_client
        self.email_client = email_client
        self.spouse_name = spouse_name
        self.spouse_ocupation = spouse_ocupation
        self.spouse_direction = spouse_direction
        self.spouse_salary = spouse_salary
        self.spouse_entity = spouse_entity
        self.direction_client = direction_client
        self.ocupation_client = ocupation_client
        self.salary_client = salary_client
        self.marital_status_client = marital_status_client
        self.entity_client = entity_client
        self.direction_entity = direction_entity
        self.entity_name = entity_name
