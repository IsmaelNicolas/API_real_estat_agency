from pydantic import BaseModel
from typing import Optional

class LoginData(BaseModel):
    email_employee: str
    password_employee: str

class InsertEmployee(BaseModel):
    id_employee: Optional[str]
    emp_id_employee: Optional[str]
    name_employee: str
    lastname_employee: str
    email_employee: str
    password_employee: str
    position_employee:Optional[str]

class InsertPropertyData(BaseModel):
    emp_id_employee: Optional[str]
    position_employee:Optional[str]
    id_property: str
    area:str
    neighborhood:str
    quantity:str
    urbanization:str
    minimum:str

class InsertClientData(BaseModel):
    id_client: str
    name_client: str
    lastname_client: str
    email_client: str
    phone_client: str
    city_subscribe: str
    direction_client: str
    marital_status_client: str

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
    spouse_lastname: str
    spouse_ocupation: str
    spouse_direction: str
    spouse_salary: float
    spouse_entity: str
    client_ocupation: str
    client_salary: float
    client_entity: str
    entity_direction: str
    id_property: str
    payment: float

