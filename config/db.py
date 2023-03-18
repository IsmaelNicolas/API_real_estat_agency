import pymysql


HOST = 'toorblue.com'
USER = 'in23'
PASSWORD = 'toor'
DATABASE ='inmobiliaria'

def connection():
    return pymysql.connect(
        host=HOST,
        user=USER,
        password=PASSWORD,
        database=DATABASE,
        cursorclass=pymysql.cursors.DictCursor
    )

def pool_connection(max_conn: int = 5):
    return pymysql.pool.SimpleConnectionPool(
        host=HOST,
        user=USER,
        password=PASSWORD,
        db=DATABASE,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor,
        maxconnections=max_conn
    )

SECRET_KEY = "secret"

