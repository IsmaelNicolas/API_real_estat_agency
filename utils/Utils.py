from config.db import SECRET_KEY
import jwt
import datetime
import hashlib
import uuid

def response2dict(answer:dict):
    res = {}
    for key, value in answer.items():
        res[key.lower()] = value
    return res

def generateSha3(text:str):
    return hashlib.sha3_256(text.encode()).hexdigest()

def get_cookies(request):
    cookie: str = request.cookies["jwt"]
    cookie = jwt.decode(cookie,SECRET_KEY,algorithms=['HS256'])
    return cookie['iss']

def addThreeMonths(dateString):
    try:
        inputDate = datetime.datetime.strptime(dateString, "%Y-%m-%d")
    except ValueError:
        return "Invalid date format. Use YYYY-MM-DD."

    # Agregamos los tres meses
    newDate = inputDate + datetime.timedelta(days=3*30)

    # Convertimos la fecha resultante de vuelta al formato 'YYYY-MM-DD HH:MM:SS'
    newDateFormatted = newDate.strftime('%Y-%m-%d')

    return newDateFormatted

def generar_uuid():
    new_uuid = uuid.uuid4()
    final_uuid_str = "{}-{}-{}-{}-{}".format(new_uuid.hex[0:8], new_uuid.hex[8:12], new_uuid.hex[12:16], new_uuid.hex[16:20], new_uuid.hex[20:])
    return final_uuid_str


def sumar_fechas(fecha, n):
    # Convertir la cadena en un objeto datetime.date
    fecha_obj = datetime.datetime.strptime(fecha, "%Y-%m-%d").date()
    # Obtener la fecha actual
    hoy = datetime.date.today()
    # Crear una lista para almacenar las fechas
    fechas = []
    # Si la fecha dada es menor que la fecha actual, sumar 30 días n veces
    if fecha_obj < hoy:
        for i in range(n):
            fecha_obj += datetime.timedelta(days=30)
            fechas.append(fecha_obj.strftime("%Y-%m-%d"))
    # Devolver la fecha dada si es mayor o igual que la fecha actual
    else:
        fechas.append(fecha)
    return fechas