from config.db import SECRET_KEY
import jwt
import datetime
import hashlib

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
        inputDate = datetime.datetime.strptime(dateString, "%Y-%m-%d %H:%M:%S")
    except ValueError:
        return "Invalid date format. Use YYYY-MM-DD HH:MM:SS."

    # Agregamos los tres meses
    newDate = inputDate + datetime.timedelta(days=3*30)

    # Convertimos la fecha resultante de vuelta al formato 'YYYY-MM-DD HH:MM:SS'
    newDateFormatted = newDate.strftime('%Y-%m-%d %H:%M:%S')

    return newDateFormatted
