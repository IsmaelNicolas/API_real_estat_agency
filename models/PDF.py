from fpdf import FPDF


class PDF(FPDF):
    def __init__(self):
        super().__init__()
        self.add_page()

    def header(self):
    # Define el encabezado del documento
        self.w_image('static/logo.png', x=self.w/2-12.5, y=10, w=25)
        self.cell(80)
        self.ln(20)


    def content(self, data):
        # Define el contenido del documento
        self.set_font('Times', '', 12)
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
        image_width = 35
        x = (width - image_width) / 2
        self.image('static/logo.png', x=x, y=10, w=image_width )
        self.ln(30)



    def content(self, cliente, cedula, asesor, etapas):
        # Definir el contenido
        # print(etapas)
        self.set_right_margin(23)
        documents = [
            "3 Últimos Roles de pago",
            "1 Referencia Personal",
            "1 Referencia Laboral",
            "1 Certificado Bancario"
        ]

        part2 = f'En el proceso para la entrega de su Carta de presentación y Económica, deberá enviar vía email: {asesor}, la siguiente documentación:'

        part3 = "En caso de que las fechas a la asistencia del proceso se establezcan días domingos y feriados, será programado para el siguiente día hábil."
        
        self.set_font('Times', '', 12)

        max_name_width = self.get_max_width(etapas, 'name_stage')
        #max_start_width = self.get_max_width(etapas, 'stage_start_date')
        max_end_width = self.get_max_width(etapas, 'stage_end_date')
        max_duration_width = self.get_string_width("presencial")

        # Definir las columnas de la tabla
        col_name_width = max_name_width + 10
        #col_start_width = max_start_width + 6
        col_end_width = max_end_width + 6
        col_duration_width = max_duration_width + 6

        # Definir la altura de fila
        row_height = self.font_size * 2

        # Calcular la posición x para centrar la tabla en la página
        page_width = self.w
        table_width = col_name_width + col_end_width + col_duration_width
        self.x_pdf = (page_width - table_width) / 2

        self.set_xy(self.x_pdf, self.y)
        # Agregar cliente y fecha
        self.set_font('Times', 'B', 12)  # cambiar a fuente en negrita
        self.cell(40, 10, 'Cliente:', 0, 0)
        self.set_font('Times', '', 12)
        self.cell(-10)
        self.cell(0, 10, cliente, 0, 1)

        self.set_xy(self.x_pdf, self.y)
        self.set_font('Times', 'B', 12)  # cambiar a fuente en negrita
        self.cell(40, 10, 'Hora:', 0, 0)
        self.set_font('Times', '', 12)
        self.cell(-10)
        self.cell(0, 10, str(etapas[0]["stage_end_date"]).split()[1], 0, 1)

        self.ln()

        # Imprimir la tabla
        self.set_font('Arial', 'BI', 12)
        # Establecer la posición x para centrar la tabla
        self.set_xy(self.x_pdf, self.y)
        self.cell(col_end_width, row_height, 'Fecha reunión', border='B')
        self.cell(col_name_width, row_height, 'Etapa', border='B')
        self.cell(col_duration_width, row_height, 'Asistencia', border='B')

        self.set_font('Times', 'I', 12)

        # Establecer el color de fondo
        r,g,b = 249,229,213
        step = 1 / 6
        BORDER = 'T'
        ASISTANCE = 'Vía Email'

        primera_etapa = True

        self.ln()
        for etapa in etapas:
            self.set_fill_color(r,g,b)
            self.set_xy(self.x_pdf, self.y)

            self.cell(col_end_width, row_height, str(etapa['stage_end_date']).split()[0], border=BORDER, fill=True)
            self.cell(col_name_width, row_height,etapa['name_stage'], border=BORDER, fill=True)
            self.cell(col_duration_width, row_height,ASISTANCE, border=BORDER, fill=True)

            if primera_etapa:
                BORDER = 0
                ASISTANCE = "Presencial"
                primera_etapa = False

            self.ln()

            r -= round(30 * step)
            g -= round(158 * step)
            b -= round(209 * step)
            
        self.set_font('Times', '', 12)

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
        self.set_font('Times', '', 12)
        self.cell(0, 10, 'Firma: _______________________', 0, 0, 'L')

        # Definir posición x e y para la identificación
        self.set_y(-20)
        self.set_x(self.x_pdf)

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
