from fastapi import APIRouter, HTTPException, FastAPI, Request,Response
from schemas.schemas import LoginData
from models.employee import Employee
from config.db import connection,SECRET_KEY
from utils.Utils import response2dict,generateSha3
import jwt
import time
from typing import  Dict

auth = APIRouter()
secret_key = SECRET_KEY

@auth.get("/api/user",response_model=Dict[str,str])
def get_user(request: Request):
    cookie = None
    conn = connection()
    try:
        with conn.cursor() as cursor:
            if "jwt" not in  request.cookies:
                raise HTTPException(status_code=401, detail="No autenticado")
            
            cookie: str = request.cookies["jwt"]
            cookie = jwt.decode(cookie,secret_key,algorithms=['HS256'])
            id_employee = cookie['iss']
            
            sql = "SELECT * FROM employee WHERE id_employee = %s;"
            cursor.execute(sql,(id_employee))
            answer = cursor.fetchone()
            if answer is None:
                raise HTTPException(status_code=404, detail="Usuario no encontrado")
            employee = Employee(**response2dict(answer))
            return employee
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))
    finally:
        conn.close()

@auth.post("/api/login",response_model=Dict[str,str])
def login_user(login_data: LoginData,response:Response):
    employee = {}
    try:
        conn = connection()
        with conn.cursor() as cursor:
            sql = "SELECT * FROM employee WHERE email_employee = %s"
            cursor.execute(sql, (login_data.email_employee))
            answer = cursor.fetchone()

            if answer is None:
                raise HTTPException(status_code=404, detail="User not found")
            
            employee = response2dict(answer)   

            if employee['password_employee'] != generateSha3(login_data.password_employee):
                raise HTTPException(status_code=400, detail="Incorrect password")
            
            token_data = {
                'iss': employee['id_employee'],
                'exp': time.time() + 24 * 60 * 60 # 1 día
            }

            token = jwt.encode(token_data, secret_key, algorithm='HS256')

            response.set_cookie(
                key='jwt',
                value=token,
                expires=time.time() + 24 * 60 * 60,
                httponly= True,
                samesite= 'None',
                secure= True
            )
    except HTTPException as e:
        raise e
    except Exception as e:
       raise HTTPException(status_code=409, detail=str(e))
    finally:
        cursor.close()
        conn.close()

    return {"message": "Autenticación exitosa"}

@auth.post("/api/register",response_model=Dict[str,str])
def register_user(employee: Employee):

    try:
        conn = connection()
        employee.password_employee = generateSha3(employee.password_employee)
        with conn.cursor() as cursor:
            print(employee)
            sql = "INSERT INTO employee (ID_EMPLOYEE, EMP_ID_EMPLOYEE, NAME_EMPLOYEE, LASTNAME_EMPLOYEE, EMAIL_EMPLOYEE, PASSWORD_EMPLOYEE, PERMISSIONS,POSITION_EMPLOYEE) VALUES(uuid(), %s ,%s , %s, %s, %s, 'emp','emp');"
            cursor.execute(sql,(employee.emp_id_employee,employee.name_employee,employee.lastname_employee,employee.email_employee,employee.password_employee))
        conn.commit()
    except Exception as e:
       conn.rollback()
       print(e)
       raise HTTPException(status_code=409, detail=str(e))
    finally:
        conn.close()

    return employee

@auth.get("/api/logout")
def logout_user(response:Response):
    try:
        response.delete_cookie(key='jwt')
    except Exception as e:
        raise e

