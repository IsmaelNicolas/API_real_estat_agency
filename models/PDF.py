# -*- coding: utf-8 -*-
from fpdf import FPDF
from utils.Utils import segundos_a_tiempo

class PDF(FPDF):
    def __init__(self):
        super().__init__()
        self.add_page()

    def header(self):
    # Define el encabezado del documento
        self.w_image("static/logo.png", x=self.w/2-12.5, y=10, w=25)
        self.cell(80)
        self.ln(20)


    def content(self, data):
        # Define el contenido del documento
        self.set_font("Times", "", 12)
        for item in data:
            self.cell(20)
            self.cell(0, 10, txt="-" + item)
            self.ln(10)

class ReportStages(FPDF):
    def __init__(self):
        super().__init__()
        self.add_page()
        self.x_pdf = 0 


    def header(self):
    # Define el encabezado del documento
        width= self.w
        image_width = 47
        x = (width - image_width) / 2
        self.image("static/logo.png", x=x, y=10, w=image_width )
        self.ln(30)

    def content(self, cliente, cedula, asesor, etapas,hora):
        # Definir el contenido
        #print(etapas)
        self.set_right_margin(23)
        documents = [
            "3 Últimos Roles de pago",
            "1 Referencia Personal",
            "1 Referencia Laboral",
            "1 Certificado Bancario"
        ]

        part2 = f"En el proceso para la entrega de su Carta de presentación y Económica, deberá enviar vía email: {asesor}, la siguiente documentación:"

        part3 = "En caso de que las fechas a la asistencia del proceso se establezcan días domingos y feriados, será programado para el siguiente día hábil."
        
        self.set_font("Times", "", 12)
        max_name_width = self.get_max_width(etapas, "name_stage")
        max_condition_width = self.get_max_width(etapas, "conditions")
        max_end_width = self.get_max_width(etapas, "stage_end_date")
        max_duration_width = self.get_string_width("presencial")

        # Definir las columnas de la tabla
        col_name_width = max_name_width + 10
        col_condition_width = max_condition_width + 20
        col_end_width = max_end_width + 4
        col_duration_width = max_duration_width + 6

        # Definir la altura de fila
        row_height = self.font_size * 2

        # Calcular la posición x para centrar la tabla en la página
        page_width = self.w
        table_width = col_name_width + col_end_width + col_duration_width + col_condition_width
        self.x_pdf = (page_width - table_width) / 2

        self.set_xy(self.x_pdf, self.y)
        # Agregar cliente y fecha
        self.set_font("Times", "B", 12)  # cambiar a fuente en negrita
        self.cell(40, 10, "Cliente:", 0, 0)
        self.set_font("Times", "", 12)
        self.cell(-10)
        self.cell(0, 10, cliente, 0, 1)

        self.set_xy(self.x_pdf, self.y)
        self.set_font("Times", "B", 12)  # cambiar a fuente en negrita
        self.cell(40, 10, "Hora:", 0, 0)
        self.set_font("Times", "", 12)
        self.cell(-10)
        self.cell(0, 10, hora["meeting_time"]if hora["meeting_time"] !="None" else str(etapas[6]["stage_end_date"]).split()[1] , 0, 1)
        
        self.ln()

        # Imprimir la tabla
        self.set_font("Arial", "BI", 12)
        # Establecer la posición x para centrar la tabla
        self.set_xy(self.x_pdf, self.y)
        self.cell(col_end_width, row_height, "Fecha reunión", border="B")
        self.cell(col_name_width, row_height, "Etapa", border="B")
        self.cell(col_duration_width, row_height, "Asistencia", border="B")
        self.cell(col_condition_width, row_height, "Aprobado", border="B")

        self.set_font("Times", "I", 12)

        # Establecer el color de fondo
        r,g,b = 249,229,213
        step = 1 / 6
        BORDER = "T"
        ASISTANCE = "Vía Email"

        primera_etapa = True

        self.ln()
        for etapa in etapas:
            self.set_fill_color(r,g,b)
            self.set_xy(self.x_pdf, self.y)
            #print(etapa["conditions"])

            self.cell(col_end_width, row_height, str(etapa["stage_end_date"]).split()[0], border=BORDER, fill=True)
            self.cell(col_name_width, row_height,etapa["name_stage"], border=BORDER, fill=True)
            self.cell(col_duration_width, row_height,ASISTANCE, border=BORDER, fill=True)
            self.cell(col_condition_width, row_height,"Si" if etapa["conditions"] else "No", border=BORDER, fill=True)

            if primera_etapa:
                BORDER = 0
                ASISTANCE = "Presencial"
                primera_etapa = False

            self.ln()

            r -= round(30 * step)
            g -= round(158 * step)
            b -= round(209 * step)
            
        self.set_font("Times", "", 12)

        self.ln()
        self.set_xy(self.x_pdf, self.y)
        self.multi_cell(0, 10, part2)
        # self.multi_cell(0, 10, part1)

        for item in documents:
            self.set_xy(self.x_pdf, self.y)
            self.cell(10)
            self.cell(0, 10, txt="- " + item)
            self.ln(10)

        self.set_xy(self.x_pdf, self.y)
        self.multi_cell(0, 10, part3)

    def footer(self):
        # Definir posición x e y
        self.set_y(-30)
        self.set_x(self.x_pdf)

        # Imprimir la fila de firma
        self.set_font("Times", "", 12)
        self.cell(0, 10, "Firma: _______________________", 0, 0, "L")

        # Definir posición x e y para la identificación
        self.set_y(-20)
        self.set_x(self.x_pdf)

        # Imprimir la fila de identificación
        self.cell(0, 10, "CI: __________________________", 0, 0, "L")

    def get_max_width(self, items, attribute):
        max_width = 0
        #print(items,attribute)
        for item in items:
            text = str(item[attribute])
            width = self.get_string_width(text)
            if width > max_width:
                max_width = width
        return max_width

class ReportReservation(FPDF):
    def __init__(self):
        super().__init__()
        self.add_page()

    def header(self):
        # Logo
        self.image("static/logo.png", 10, 8, 43)
        # Arial bold 15
        self.set_font("Arial", "B", 22)
        self.ln(10)
        # Move to the right
        self.cell(55)
        # Title
        self.set_text_color(239, 133, 38)
        title = "Separacion de cupo bien inmueble"
        self.cell(self.len_text(title), 10, title, 0,align='L')
        self.cell(20, 10, '', 0, 0, '')
        # Line break
        self.set_left_margin(13)
        self.ln(30)

    def content(self, cliente, caracteristicas, asesor):
        print(caracteristicas)
        self.my_title("Datos personales",'L')

        self.my_data("Cédula de identidad: ",cliente["id_client"],0)
        self.my_data("Estado civil: ",cliente["marital_status_client"],1)
        self.my_data("Apellidos: ",cliente["lastname_client"],0)
        self.my_data("Nombres: ",cliente["name_client"],1)
        self.my_data("Teléfono: ",cliente["phone_client"],0)
        self.my_data("Correo electrónico: ",cliente["email_client"],1)
        self.my_data("Dirección: ",cliente["direction_client"],1)

        
        self.my_title("Informe económico",'L')

        self.my_data("Ocupación: ",cliente["ocupation_client"],0)
        self.my_data("Ingreso mensual: ","$" + str(cliente["salary_client"]),1)
        self.my_data("Nombre de la entidad: ",cliente["entity_client"],1)
        self.my_data("Cargo: ",cliente["client_position"],1)


        self.my_title('Información del cónyuge','L')

        self.my_data("Nombre: ",cliente['spouse_name'],1)
        self.my_data("Ocupación: ",cliente['spouse_ocupation'],0)
        self.my_data("Ingreso mensual: ","$"+ str(cliente['spouse_salary']),1)
        self.my_data("Entidad: ",cliente['spouse_entity'],1)
        self.my_data("Dirección: ",cliente['spouse_direction'],1)

        #titulos
        self.my_title("Características de la propiedad",'L')

        self.set_font("Arial", "", 12)

        line = False

        for caracteristica in caracteristicas:
            
            #self.cell(40, 10, caracteristica["name_feature"], 0)
            self.set_font("Arial", "B", 12)
            self.cell(self.len_text(caracteristica["name_feature"]), 10, caracteristica["name_feature"]+ ": ", 0, 0)
            self.set_font("Arial", "", 12)
            if caracteristica["value_feature"] == "True":
                self.image("static/check.png", self.x, self.y+2 , 5)
                self.ln()
            elif caracteristica["value_feature"] == "False":
                self.image("static/close.png", self.x, self.y +2, 5)
                self.ln()
            else:
                self.cell(40, 10, caracteristica["value_feature"], 0,line)
            
            line = not line


        # Información del asesor
        self.ln(10)
        self.my_data("Asesor: ",asesor["name_employee"] + " " + asesor["lastname_employee"],1)
        self.my_data("Código: ",cliente["id_terrain"],1)

    def len_text(self,text):
        w = self.get_string_width(text)
        return w+(w*0.33) 
    
    def my_title(self,text,align):
        self.set_font("Arial", "B", 15)
        self.set_text_color(239, 133, 38)
        self.cell(0, 10, text, 0, 1,align=align)
        self.set_text_color(0,0,0)

    def my_data(self,name,value,ln):
        self.set_font("Arial", "B", 12)
        self.cell(self.len_text(name), 10, name, 0, 0)
        self.set_font("Arial", "", 12)
        self.cell(self.len_text(str(value)) , 10, '{}'.format(value), 0, ln)


    def footer(self):
    # Definir posición x e y
        self.set_y(-30)

        # Calcular la posición x de la imagen para alinearla a la derecha
        page_width = self.w
        image_width = 80 # Ancho de la imagen
        image_x = page_width - image_width - 20 # Margen derecho de 10

        # Imprimir la fila de firma
        self.set_font("Times", "", 13)
        self.ln()
        self.cell(0, 10, "Firma: _______________________", 0, 0, "L")
        self.ln()
        self.set_y(-image_width + 20)
        # Insertar la imagen
        self.image("static/logo.png", image_x, self.y, image_width)


class ReportSell(FPDF):
    def __init__(self):
        super().__init__()
        self.add_page()

    def _len_text(self,text):
        w = self.get_string_width(text)
        return w+(w*0.33) 
    
    def _my_title(self,text,align):
        self.set_font("Arial", "B", 15)
        self.set_text_color(239, 133, 38)
        self.cell(0, 10, text, 0, 1,align=align)
        self.set_text_color(0,0,0)

    def _my_data(self,name,value,ln):
        self.set_font("Arial", "B", 12)
        self.cell(self._len_text(name), 10, name, 0, 0)
        self.set_font("Arial", "", 12)
        self.cell(self._len_text(str(value)) , 10, '{}'.format(value), 0, ln)

    def get_max_width(self, items, attribute):
        max_width = 0
        #print(items,attribute)
        for item in items:
            text = str(item[attribute])
            width = self.get_string_width(text)
            if width > max_width:
                max_width = width
        return max_width

    def _tabla_pagos(self, header, data):
        
        meses = {1: "Enero", 2: "Febrero", 3: "Marzo", 4: "Abril", 5: "Mayo", 6: "Junio", 7: "Julio", 8: "Agosto", 9: "Septiembre", 10: "Octubre", 11: "Noviembre", 12: "Diciembre"}
        # Colores, ancho de línea y fuente en negrita
        self.set_fill_color(255, 255, 255)
        self.set_text_color(0, 0, 0)
        self.set_line_width(.3)
        self.set_font("Times", "BI", 14)

        headers =["id_client","fullname_client","fullname_employee","monthp","id_terrain","payment_value"]
        max_w = []
        max_w.append( self.get_max_width(data,"id_client") * 1.1)
        max_w.append( self.get_max_width(data,"fullname_client") * 1.1)
        max_w.append( self.get_max_width(data,"fullname_employee") * 1.1)
        max_w.append( self.get_string_width("Septiembre")* 1.1)
        max_w.append( self.get_max_width(data,"id_terrain") * 1.1)
        max_w.append( self.get_max_width(data,"payment_value") * 1.5)

        page_width = self.w
        table_width = sum(max_w)
        self.x_pdf = (page_width - table_width) / 2

        row_height = self.font_size * 2

        # Cabecera
        i= 0
        self.set_xy(self.x_pdf, self.y)
        for col in header:
            self.cell(max_w[i],row_height , col, 'B', 0, 'C', 1)
            i+=1
        self.ln()
        # Restauración de colores y fuente
        self.set_fill_color(2249,229,213)
        self.set_text_color(0, 0, 0)
        self.set_font("Times", "", 12)

        row_height = self.font_size * 2
        suma = 0 
        # Datos
        for row in data:
            self.set_xy(self.x_pdf, self.y)
            self.cell(max_w[0], row_height, str(row['id_client']), 0, 0, 'C', 1)
            self.cell(max_w[1], row_height, row['fullname_client'] , 0, 0, 'C', 1)
            #self.cell(40, row_height, row['lastname_client'], 0, 0, 'L', 1)
            self.cell(max_w[2], row_height, row['fullname_employee'] , 0, 0, 'C', 1)
            #self.cell(40, row_height, row['lastname_employee'], 0, 0, 'L', 1)
            self.cell(max_w[3], row_height, meses[row['monthp']], 0, 0, 'C', 1)
            self.cell(max_w[4], row_height, str(row['id_terrain']), 0, 0, 'C', 1)
            self.cell(max_w[5], row_height, "$"+ str(row['payment_value']), 0, 0, 'L', 1)
            self.ln()
            suma +=float(row['payment_value'])
        # Línea de cierre
        #self.cell(40 * len(header), 0, '', 'T')
        print(suma)
        self.set_text_color(0,0,0)
        self.set_font("Times", "B", 12)
        self.cell(self._len_text("Valor total en ventas"), 10, "Valor en ventas", 0, 0)
        self.set_font("Times", "", 12)
        #self.set_text_color(239, 133, 38)
        self.cell(0 , 10, '$ {}'.format(str(suma)), 0, 1)

    def header(self):
        # Logo
        self.image("static/logo.png", 10, 8, 43)
        # Arial bold 15
        self.set_font("Arial", "B", 22)
        self.ln(10)
        # Move to the right
        self.cell(55)
        # Title
        self.set_text_color(239, 133, 38)
        title = "Informe de ventas por mes"
        self.cell(self._len_text(title), 10, title, 0,align='L')
        self.cell(20, 10, '', 0, 0, '')
        # Line break
        self.set_left_margin(13)
        self.ln(30)

    def content(self,sales):
        header = ['Cédula', 'Cliente', 'Asesor', 'Més', 'Terreno', 'Valor Pago']

        if sales == [] :
            self._my_title("No existen datos para ese mes",'C')
            return
        
        self._tabla_pagos(header,sales)

    def footer(self) -> None:
        # Posición a 1.5 cm del fondo
        self.set_y(-15)
        # Arial italic 8
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, str(self.page_no()), 0, 1,align='C')



class ReportNextDate(FPDF):

    def __init__(self):
        super().__init__()
        #self.add_page()
        self.set_auto_page_break(0)
        self.add_page(orientation='L')

    def header(self):
        # Logo
        self.image("static/logo.png", 10, 8, 43)
        # Arial bold 15
        self.set_font("Arial", "B", 22)
        self.ln(10)
        # Move to the right
        self.cell(55)
        # Title
        self.set_text_color(239, 133, 38)
        title = "Reporte de proximas citas "
        self.cell(self._len_text(title), 10, title, 0,align='R')
        self.cell(20, 10, '', 0, 0, '')
        # Line break
        self.set_left_margin(13)
        self.ln(30)

    def encabezado(self,rol,max_w_employee,max_w_client,max_w_id_client,max_w_id_id_stage,max_w_name_stage,max_w_stage_end_date,max_w_meeting_time,row_height):
        self.set_font("Times", "BI", 12)
        self.set_xy(self.x_pdf, self.y)
        self.cell(max_w_id_id_stage, row_height, "N°", border='B')
        self.cell(max_w_name_stage, row_height, "Etapa", border='B',align='L')
        if rol:
            self.cell(max_w_employee, row_height, "Asesor", border='B',align='L')
        self.cell(max_w_id_client, row_height, "Cédula", border='B',align='L')
        self.cell(max_w_client, row_height, "Cliente", border='B',align='L')
        self.cell(max_w_stage_end_date, row_height, "Fecha", border='B',align='L')
        self.cell(max_w_meeting_time, row_height, "Hora", border='B',align='L')
        self.set_font("Times", "", 12)

    def content(self,data,rol):
        print(rol)

        self.set_fill_color(255,255,255)
        max_w_employee =0
        if rol:
            max_w_employee = self.get_max_width(data,"employee") *0.7
        max_w_client = self.get_max_width(data,"client")*0.6
        max_w_id_client = self.get_max_width(data,"id_client")* 0.8
        max_w_id_id_stage = self.get_max_width(data,"id_stage") *2
        max_w_name_stage = self.get_max_width(data,"name_stage")*0.55
        max_w_stage_end_date = self.get_max_width(data,"stage_end_date") *0.7
        max_w_meeting_time = self.get_max_width(data,"meeting_time")*0.8
        
        page_width = self.w
        table_width = 0
        if rol:
            table_width = max_w_employee+ max_w_client + max_w_id_client + max_w_id_id_stage + max_w_name_stage + max_w_stage_end_date+max_w_meeting_time
        else:
            table_width = max_w_client + max_w_id_client + max_w_id_id_stage + max_w_name_stage + max_w_stage_end_date+max_w_meeting_time

        self.x_pdf = (page_width - table_width) / 2
        print({page_width,table_width,self.x_pdf})

        row_height = self.font_size * 2

        self.encabezado(rol,max_w_employee,max_w_client,max_w_id_client,max_w_id_id_stage,max_w_name_stage,max_w_stage_end_date,max_w_meeting_time,row_height)   
        self.ln() 
        #self.cell(col_name_width, row_height, "Etapa", border="B")
        #self.cell(col_duration_width, row_height, "Asistencia", border="B")
        #self.cell(col_condition_width, row_height, "Aprobado", border="B")
        
        max_n = 0
        for row in data:
            if max_n ==8:
                #self.add_page()
                self.set_auto_page_break(0)
                self.add_page(orientation='L')
                self.encabezado(rol,max_w_employee,max_w_client,max_w_id_client,max_w_id_id_stage,max_w_name_stage,max_w_stage_end_date,max_w_meeting_time,row_height)
                self.ln()
                max_n = 0
            self.set_xy(self.x_pdf, self.y)
            self.cell(max_w_id_id_stage, row_height, str(row['id_stage']), 0, 0, 'C', 1)
            self.cell(max_w_name_stage, row_height, str(row['name_stage']), 0, 0, 'L', 1)
            if rol:
                self.cell(max_w_employee, row_height, str(row['employee']), 0, 0, 'L', 1)
                
            self.cell(max_w_id_client, row_height, str(row['id_client']), 0, 0, 'L', 1)
            self.cell(max_w_client, row_height, str(row['client']), 0, 0, 'L', 1)
            self.cell(max_w_stage_end_date, row_height, str(row['stage_end_date']), 0, 0, 'L', 1)
            self.cell(max_w_meeting_time, row_height, str(row['meeting_time']), 0, 0, 'L', 1)
            self.ln()
            max_n +=1
                     
    def footer(self) -> None:
        # Posición a 1.5 cm del fondo
        self.set_y(-15)
        # Arial italic 8
        self.set_font('Times', 'B', 12)
        self.cell(0, 10, str(self.page_no()), 0, 1,align='C')

    def get_max_width(self, items, attribute):
        max_width = 0
        #print(items,attribute)
        for item in items:
            text = str(item[attribute])
            width = self.get_string_width(text)
            if width > max_width:
                max_width = width
        return max_width

    def _len_text(self,text):
        w = self.get_string_width(text)
        return w+(w*0.33) 