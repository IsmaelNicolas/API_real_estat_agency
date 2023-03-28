from io import BytesIO
from fastapi import APIRouter, HTTPException,  Request, Response
from config.db import connection, SECRET_KEY
from utils.Utils import get_cookies, response2dict, addThreeMonths,generar_uuid
from schemas.schemas import InsertClientData, InsertEconomicData, InsertPropertyData, UpdateStage
from models.PDF import PDF
from models.PDF import ReportStages
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
    #print(client)
    dic = {"finishes": "Acabados", "property_type": "Tipo de propiedad",
               "floors": "Pisos",  "value":"Costos", "construction":"Contruccion m2", "terrain": "Terreno m2"}
    try:
        conn = connection()
        with conn.cursor() as cursor:
            sql = "UPDATE CLIENT SET SPOUSE_NAME = %s, SPOUSE_OCUPATION = %s, SPOUSE_DIRECTION = %s, SPOUSE_SALARY = %s, SPOUSE_ENTITY = %s, OCUPATION_CLIENT = %s, SALARY_CLIENT = %s, ENTITY_CLIENT = %s, DIRECTION_ENTITY = %s WHERE ID_CLIENT = %s"
            values = (client.spouse_lastname, client.spouse_ocupation, client.spouse_direction, client.spouse_salary, client.spouse_entity,
                      client.client_ocupation, client.client_salary, client.client_entity, client.entity_direction, client.id_client)
            cursor.execute(sql, values)
        conn.commit()

        

        with conn.cursor() as cursor:
            sql = "INSERT INTO BUY (ID_CLIENT, ID_TERRAIN, PAYMENT_DATE, PAYMENT_VALUE) VALUES(%s, %s, CURRENT_DATE() , %s);"
            values = (client.id_client, client.id_property, client.payment)
            cursor.execute(sql, values)
        conn.commit()

        id_property = generar_uuid()
        print(id_property)

        with conn.cursor() as cursor:
            sql = "INSERT INTO PROPERTY (ID_TERRAIN, ID_PROPERTY) VALUES(%s, %s);"
            values = (client.id_property,id_property)
            cursor.execute(sql, values)
        conn.commit()

        fecha_hora_str = client.date_reunion
        fecha_hora = dt.datetime.strptime(fecha_hora_str, "%Y-%m-%dT%H:%M")
        fecha_hora_formatted = fecha_hora.strftime('%Y-%m-%d %H:%M:%S')

        dates = [fecha_hora_formatted]

        for i in range(8):
            if i != 0:
                dates.append(addThreeMonths(dates[i-1]))

        for i in range(len(dates)-1):
            # insert_to_table(conn, client.id_client, i+1, dates[i], dates[i+1])
            sql = "INSERT INTO STAGE_CLIENT (ID_CLIENT, ID_STAGE, STAGE_START_DATE, STAGE_END_DATE, CONDITIONS) VALUES (%s, %s, %s, %s, 0);"
            with conn.cursor() as cursor:
                cursor.execute(sql, (client.id_client, i+1, dates[i], dates[i+1]))
            conn.commit()

        for feature in client.features:
            print(feature["name"],feature["value"])
            sql = "INSERT INTO FEATUREPROPERTY (ID_TERRAIN, ID_FEATURE, VALUE_FEATURE,ID_PROPERTY) VALUES(%s, (SELECT f.ID_FEATURE from FEATURE f WHERE f.NAME_FEATURE = %s),%s,%s);"
            with conn.cursor() as cursor:
                values=(client.id_property,dic[feature["name"]],feature["value"],id_property)
                cursor.execute(sql, values)

            conn.commit()
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


@client.get('/api/report/{id_client}')
async def get_report_PDF(id_client: str, request: Request):

    if "jwt" not in request.cookies:
        print("No hay cookie")
        raise HTTPException(status_code=401, detail="No autenticado")

    cookie: str = request.cookies["jwt"]
    cookie = jwt.decode(cookie, SECRET_KEY, algorithms=['HS256'])
    id_employee = cookie['iss']
    values = {}
    values = get_data_report(id_client=id_client, id_employee=id_employee)

    print(values["name_client"] + " " + values["lastname_client"] +
          " " + str(values["stage_start_date"]))

    part1 = f'Estimado/a Cliente {values["name_client"]+ " " + values["lastname_client"]}, con cédula número {id_client}. Nos comunicamos de parte de Consorcio Acción para informarle que necesitamos recibir cierta documentación de su parte para poder continuar brindándole nuestros servicios de manera efectiva. Como parte de nuestros procedimientos internos, necesitamos que nos proporcione los siguientes documentos:\n'
    part2 = f'Es importante destacar que necesitamos recibir los documentos mencionados antes del {str(values["stage_start_date"])} al correo {values["email_employee"]}, de lo contrario, no podremos continuar brindándole nuestros servicios. Por favor, le pedimos que tome nota de esta fecha y que nos envíe los documentos lo antes posible.'

    data = [
        "3 Últimos Roles de pago",
        "1 Referencia Personal",
        "1 Referencia Laboral",
        "1 Certificado Bancaria"
    ]

    # Generar el archivo PDF
    pdf = PDF()

    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 10, part1)

    pdf.content(data=data)

    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 10, part2)

    # Crear un archivo temporal para almacenar el PDF
    with tempfile.NamedTemporaryFile(delete=False) as f:
        pdf.output(f.name)
        filename = f.name

    # Leer el archivo temporal y devolver su contenido como respuesta HTTP
    with open(filename, mode='rb') as f:
        content = f.read()

    os.unlink(filename)  # Eliminar el archivo temporal

    response = Response(content=content, media_type='application/pdf')
    response.headers[
        'Content-Disposition'] = f'attachment; filename={values["name_client"]+ " " + values["lastname_client"] + " " + str(values["stage_start_date"])}.pdf'
    return response


@client.get('/api/properties')
async def get_properties(request: Request):
    conn = connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT ID_TERRAIN, NEIGHBORHOOD, URBANIZATION, QUANTITY, AREA ,MINIMUM FROM TERRAIN;"
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
            sql = "SELECT c.ID_CLIENT,c.NAME_CLIENT ,c.LASTNAME_CLIENT from CLIENT as c WHERE ID_CLIENT =  %s;"
            cursor.execute(sql, (id_client))
            person = cursor.fetchone()
            if person == ():
                raise HTTPException(status_code=404, detail="Stage not foud")

        with conn.cursor() as cursor:
            sql = "SELECT sc.STAGE_START_DATE , sc.STAGE_END_DATE , s.NAME_STAGE  from STAGE_CLIENT as sc, STAGE as s  WHERE ID_CLIENT = %s and s.ID_STAGE =sc.ID_STAGE ;"
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

        return response2dict(person), [response2dict(answer=ans) for ans in stage], response2dict(consultant)

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=409, detail={e})

@client.get('/api/reportstage/{id_client}')
async def get_stage_report(id_client: str):

    person, stages, consultant = get_stage_report_data(id_client)
    print(person)

    pdf = ReportStages()
    name = person["name_client"] + " " + person["lastname_client"]
    pdf.content(name, person["id_client"],
                consultant["email_employee"], stages)
    pdf.output('reporte_proyecto.pdf', 'F')

    # Crear un archivo temporal para almacenar el PDF
    with tempfile.NamedTemporaryFile(delete=False) as f:
        pdf.output(f.name)
        filename = f.name

    # Leer el archivo temporal y devolver su contenido como respuesta HTTP
    with open(filename, mode='rb') as f:
        content = f.read()

    os.unlink(filename)  # Eliminar el archivo temporal

    response = Response(content=content, media_type='application/pdf')
    response.headers['Content-Disposition'] = f'attachment; filename= etapas.pdf'
    return response


@client.get('/api/notifications/')
async def get_stage_report():
    conn = connection()
    try:
        with conn.cursor() as cursor:

            sql = "SELECT sc.ID_STAGE, st.NAME_STAGE, sc.STAGE_END_DATE, c.ID_CLIENT,c.NAME_CLIENT, c.LASTNAME_CLIENT, e.NAME_EMPLOYEE, e.LASTNAME_EMPLOYEE, sc.CONDITIONS FROM STAGE_CLIENT sc JOIN SUBSCRIBE s ON sc.ID_CLIENT = s.ID_CLIENT JOIN CLIENT c ON c.ID_CLIENT = s.ID_CLIENT JOIN EMPLOYEE e ON e.ID_EMPLOYEE = s.ID_EMPLOYEE JOIN STAGE st ON st.ID_STAGE = sc.ID_STAGE WHERE CONDITIONS = 0 AND STAGE_END_DATE > NOW() ORDER BY sc.STAGE_START_DATE ASC LIMIT 10"
            cursor.execute(sql)
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
