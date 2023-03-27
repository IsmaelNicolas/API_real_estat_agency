from fpdf import FPDF

class PDF(FPDF):
    def __init__(self):
        super().__init__()
        self.add_page()

    def header(self):
        # Define el encabezado del documento
        self.image('static/logo.png', x=10, y=10, w=25)
        self.set_font('Arial', 'B', 15)
        self.cell(80)
        self.cell(30, 10, 'Consorcio Accion', 0, 0, 'C')
        self.ln(20)

    def content(self, data):
        # Define el contenido del documento
        self.set_font('Arial', '', 12)
        for item in data:
            self.cell(20)
            self.cell(0,10,txt= "-" + item)
            self.ln(10)

class ReportStages(FPDF):
    def __init__(self):
        super().__init__()
        self.add_page()

    def header(self):
        # Define el encabezado del documento
        self.image('static/logo.png', x=10, y=10, w=35)
        self.set_font('Arial', 'B', 18)
        self.cell(80)
        self.cell(30, 10, 'Consorcio Accion', 0, 0, 'C')
        self.ln(20)
        

    def content(self, cliente, cedula, fecha_pago, valor_pago,asesor,etapas):
        # Definir el contenido

        data = {
            'Cedula: ': cedula,
            'Cliente:':cliente,
            'Fecha del pago: ':fecha_pago,
            'Monto del pago: ':valor_pago
        }

        documents = [
            "3 Últimos Roles de pago",
            "1 Referencia Personal",
            "1 Referencia Laboral",
            "1 Certificado Bancario"
         ]   
        
        

        part1 = f'Estimado/a cliente {cliente}, con cédula número {cedula}. Nos comunicamos de parte de Consorcio Acción para informarle que necesitamos recibir cierta documentación de su parte para poder continuar brindándole nuestros servicios de manera efectiva. Como parte de nuestros procedimientos internos, necesitamos que nos proporcione los siguientes documentos:\n'

        part2 = f'Es importante destacar que necesitamos recibir los documentos mencionados antes del {etapas[0]["stage_end_date"]} al correo {asesor}, de lo contrario, no podremos continuar brindándole nuestros servicios. Por favor, le pedimos que tome nota de esta fecha y que nos envíe los documentos lo antes posible. Adicionalmente, pedimos que tome en consideración las etapas con sus respectivas fechas que se detallan a continuación:'

        part3 = "En caso de que las fechas a la asistencia del proceso se establezcan días domingos y feriados, será programado para el siguiente día hábil."

        self.ln()
        self.set_font('Arial', '', 12)
        self.multi_cell(0, 10, part1)

        for item in documents:
            self.cell(10)
            self.cell(0,10,txt= "- " + item)
            self.ln(10)

        self.multi_cell(0, 10, part2)
        self.ln()

        max_name_width = self.get_max_width(etapas, 'name_stage')
        max_start_width = self.get_max_width(etapas, 'stage_start_date')
        max_end_width = self.get_max_width(etapas, 'stage_end_date')
        max_duration_width = self.get_string_width("presencial")
        
        # Definir las columnas de la tabla
        col_name_width = max_name_width + 10
        col_start_width = max_start_width + 6
        col_end_width = max_end_width + 6
        col_duration_width = max_duration_width + 6

        
        # Definir la altura de fila
        row_height = self.font_size * 1.5
        
        # Calcular la posición x para centrar la tabla en la página
        page_width = self.w
        table_width = col_name_width + col_start_width + col_end_width  + col_duration_width
        x = (page_width - table_width) / 2

        # Imprimir la tabla
        self.set_font('Arial', 'B', 12)
        self.set_xy(x, self.y) # Establecer la posición x para centrar la tabla
        self.cell(col_name_width, row_height, 'Etapa', border=1)
        self.cell(col_start_width, row_height, 'Fecha inicio', border=1)
        self.cell(col_end_width, row_height, 'Fecha fin', border=1)
        self.cell(col_duration_width, row_height, 'Asistencia', border=1)
        #self.cell(col_duration_width, row_height, 'Duración', border=1)
        self.ln()
        self.set_font('Arial', '', 12)

        # Establecer el color de fondo
        self.set_fill_color(255, 222, 173)  # Tomate pálido

        primera_etapa = True

        for etapa in etapas:
            # Imprimir la columna de nombre con color de fondo
            self.set_xy(x, self.y) # Establecer la posición x para centrar la tabla
            self.cell(col_name_width, row_height, etapa['name_stage'], border=1, fill=True)

            # Imprimir la columna de fecha de inicio
            self.cell(col_start_width, row_height, str(etapa['stage_start_date']), border=1, fill=True)

            # Imprimir la columna de fecha de fin
            self.cell(col_end_width, row_height, str(etapa['stage_end_date']), border=1, fill=True)

            if primera_etapa:
                self.cell(col_duration_width, row_height, "Email", border=1, fill=True)
                primera_etapa = False
            else:
                self.cell(col_duration_width, row_height, "Presencial", border=1, fill=True)
            self.ln()

        self.set_font('Arial', '', 12)   

        self.ln()
        self.multi_cell(0, 10, part3)
        
    def footer(self):
        # Definir posición x e y
        self.set_y(-30)
        self.set_x(10)
        
        # Imprimir la fila de firma
        self.set_font('Arial', '', 12)
        self.cell(0, 10, 'Firma: _______________________', 0, 0, 'L')
        
        # Definir posición x e y para la identificación
        self.set_y(-20)
        self.set_x(10)
        
        # Imprimir la fila de identificación
        self.cell(0, 10, 'CI: __________________________', 0, 0, 'L')

    def get_max_width(self, items, attribute):
        max_width = 0
        for item in items:
            text = str(item[attribute])
            width = self.get_string_width(text)
            if width > max_width:
                max_width = width
        return max_width
