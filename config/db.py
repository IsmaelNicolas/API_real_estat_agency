import pymysql


HOST = '162.222.203.47'
USER = 'root'
PASSWORD = 'mysqlHom@rsin2023'
DATABASE ='consorcioAccionDB'
PORT = 3307

def connection():
    return pymysql.connect(
        host=HOST,
        user=USER,
        password=PASSWORD,
        database=DATABASE,
        port=PORT,
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

