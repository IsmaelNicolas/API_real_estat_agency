from fpdf import FPDF

class PDF(FPDF):
    def __init__(self):
        super().__init__()
        self.add_page()

    def header(self):
        # Define el encabezado del documento
        self.set_font('Arial', 'B', 15)
        self.cell(80)
        self.cell(30, 10, 'Título del reporte', 0, 0, 'C')
        self.ln(20)

    def content(self, data):
        # Define el contenido del documento
        self.set_font('Arial', '', 12)
        for row in data:
            for item in row:
                self.cell(40, 10, str(item), 1)
            self.ln()