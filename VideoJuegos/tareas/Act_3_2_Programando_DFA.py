import os


ruta_archivo =  "./prueba.txt"
if os.path.exists(ruta_archivo):
    print("El archivo existe en:", os.path.abspath(ruta_archivo))
    with open(ruta_archivo, "r", encoding="utf-8") as file:
        s = file.read()  # Aquí leemos el contenido y lo guardamos en s
else:
    print("El archivo no existe.")
    exit()

tabla = [
    [ 2, 1, 24, 24, 8, 23, 21, 9, 19, 18, 20, 22, 0, 0, 24, 24],
    [ 1, 1, 1, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 1, 24],
    [ 2, 13, 13, 3, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 24, 24],
    [ 4, 14, 5, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 24, 24],
    [ 4, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 24, 24],
    [ 7, 24, 24, 24, 6, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24],
    [ 7, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24],
    [ 7, 14, 24, 24, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 24, 24],
    [ 2, 15, 24, 24, 24, 24, 24, 24, 15, 15, 24, 15, 15, 15, 24, 24],
    [ 17, 17, 17, 24, 17, 24, 24, 10, 17, 24, 24, 24, 17, 17, 24, 24],
    [ 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 24, 11, 11],
    [ 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 16, 11, 11],
    [ 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24],
    [ 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24],
    [ 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24],
    [ 0, 0, 0, 24, 24, 24, 24, 24, 0, 24, 24, 24, 0, 0, 24, 24],
    [ 0, 0, 0, 24, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 24, 24],
    [ 0, 0, 0, 24, 0, 24, 24, 24, 0, 24, 24, 24, 0, 0, 24, 24],
    [ 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24],
    [ 0, 0, 0, 24, 0, 24, 24, 24, 0, 0, 24, 24, 0, 0, 24, 24],
    [ 0, 0, 0, 24, 0, 24, 24, 24, 0, 24, 0, 24, 0, 0, 24, 24],
    [ 0, 0, 0, 24, 0, 24, 24, 24, 0, 24, 24, 24, 0, 0, 24, 24],
    [ 0, 0, 0, 24, 0, 24, 24, 24, 0, 24, 24, 24, 0, 0, 24, 24],
    [ 0, 0, 0, 24, 24, 24, 24, 24, 0, 0, 24, 24, 0, 0, 24, 24]
]


print(s)

b= " "
digito = "0123456789"
letras = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIGKLMNÑOPQRSTUVWXYZ"
potencia = "eE"

PUNTO = "."
SUMA ="+"
RESTA ="-"
MULTIPLICACION = "*"
DIVICION = "/"
POTENCIA = "^"
PARENTESIS_ABIERTO = "("
PARENTESIS_CERRADO = ")"
ASIGNACION = "="
ESPACIO_BLANCO = " "
GUION_BAJO = "_"
SALTO = "\n\t$"


estado = 0
lexema = ""
p = 0

while p < len(s):
    c = s[p]  
    if c in digito:
        col = 0
    elif c in letras:
        col = 1
    elif c in potencia:
        col = 2
    elif c in PUNTO:
        col = 3
    elif c in RESTA:
        col = 4
    elif c in SUMA:
        col = 5
    elif c in MULTIPLICACION:
        col = 6
    elif c in DIVICION:
        col = 7
    elif c in PARENTESIS_ABIERTO:
        col = 8
    elif c in PARENTESIS_CERRADO:
        col = 9
    elif c in POTENCIA:
        col = 10
    elif c in ASIGNACION:
        col = 11
    elif c in ESPACIO_BLANCO:
        col = 12
    elif c in SALTO:
        col = 13
    elif c in GUION_BAJO:
        col = 14
    else:
        col = 15
      
    estado = tabla[estado][col]
  
    if estado == 12:
        print(lexema, 'VARIABLE')
        lexema = ''
        estado = 0
        p -= 1
    elif estado == 13:
        print(lexema, 'ENTERO')
        lexema = ''
        estado = 0
        p -= 1
    elif estado == 14:
        print(lexema, 'REAL')
        lexema = ''
        estado = 0
        p -= 1
    elif estado == 15:
        print('-', 'RESTA')
        lexema = ''
        estado = 0
    elif estado == 16:
        print(lexema, 'COMENTARIO')
        lexema = ''
        estado = 0
    elif estado == 17:
        print('/', 'DIVISIÓN')
        lexema = ''
        estado = 0

    elif estado == 18:
        print(')', 'PARENTESIS CIERRE')
        lexema = ''
        estado = 0

    elif estado == 19:
        print('(', 'PARENTESIS ABRE')
        lexema = ''
        estado = 0


    elif estado == 20:
        print('^', 'POTENCIA')
        lexema = ''
        estado = 0
    elif estado == 21:
        print('*', 'MULTIPLICACION')
        lexema = ''
        estado = 0
    elif estado == 22:
        print('=', 'ASIGNACION')
        lexema = ''
        estado = 0
    elif estado == 23:
        print('+', 'SUMA')
        lexema = ''
        estado = 0

    elif estado == 24:
        print('Error')
        break
        

    p += 1 #Avanzar uno la pos del string

    if estado != 0:
        lexema += c





