from fastapi import APIRouter, HTTPException,  Request
from config.db import connection
from utils.Utils import get_cookies,response2dict,addThreeMonths
from schemas.schemas import InsertClientData,InsertEconomicData

client = APIRouter()

@client.post('/api/clients/insert')
async def insert_client(client: InsertClientData,request: Request):
    try:
        conn = connection()
        
        with conn.cursor() as cursor:
            
            sql = "INSERT INTO client (ID_CLIENT, NAME_CLIENT, LASTNAME_CLIENT, PHONE_CLIENT, EMAIL_CLIENT, DIRECTION_CLIENT, MARITAL_STATUS_CLIENT) VALUES (%s, %s, %s, %s, %s, %s, %s);"
            values = (client.id_client,client.name_client,client.lastname_client,client.phone_client,client.email_client,client.direction_client,client.marital_status_client)
            cursor.execute(sql,values)
            conn.commit()

        with conn.cursor() as cursor:

            id_employee = get_cookies(request)
            sql = "INSERT INTO subscribe (ID_EMPLOYEE, ID_CLIENT, DATE_SUBSCRIBE, CITY_SUBSCRIBE) VALUES (%s, %s, current_date(), %s)"
            values = (id_employee,client.id_client,client.city_susbcribe)
            cursor.execute(sql,values)
            conn.commit()

        return client    

    except Exception as e:
       conn.rollback()
       print(e)
       raise HTTPException(status_code=409, detail=str(e))
    finally:
        conn.close()

@client.get('/api/client/{id_client}')
async def get_client(id_client:str,request: Request):

    conn = connection()
    try:
        with conn.cursor() as cursor:
            if "jwt" not in  request.cookies:
                raise HTTPException(status_code=401, detail="No autenticado")

            sql = "SELECT client.ID_CLIENT, client.NAME_CLIENT, client.LASTNAME_CLIENT, client.PHONE_CLIENT ,client.EMAIL_CLIENT, client.MARITAL_STATUS_CLIENT, client.DIRECTION_CLIENT,subscribe.DATE_SUBSCRIBE FROM  client , subscribe  WHERE client.id_client = %s;" 
            cursor.execute(sql,(id_client))
            answer = cursor.fetchone()

            if answer is None:
                raise HTTPException(status_code=404, detail="Client not found")
                
            return response2dict(answer=answer)
        
        
    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))

@client.put('/api/clients/insert/economiccard')
async def insert_data_client(client:InsertEconomicData,request: Request):
    
    try:
        conn = connection()
        with conn.cursor() as cursor:
            sql = "UPDATE client SET SPOUSE_NAME = %s, SPOUSE_OCUPATION = %s, SPOUSE_DIRECTION = %s, SPOUSE_SALARY = %s, SPOUSE_ENTITY = %s, OCUPATION_CLIENT = %s, SALARY_CLIENT = %s, ENTITY_CLIENT = %s, DIRECTION_ENTITY = %s WHERE ID_CLIENT = %s"
            values = (client.spouse_name,client.spouse_ocupation,client.spouse_direction,client.spouse_salary,client.spouse_entity,client.client_ocupation,client.client_salary,client.client_entity,client.entity_direction,client.id_client)
            cursor.execute(sql,values)
        conn.commit()

        with conn.cursor() as cursor:
            sql = "INSERT INTO property (ID_CLIENT, ID_PROPERTY, TYPE_PROPERTY, NEIGHBORHOOD) VALUES (%s, uuid(), %s, %s)"
            values = (client.id_client,client.type_property,client.property_direction)
            cursor.execute(sql,values)
        conn.commit()

        with conn.cursor() as cursor:
            sql = "INSERT INTO payment (ID_CLIENT, ID_PROPERTY, ID_PAYMENT, DESCRIPTION_PAYMENT, DATE_PAYMENT, VALUE_PAYMENT) VALUES (%s, (SELECT ID_PROPERTY FROM property WHERE ID_CLIENT = %s LIMIT 1), uuid(), 'Reservacion', CURRENT_DATE(), %s)"
            values = (client.id_client,client.id_client,client.payment)
            cursor.execute(sql,values)
        conn.commit()
        
        
        dates = [None] * 7

        for i in range(7):
            if i == 0:
                dates[i] = addThreeMonths()
            else:
                dates[i] = addThreeMonths(dates[i-1])

        
        for i in range(len(dates)-1):
            #insert_to_table(conn, client.id_client, i+1, dates[i], dates[i+1])
            sql = "INSERT INTO stage_client (ID_CLIENT, ID_STAGE, STAGE_START_DATE, STAGE_END_DATE, CONDITIONS) VALUES (%s, %s, %s, %s, 0);"
            with conn.cursor() as cursor:
                cursor.execute(sql, (client.id_client, i+1, dates[i],dates[i]))
            conn.commit()
        
        conn.close()  

        return client

    except Exception as e:
        raise e

@client.get('/api/economic/{id_client}')
async def get_economic_data(id_client:str,request:Request):
    conn = connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT  OCUPATION_CLIENT, SALARY_CLIENT, ENTITY_CLIENT, DIRECTION_ENTITY FROM client WHERE ID_CLIENT= %s;"
            cursor.execute(sql,(id_client))
            answer = cursor.fetchone()
            if answer is None:
                raise HTTPException(status_code=404, detail="Client not found")
            return answer
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=409,detail={e})
    
@client.get('/api/spouse/{id_client}')
async def get_spouse_data(id_client:str,request:Request):
    conn = connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT ID_CLIENT,SPOUSE_NAME, SPOUSE_OCUPATION, SPOUSE_DIRECTION, SPOUSE_SALARY, SPOUSE_ENTITY  FROM client where ID_CLIENT = %s;"
            cursor.execute(sql,(id_client))
            answer = cursor.fetchone()
            if answer is None:
                raise HTTPException(status_code=404, detail="Client not found")
            return answer
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=409,detail={e})
    

@client.get('/api/stage/{id_client}')
async def get_spouse_data(id_client:str,request:Request):
    conn = connection()
    try:
        with conn.cursor() as cursor:
            sql =  "SELECT stage.NAME_STAGE, stage_client.STAGE_START_DATE, stage_client.STAGE_END_DATE,stage_client.CONDITIONS FROM stage_client  JOIN stage ON stage.ID_STAGE = stage_client.ID_STAGE where stage_client.ID_CLIENT = %s"
            cursor.execute(sql,(id_client))
            answer = cursor.fetchone()
            if answer is None:
                raise HTTPException(status_code=404, detail="Client not found")
            return answer
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=409,detail={e})
    

@client.get('/api/employees')
async def get_employees(request: Request):

    conn = connection()
    try:
        with conn.cursor() as cursor:

            sql = "SELECT ID_EMPLOYEE, EMP_ID_EMPLOYEE, NAME_EMPLOYEE, LASTNAME_EMPLOYEE FROM employee WHERE POSITION_EMPLOYEE  = 'emp' OR POSITION_EMPLOYEE  = 'jefe' ORDER BY CASE WHEN POSITION_EMPLOYEE  = 'jefe' THEN ID_EMPLOYEE ELSE EMP_ID_EMPLOYEE end;"
            cursor.execute(sql,())
            answer = cursor.fetchall()

            if answer is None:
                raise HTTPException(status_code=404, detail="Client not found")
                
            return [response2dict(answer=el) for el in answer]
        
        
    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))
