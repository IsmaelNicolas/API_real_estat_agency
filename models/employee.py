from typing import Optional
from pydantic import BaseModel

class Employee(BaseModel):
    id_employee: Optional[str]
    emp_id_employee: Optional[str]
    name_employee: str
    lastname_employee: str
    email_employee: str
    password_employee: str
    position_employee: str
    permissions: str

    def __init__(self, name_employee: str, lastname_employee: str, email_employee: str, password_employee: str, position_employee: str, permissions: str, id_employee: Optional[str] = None, emp_id_employee: Optional[str] = None):
        super().__init__(
            id_employee=id_employee,
            emp_id_employee=emp_id_employee,
            name_employee=name_employee,
            lastname_employee=lastname_employee,
            email_employee=email_employee,
            password_employee=password_employee,
            position_employee=position_employee,
            permissions=permissions
        )
        if self.id_employee is None:
            self.id_employee = ""
        if self.emp_id_employee is None:
            self.emp_id_employee = "null"
