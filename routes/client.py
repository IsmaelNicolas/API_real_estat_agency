from io import BytesIO
from fastapi import APIRouter, HTTPException,  Request, Response
from config.db import connection, SECRET_KEY
from utils.Utils import get_cookies, response2dict, addThreeMonths, generar_uuid, sumar_fechas
from schemas.schemas import InsertClientData, InsertEconomicData, InsertPropertyData, UpdateStage
from models.PDF import PDF
from models.PDF import *
import tempfile
import datetime as dt
import jwt
import os

client = APIRouter()


@client.post('/api/clients/insert')
async def insert_client(client: InsertClientData, request: Request):
    try:
        conn = connection()

        with conn.cursor() as cursor:
            print(client)
            sql = "INSERT INTO CLIENT (ID_CLIENT, NAME_CLIENT, LASTNAME_CLIENT, PHONE_CLIENT, EMAIL_CLIENT, DIRECTION_CLIENT, MARITAL_STATUS_CLIENT) VALUES (%s, %s, %s, %s, %s, %s, %s);"
            values = (client.id_client, client.name_client, client.lastname_client, client.phone_client,
                      client.email_client, client.direction_client, client.marital_status_client)
            cursor.execute(sql, values)
            conn.commit()

        with conn.cursor() as cursor:

            sql = "INSERT INTO SUBSCRIBE (ID_EMPLOYEE, ID_CLIENT, DATE_SUBSCRIBE, CITY_SUBSCRIBE) VALUES (%s, %s, current_date(), %s)"
            values = (client.id_employee, client.id_client,
                      client.city_subscribe)
            cursor.execute(sql, values)
            conn.commit()

        return client

    except Exception as e:
        conn.rollback()
        print(e)
        raise HTTPException(status_code=409, detail=str(e))
    finally:
        conn.close()


@client.get('/api/client/{id_client}')
async def get_client(id_client: str, request: Request):

    conn = connection()
    try:
        with conn.cursor() as cursor:
            if "jwt" not in request.cookies:
                raise HTTPException(status_code=401, detail="No autenticado")

            sql = "SELECT CLIENT.ID_CLIENT, CLIENT.NAME_CLIENT, CLIENT.LASTNAME_CLIENT, CLIENT.PHONE_CLIENT ,CLIENT.EMAIL_CLIENT, CLIENT.MARITAL_STATUS_CLIENT, CLIENT.DIRECTION_CLIENT,SUBSCRIBE.DATE_SUBSCRIBE FROM  CLIENT , SUBSCRIBE  WHERE CLIENT.id_client = %s;"
            cursor.execute(sql, (id_client))
            answer = cursor.fetchone()
            print(answer)
            if answer is None:
                raise HTTPException(status_code=404, detail="Client not found")

            return response2dict(answer=answer)

    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))


@client.get('/api/client/search/{lastname}')
async def get_client_by_lastname(lastname: str, request: Request):

    conn = connection()
    try:
        with conn.cursor() as cursor:
            if "jwt" not in request.cookies:
                raise HTTPException(status_code=401, detail="No autenticado")

            cookie: str = request.cookies["jwt"]
            cookie = jwt.decode(cookie, SECRET_KEY, algorithms=['HS256'])
            id_employee = cookie['iss']

            sql = "SELECT c.ID_CLIENT,c.NAME_CLIENT,c.LASTNAME_CLIENT,s.DATE_SUBSCRIBE FROM CLIENT AS c INNER JOIN SUBSCRIBE AS s ON c.ID_CLIENT = s.ID_CLIENT WHERE  c.LASTNAME_CLIENT LIKE %s"
            cursor.execute(sql, (f'%{lastname}%'))
            answer = cursor.fetchall()

            if answer is None:
                raise HTTPException(status_code=404, detail="Client not found")

            return [response2dict(answer=ans) for ans in answer]

    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))


@client.put('/api/clients/insert/economiccard')
async def insert_data_client(client: InsertEconomicData, request: Request):
    # print(client)
    dic = {"finishes": "Acabados", "property_type": "Tipo de propiedad",
           "floors": "Pisos",  "value": "Costos", "construction": "Contruccion m2", "terrain": "Terreno m2"}

    # fecha_hora_str = client.date_reunion
    # fecha_hora = dt.datetime.strptime(fecha_hora_str, "%Y-%m-%dT%H:%M")
    # fecha_hora_formatted = fecha_hora.strftime('%Y-%m-%d %H:%M:%S')

    try:
        conn = connection()
        with conn.cursor() as cursor:
            sql = "UPDATE CLIENT SET SPOUSE_NAME = %s, SPOUSE_OCUPATION = %s, SPOUSE_DIRECTION = %s, SPOUSE_SALARY = %s, SPOUSE_ENTITY = %s, OCUPATION_CLIENT = %s, SALARY_CLIENT = %s, ENTITY_CLIENT = %s, DIRECTION_ENTITY = %s ,CLIENT_POSITION = %s WHERE ID_CLIENT = %s"
            values = (client.spouse_lastname, client.spouse_ocupation, client.spouse_direction, client.spouse_salary, client.spouse_entity,
                      client.client_ocupation, client.client_salary, client.client_entity, client.entity_direction, client.client_position, client.id_client)
            cursor.execute(sql, values)
        conn.commit()

        print("update ok")

        with conn.cursor() as cursor:
            sql = "INSERT INTO BUY (ID_CLIENT, ID_TERRAIN, PAYMENT_DATE, PAYMENT_VALUE) VALUES(%s, %s, %s , %s);"
            values = (client.id_client, client.id_property,
                      client.date_reunion, client.payment)
            cursor.execute(sql, values)
        conn.commit()

        id_property = generar_uuid()
        print("insert buy ok")

        with conn.cursor() as cursor:
            sql = "INSERT INTO PROPERTY (ID_TERRAIN, ID_PROPERTY,ID_CLIENT) VALUES(%s, %s,%s);"
            values = (client.id_property, id_property, client.id_client)
            cursor.execute(sql, values)
        conn.commit()

        print("insert property ok")

        dates = [client.date_reunion]

        for i in range(8):
            if i != 0:
                dates.append(addThreeMonths(dates[i-1]))

        for i in range(len(dates)-1):
            # insert_to_table(conn, client.id_client, i+1, dates[i], dates[i+1])
            sql = "INSERT INTO STAGE_CLIENT (ID_CLIENT, ID_STAGE, STAGE_START_DATE, STAGE_END_DATE, CONDITIONS,MEETING_TIME) VALUES (%s, %s, %s, %s, 0,%s);"
            with conn.cursor() as cursor:
                cursor.execute(
                    sql, (client.id_client, i+1, dates[i], dates[i+1], client.meeting_time))
            conn.commit()

        print("insert stage_client ok")

        for feature in client.features:
            print(feature["name"], feature["value"])
            sql = "INSERT INTO FEATUREPROPERTY (ID_TERRAIN, ID_FEATURE, VALUE_FEATURE,ID_PROPERTY) VALUES(%s, (SELECT f.ID_FEATURE from FEATURE f WHERE f.NAME_FEATURE = %s),%s,%s);"
            with conn.cursor() as cursor:
                values = (client.id_property,
                          dic[feature["name"]], feature["value"], id_property)
                cursor.execute(sql, values)

            conn.commit()

        print("insert feature property ok")

        with conn.cursor() as cursor:
            sql = "UPDATE TERRAIN SET QUANTITY=QUANTITY - 1  WHERE ID_TERRAIN= %s;"
            values = (client.id_property)
            cursor.execute(sql, values)
        conn.commit()

        print("update terrain ok")

        conn.close()

        return client

    except Exception as e:
        raise e


@client.get('/api/economic/{id_client}')
async def get_economic_data(id_client: str, request: Request):
    conn = connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT  OCUPATION_CLIENT, SALARY_CLIENT, ENTITY_CLIENT, DIRECTION_ENTITY FROM CLIENT WHERE ID_CLIENT= %s;"
            cursor.execute(sql, (id_client))
            answer = cursor.fetchone()
            if answer is None:
                raise HTTPException(
                    status_code=404, detail="Client economic not found")

            if None in answer.values():
                raise HTTPException(
                    status_code=404, detail="Client economic not found")

            return response2dict(answer=answer)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=409, detail={e})


@client.get('/api/spouse/{id_client}')
async def get_spouse_data(id_client: str, request: Request):
    conn = connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT ID_CLIENT,SPOUSE_NAME, SPOUSE_OCUPATION, SPOUSE_DIRECTION, SPOUSE_SALARY, SPOUSE_ENTITY  FROM CLIENT where ID_CLIENT = %s;"
            cursor.execute(sql, (id_client))
            answer = cursor.fetchone()
            print(answer)
            if answer is None:
                raise HTTPException(status_code=404, detail="spouse not found")
            if None in answer.values():
                raise HTTPException(status_code=404, detail="spouse not found")
            return response2dict(answer=answer)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=409, detail={e})


@client.get('/api/property/{id_client}')
async def get_property_data(id_client: str, request: Request):
    conn = connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT t.ID_TERRAIN ,t.AREA ,t.URBANIZATION ,t.NEIGHBORHOOD  FROM BUY b ,PROPERTY p ,CLIENT c ,TERRAIN t WHERE b.ID_TERRAIN = t.ID_TERRAIN AND c.ID_CLIENT = %s;"
            cursor.execute(sql, (id_client))
            answer = cursor.fetchone()
            if answer is None:
                raise HTTPException(
                    status_code=404, detail="Property not found")
            if None in answer.values():
                raise HTTPException(
                    status_code=404, detail="Property not found")
            return response2dict(answer=answer)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=409, detail={e})


@client.get('/api/stage/{id_client}')
async def get_stage_data(id_client: str, request: Request):
    conn = connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT STAGE.NAME_STAGE, STAGE_CLIENT.STAGE_START_DATE, STAGE_CLIENT.STAGE_END_DATE,STAGE_CLIENT.CONDITIONS FROM STAGE_CLIENT  JOIN STAGE ON STAGE.ID_STAGE = STAGE_CLIENT.ID_STAGE where STAGE_CLIENT.ID_CLIENT = %s"
            cursor.execute(sql, (id_client))
            answer = cursor.fetchall()
            if answer == ():
                raise HTTPException(status_code=404, detail="Stage not foud")

            return [response2dict(answer=ans) for ans in answer]

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=409, detail={e})


@client.get('/api/employees')
async def get_employees():

    conn = connection()
    try:
        with conn.cursor() as cursor:

            sql = "SELECT ID_EMPLOYEE, EMP_ID_EMPLOYEE, NAME_EMPLOYEE, LASTNAME_EMPLOYEE FROM EMPLOYEE WHERE PERMISSIONS != 'admin' AND POSITION_EMPLOYEE = 'Asesor'"
            cursor.execute(sql, ())
            answer = cursor.fetchall()

            if answer is None:
                raise HTTPException(status_code=404, detail="Client not found")

            return [response2dict(answer=el) for el in answer]

    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))


@client.get('/api/employes')
async def get_employees():

    conn = connection()
    try:
        with conn.cursor() as cursor:

            sql = "SELECT ID_EMPLOYEE, EMP_ID_EMPLOYEE, NAME_EMPLOYEE, LASTNAME_EMPLOYEE FROM EMPLOYEE WHERE PERMISSIONS = 'admin'"
            cursor.execute(sql, ())
            answer = cursor.fetchall()

            if answer is None:
                raise HTTPException(status_code=404, detail="Client not found")

            return [response2dict(answer=el) for el in answer]

    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))


@client.get('/api/employees/admin')
async def get_employees():

    conn = connection()
    try:
        with conn.cursor() as cursor:

            sql = "SELECT ID_EMPLOYEE, EMP_ID_EMPLOYEE, NAME_EMPLOYEE, LASTNAME_EMPLOYEE,POSITION_EMPLOYEE FROM EMPLOYEE WHERE PERMISSIONS != 'admin'"
            cursor.execute(sql, ())
            answer = cursor.fetchall()

            if answer is None:
                raise HTTPException(status_code=404, detail="Client not found")

            return [response2dict(answer=el) for el in answer]

    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))


@client.get('/api/properties')
async def get_properties(request: Request):
    conn = connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT ID_TERRAIN, NEIGHBORHOOD, URBANIZATION, QUANTITY, AREA ,MINIMUM FROM TERRAIN WHERE QUANTITY > MINIMUM ;"
            cursor.execute(sql)
            answer = cursor.fetchall()

            if len(answer) == 0:
                raise HTTPException(
                    status_code=404, detail="No existen propiedades disponibles")
            return [response2dict(answer=el) for el in answer]

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=409, detail={e})


@client.post('/api/insert/property')
async def insert_property(property: InsertPropertyData):

    try:
        conn = connection()
        with conn.cursor() as cursor:

            sql = "INSERT INTO TERRAIN (ID_TERRAIN, NEIGHBORHOOD, URBANIZATION, AREA, MINIMUM, QUANTITY) VALUES(%s,%s , %s,%s, %s, %s);"
            values = (property.id_terrain, property.neighborhood, property.urbanization,
                      property.area, property.minimum, property.quantity)
            cursor.execute(sql, values)
            conn.commit()
        return property
    except Exception as e:
        conn.rollback()
        print(e)
        raise HTTPException(status_code=409, detail=str(e))
    finally:
        conn.close()


def get_stage_report_data(id_client: str):
    conn = connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT MEETING_TIME  FROM STAGE_CLIENT sc WHERE ID_CLIENT = %s and CONDITIONS = 0 ORDER by STAGE_END_DATE LIMIT 1"
            cursor.execute(sql, (id_client))
            hour = cursor.fetchone()
            if hour == None:
                raise HTTPException(status_code=404, detail="person not foud")
            hour["MEETING_TIME"] = str(hour["MEETING_TIME"])
            print(hour)

        with conn.cursor() as cursor:
            sql = "SELECT c.ID_CLIENT,c.NAME_CLIENT ,c.LASTNAME_CLIENT from CLIENT as c WHERE ID_CLIENT =  %s;"
            cursor.execute(sql, (id_client))
            person = cursor.fetchone()
            if person == ():
                raise HTTPException(status_code=404, detail="Stage not foud")

        with conn.cursor() as cursor:
            sql = "SELECT sc.STAGE_START_DATE , sc.STAGE_END_DATE , s.NAME_STAGE ,sc.CONDITIONS  from STAGE_CLIENT as sc, STAGE as s  WHERE ID_CLIENT = %s and s.ID_STAGE =sc.ID_STAGE ;"
            cursor.execute(sql, (id_client))
            stage = cursor.fetchall()
            if stage == ():
                raise HTTPException(status_code=404, detail="Stage not foud")

        with conn.cursor() as cursor:
            sql = "SELECT e.EMAIL_EMPLOYEE  from CLIENT c ,EMPLOYEE e , SUBSCRIBE s WHERE c.ID_CLIENT = s.ID_CLIENT AND e.ID_EMPLOYEE =s.ID_EMPLOYEE AND s.ID_CLIENT = %s;"
            cursor.execute(sql, (id_client))
            consultant = cursor.fetchone()
            if stage == ():
                raise HTTPException(status_code=404, detail="Stage not foud")

        return response2dict(person), [response2dict(answer=ans) for ans in stage], response2dict(consultant), response2dict(hour)

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=409, detail={e})


@client.get('/api/reportstage/{id_client}')
async def get_stage_report(id_client: str):

    person, stages, consultant, hour = get_stage_report_data(id_client)
    print(person)

    pdf = ReportStages()
    name = person["name_client"] + " " + person["lastname_client"]
    # pdf.content(name, person["id_client"],consultant["email_employee"], stages)
    pdf.content(name, person["id_client"],
                "kledesma@consorcioaccion.com", stages, hour)
    pdf.output('reporte_proyecto.pdf', 'F')

    # Crear un archivo temporal para almacenar el PDF
    with tempfile.NamedTemporaryFile(delete=False) as f:
        pdf.output(f.name)
        filename = f.name

    # Leer el archivo temporal y devolver su contenido como respuesta HTTP
    with open(filename, mode='rb') as f:
        content = f.read()

    os.unlink(filename)

    response = Response(content=content, media_type='application/pdf')
    response.headers['Content-Disposition'] = f'attachment; filename= etapas.pdf'
    return response


@client.get('/api/notifications/')
async def get_stage_report(request: Request):
    conn = connection()
    try:

        if "jwt" not in request.cookies:
            print("No hay cookie")
            raise HTTPException(status_code=401, detail="No autenticado")

        cookie: str = request.cookies["jwt"]
        cookie = jwt.decode(cookie, SECRET_KEY, algorithms=['HS256'])
        id_employee = cookie['iss']

        with conn.cursor() as cursor:
            sql = "SELECT * FROM EMPLOYEE WHERE id_employee = %s;"
            cursor.execute(sql, (id_employee))
            answer = cursor.fetchone()

        with conn.cursor() as cursor:
            #cursor.execute("SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))")
            #print(id_employee)
            if (answer["POSITION_EMPLOYEE"] == "Secretaria"):
                cursor.execute("SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))")
                sql = "SELECT CONCAT(e.NAME_EMPLOYEE,' ',e.LASTNAME_EMPLOYEE) as \"employee\" ,sc.ID_CLIENT ,CONCAT(c.NAME_CLIENT ,' ',c.LASTNAME_CLIENT) as \"client\", sc.ID_STAGE , s.NAME_STAGE ,DATE(sc.STAGE_END_DATE) AS \"STAGE_END_DATE\" ,CAST(TIME_FORMAT(sc.MEETING_TIME, '%H:%i:%s') AS CHAR) AS MEETING_TIME FROM STAGE_CLIENT sc,STAGE s, CLIENT c ,EMPLOYEE e  ,SUBSCRIBE sb WHERE CONDITIONS = 0 AND s.ID_STAGE =sc.ID_STAGE AND sc.ID_CLIENT =c.ID_CLIENT AND sb.ID_EMPLOYEE = e.ID_EMPLOYEE AND sb.ID_CLIENT  = c.ID_CLIENT GROUP BY sc.ID_CLIENT ORDER BY sc.STAGE_END_DATE LIMIT 10"
                cursor.execute(sql)
            else:
                cursor.execute("SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))")
                sql = "SELECT CONCAT(e.NAME_EMPLOYEE,' ',e.LASTNAME_EMPLOYEE) as employee,CONCAT(c.NAME_CLIENT ,' ',c.LASTNAME_CLIENT) as client , sc.ID_CLIENT,sc.ID_STAGE,s.NAME_STAGE,sc.STAGE_END_DATE, sc.MEETING_TIME FROM STAGE_CLIENT sc,STAGE s ,EMPLOYEE e ,CLIENT c WHERE CONDITIONS = 0 AND s.ID_STAGE =sc.ID_STAGE AND sc.ID_CLIENT =c.ID_CLIENT AND e.ID_EMPLOYEE = %s GROUP BY sc.ID_CLIENT ORDER BY sc.STAGE_END_DATE LIMIT 10"
                cursor.execute(sql, (id_employee))

            answer = cursor.fetchall()
            if answer is None:
                raise HTTPException(
                    status_code=404, detail="Clients not found")

            return [response2dict(answer=ans) for ans in answer]

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=409, detail={e})


@client.put('/api/update/stage')
async def insert_data_client(stage: UpdateStage):
    print(client)
    try:
        conn = connection()
        with conn.cursor() as cursor:
            sql = "UPDATE STAGE_CLIENT SET  CONDITIONS=1 WHERE ID_CLIENT=%s AND ID_STAGE=%s;"
            values = (stage.id_client, stage.id_stage)
            cursor.execute(sql, values)
        conn.commit()
        return stage
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=409, detail={e})


@client.post('/api/reschedule/')
async def reschedule_stages(data: UpdateStage):
    print(data)
    conn = connection()
    try:
        with conn.cursor() as cursor:
            sql = "UPDATE STAGE_CLIENT SET MEETING_TIME = %s, STAGE_END_DATE = ADDDATE(NOW(), INTERVAL 1 MONTH) WHERE ID_STAGE = %s AND ID_CLIENT = %s"
            cursor.execute(
                sql, (data.meeting_time, data.id_stage, data.id_client))
        conn.commit()
        meses = 3
        for i in range(int(data.id_stage), 7):
            with conn.cursor() as cursor:
                sql = "UPDATE STAGE_CLIENT SET MEETING_TIME = %s, STAGE_END_DATE = DATE_ADD( (SELECT t.STAGE_END_DATE FROM (SELECT STAGE_END_DATE FROM STAGE_CLIENT WHERE ID_STAGE = %s AND ID_CLIENT = %s) t ), INTERVAL %s MONTH) WHERE ID_STAGE = %s AND ID_CLIENT = %s;"
                values = (data.meeting_time, data.id_stage,
                          data.id_client, meses, i+1, data.id_client)
                cursor.execute(sql, values)
            meses += 3
            conn.commit()

        for i in range(int(data.id_stage), 7):
            with conn.cursor() as cursor:
                sql = "UPDATE STAGE_CLIENT SET STAGE_START_DATE = ( SELECT sub.STAGE_END_DATE from(	SELECT STAGE_END_DATE from STAGE_CLIENT			WHERE ID_STAGE = %s AND ID_CLIENT = %s) sub)  WHERE ID_STAGE = %s AND ID_CLIENT = %s"
                values = (i, data.id_client, i+1, data.id_client)
                cursor.execute(sql, values)
            conn.commit()

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=409, detail={e})


def get_data_report_reservation(id_client):
    conn = connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT c.*, p.ID_TERRAIN FROM CLIENT c JOIN PROPERTY p ON c.ID_CLIENT = p.ID_CLIENT WHERE p.ID_CLIENT = %s"
            cursor.execute(sql, (id_client))
            person = cursor.fetchone()
            # print(person)
            if person == ():
                raise HTTPException(status_code=404, detail="Stage not foud")

        with conn.cursor() as cursor:
            sql = "SELECT f.NAME_FEATURE ,fp.VALUE_FEATURE FROM FEATURE f JOIN FEATUREPROPERTY fp ON f.ID_FEATURE = fp.ID_FEATURE JOIN PROPERTY p ON fp.ID_PROPERTY = p.ID_PROPERTY JOIN BUY b ON p.ID_TERRAIN = b.ID_TERRAIN AND p.ID_CLIENT = b.ID_CLIENT WHERE b.ID_CLIENT = %s"
            cursor.execute(sql, (id_client))
            features = cursor.fetchall()
            # print(features)

        with conn.cursor() as cursor:
            sql = "SELECT e.NAME_EMPLOYEE , e.LASTNAME_EMPLOYEE  FROM EMPLOYEE e ,SUBSCRIBE s WHERE e.ID_EMPLOYEE = s.ID_EMPLOYEE and s.ID_CLIENT = %s"
            cursor.execute(sql, (id_client))
            consultant = cursor.fetchone()
            # print(consultant)

        # return person,consultant,features
        return response2dict(person), [response2dict(answer=ans) for ans in features], response2dict(consultant)

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=409, detail={e})


@client.get('/api/report/reservation/{id_client}')
async def get_reservation_report(id_client: str):
    client, features, consultant = get_data_report_reservation(
        id_client=id_client)
    pdf = ReportReservation()

    pdf.content(client, features, consultant)
    pdf.output('reporte_reserva.pdf', 'F')

    # Crear un archivo temporal para almacenar el PDF
    with tempfile.NamedTemporaryFile(delete=False) as f:
        pdf.output(f.name)
        filename = f.name

    # Leer el archivo temporal y devolver su contenido como respuesta HTTP
    with open(filename, mode='rb') as f:
        content = f.read()

    os.unlink(filename)

    response = Response(content=content, media_type='application/pdf')
    response.headers['Content-Disposition'] = f'attachment; filename= reserva.pdf'
    return response


def get_sales_data(month: str):
    conn = connection()

    if month == "0":
        sql = "SELECT c.ID_CLIENT ,CONCAT(c.NAME_CLIENT, ' ', c.LASTNAME_CLIENT) AS FULLNAME_CLIENT ,CONCAT(e.NAME_EMPLOYEE, ' ', e.LASTNAME_EMPLOYEE) AS FULLNAME_EMPLOYEE ,MONTH(PAYMENT_DATE) AS MONTHP, b.ID_TERRAIN ,b.PAYMENT_VALUE FROM BUY b, CLIENT c, EMPLOYEE e, SUBSCRIBE s WHERE c.ID_CLIENT = b.ID_CLIENT AND YEAR(CURRENT_DATE()) = YEAR(PAYMENT_DATE) AND s.ID_EMPLOYEE = e.ID_EMPLOYEE AND c.ID_CLIENT = s.ID_CLIENT ORDER BY PAYMENT_DATE;"
        values = ()
    else:
        sql = "SELECT c.ID_CLIENT ,CONCAT(c.NAME_CLIENT, ' ', c.LASTNAME_CLIENT) AS FULLNAME_CLIENT ,CONCAT(e.NAME_EMPLOYEE, ' ', e.LASTNAME_EMPLOYEE) AS FULLNAME_EMPLOYEE ,MONTH(PAYMENT_DATE) AS MONTHP, b.ID_TERRAIN ,b.PAYMENT_VALUE FROM BUY b, CLIENT c, EMPLOYEE e, SUBSCRIBE s WHERE MONTH(PAYMENT_DATE) = %s AND YEAR(CURRENT_DATE()) = YEAR(PAYMENT_DATE) AND c.ID_CLIENT = b.ID_CLIENT AND s.ID_EMPLOYEE =e.ID_EMPLOYEE AND c.ID_CLIENT = s.ID_CLIENT ORDER BY PAYMENT_DATE;"
        values = (month,)

    try:
        with conn.cursor() as cursor:
            # print(values)
            cursor.execute(sql, values)
            answer = cursor.fetchall()
            # print(answer)
            if answer == None:
                raise HTTPException(status_code=404, detail="Sales not foud")

            return [response2dict(answer=ans) for ans in answer]

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=409, detail={e})


@client.get('/api/report/sales/{month}')
async def get_sales_report(month: str):

    data = get_sales_data(month)
    pdf = ReportSell()
    pdf.content(data)
    pdf.output('reporte_ventas.pdf', 'F')

    # Crear un archivo temporal para almacenar el PDF
    with tempfile.NamedTemporaryFile(delete=False) as f:
        pdf.output(f.name)
        filename = f.name

    # Leer el archivo temporal y devolver su contenido como respuesta HTTP
    with open(filename, mode='rb') as f:
        content = f.read()

    os.unlink(filename)

    response = Response(content=content, media_type='application/pdf')
    response.headers['Content-Disposition'] = f'attachment; filename= reserva.pdf'
    return response


def get_next_data(request: Request):
    conn = connection()
    try:

        if "jwt" not in request.cookies:
            print("No hay cookie")
            raise HTTPException(status_code=401, detail="No autenticado")

        cookie: str = request.cookies["jwt"]
        cookie = jwt.decode(cookie, SECRET_KEY, algorithms=['HS256'])
        id_employee = cookie['iss']

        with conn.cursor() as cursor:
            sql = "SELECT * FROM EMPLOYEE WHERE id_employee = %s;"
            cursor.execute(sql, (id_employee))
            answer = cursor.fetchone()
            position = answer["POSITION_EMPLOYEE"]

        with conn.cursor() as cursor:
            cursor.execute(
                "SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))")
            # print(answer["POSITION_EMPLOYEE"])
            if (answer["POSITION_EMPLOYEE"] == "Secretaria"):
                sql = "SELECT CONCAT(e.NAME_EMPLOYEE,' ',e.LASTNAME_EMPLOYEE) as \"employee\" ,sc.ID_CLIENT ,CONCAT(c.NAME_CLIENT ,' ',c.LASTNAME_CLIENT) as \"client\", sc.ID_STAGE , s.NAME_STAGE ,DATE(sc.STAGE_END_DATE) AS \"STAGE_END_DATE\" ,CAST(TIME_FORMAT(sc.MEETING_TIME, '%H:%i:%s') AS CHAR) AS MEETING_TIME FROM STAGE_CLIENT sc,STAGE s, CLIENT c ,EMPLOYEE e  ,SUBSCRIBE sb WHERE CONDITIONS = 0 AND s.ID_STAGE =sc.ID_STAGE AND sc.ID_CLIENT =c.ID_CLIENT AND sb.ID_EMPLOYEE = e.ID_EMPLOYEE AND sb.ID_CLIENT  = c.ID_CLIENT GROUP BY sc.ID_CLIENT ORDER BY sc.STAGE_END_DATE LIMIT 10"
                cursor.execute(sql)
            else:
                sql = "SELECT CONCAT(e.NAME_EMPLOYEE,' ',e.LASTNAME_EMPLOYEE) as employee , CONCAT(c.NAME_CLIENT ,' ',c.LASTNAME_CLIENT) as client , sc.ID_CLIENT , sc.ID_STAGE , s.NAME_STAGE ,sc.STAGE_END_DATE  ,sc.MEETING_TIME FROM STAGE_CLIENT sc,STAGE s ,EMPLOYEE e ,CLIENT c WHERE CONDITIONS = 0 AND s.ID_STAGE =sc.ID_STAGE AND sc.ID_CLIENT =c.ID_CLIENT AND e.ID_EMPLOYEE = %s GROUP BY sc.ID_CLIENT ORDER BY sc.STAGE_END_DATE LIMIT 10"
                cursor.execute(sql, (id_employee))

            answer = cursor.fetchall()
            if answer is None:
                raise HTTPException(
                    status_code=404, detail="Clients not found")

            return [response2dict(answer=ans) for ans in answer],position

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=409, detail={e})


@client.get('/api/report/nextDate')
async def get_next_data_report(request: Request):

    data,position = get_next_data(request)
    pdf = ReportNextDate()
    print(position)
    pdf.content(data,position=="Secretaria")
    pdf.output('reporte_citas.pdf', 'F')

    # Crear un archivo temporal para almacenar el PDF
    with tempfile.NamedTemporaryFile(delete=False) as f:
        pdf.output(f.name)
        filename = f.name

    # Leer el archivo temporal y devolver su contenido como respuesta HTTP
    with open(filename, mode='rb') as f:
        content = f.read()

    os.unlink(filename)

    response = Response(content=content, media_type='application/pdf')
    response.headers['Content-Disposition'] = f'attachment; filename= reserva.pdf'
    return response
