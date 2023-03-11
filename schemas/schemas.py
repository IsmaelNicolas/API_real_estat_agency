from pydantic import BaseModel
from typing import Optional

class LoginData(BaseModel):
    email_employee: str
    password_employee: str

class InsertClientData(BaseModel):
    id_client: str
    name_client: str
    lastname_client: str
    phone_client: str
    email_client: str
    direction_client: str
    marital_status_client: str
    city_suscribe: str

class ReturnClientData(BaseModel):
    id_client: str
    name_client: str
    lastname_client: str
    phone_client: str
    email_client: str
    direction_client: str
    marital_status_client: str
    city_suscribe: str
    date_subscribe: str

class InsertEconomicData(BaseModel):
    id_client: Optional[str]
    spouse_name: str
    spouse_lastname: str
    spouse_ocupation: str
    spouse_direction: str
    spouse_salary: float
    spouse_entity: str
    client_ocupation: str
    client_salary: float
    client_entity: str
    entity_direction: str
    type_property: str
    property_direction: str
    payment: float
