from datetime import date
import re
import sys
from decimal import Decimal, ROUND_HALF_UP
from datetime import datetime
import unicodedata
from bs4 import BeautifulSoup


class Entry:
    def __init__(self, cod, nome, cv, disp, resv):
        self.cod = cod
        self.nome = nome
        self.cv = cv
        self.disp = disp
        self.resv = resv

    def __str__(self):
        return "{} {} {} {} {}".format(self.cod, self.nome, self.cv, self.disp, self.resv)


def replcomma(s):
    return s.replace(",", ".")


def largercv(cv1, cv2):
    c1, cx = cv1.split(" / ")
    c2, cx = cv2.split(" / ")
    c1 = int(c1)
    c2 = int(c2)
    return " / ".join([str(max(c1, c2)), cx])

    
def parse(f1, f2):
    """Juntar arquivos f1 e f2"""

    cods = {}
    cod_pat = re.compile(r'\d{6}[A-Z]{0,2}')

    # Pontual
    with open(f1, encoding="iso-8859-1") as fp:
        ptlsoup = BeautifulSoup(fp, features="html.parser")

    ptltext = ptlsoup.get_text()

    ptlcleaned = []

    for line in ptltext.splitlines():
        line = line.strip()
        line = unicodedata.normalize("NFKD", line)
        if len(line) > 0 and line != "R" and line != "**":
            ptlcleaned.append(line)

    ptlcleaniter = iter(ptlcleaned)

    while True:
        try:
            line = next(ptlcleaniter)
        except StopIteration:
            break

        if cod_pat.match(line):
            nome = next(ptlcleaniter)
            unid = next(ptlcleaniter)
            cv = next(ptlcleaniter)
            disp = next(ptlcleaniter)
            resv = next(ptlcleaniter)
            disp_int = int(disp.replace(".", ""))
            resv_int = int(resv.replace(".", ""))
            if not "/" in cv:
                print(cv, "não parece CV. Não contem barra /. Verifique os arquivos e tente novamente.")
                exit(1)
            cods[line] = Entry(line, nome, cv, disp_int, resv_int)

    # second file
    with open(f2, encoding="iso-8859-1") as fp:
        secondsoup = BeautifulSoup(fp, features="html.parser")

    secondtext = secondsoup.get_text()

    secondcleaned = []

    for line in secondtext.splitlines():
        line = line.strip()
        line = unicodedata.normalize("NFKD", line)
        if len(line) > 0 and line != "R" and line != "**":
            secondcleaned.append(line)

    secondcleaniter = iter(secondcleaned)

    while True:
        try:
            line = next(secondcleaniter)
        except StopIteration:
            break

        if cod_pat.match(line):
            nome = next(secondcleaniter)
            unid = next(secondcleaniter)
            cv = next(secondcleaniter)
            disp = next(secondcleaniter)
            resv = next(secondcleaniter)
            disp_int = int(disp.replace(".", ""))
            resv_int = int(resv.replace(".", ""))
            if not "/" in cv:
                print(cv, "não parece CV. Não contem barra /. Verifique os arquivos e tente novamente.")
                exit(1)

            # Check if key already exists, if so, add the "Estoque" and "Resv" column and subtract the adj
            if line in cods:
                # line already exists
                if cv != cods[line].cv:
                    print("AVISO: CV de", line, "diferente. [" + cv + "] - [" + cods[line].cv + "]. Usando CV maior.")
                    cods[line].cv = largercv(cv, cods[line].cv)

                # adjust estoque
                cods[line].disp += disp_int
                cods[line].resv += resv_int
            else:  # key does not exist, add new codigo as key to cods
                cods[line] = Entry(line, nome, cv, disp_int, resv_int)

            # if line in uniadj:
            #     cods[line].resv -= uniadj[line]


                
    for k in cods:
        if cods[k].cv.strip() == "":
            raise ValueError(k, "CV em branco")
        
        # verify estoques are not negative
        if cods[k].disp < 0:
            print("AVISO:", k, "tem estoque negativo. Alterado para 0.")
            cods[k].disp = 0
        if cods[k].resv < 0:
            print("AVISO:", k, "tem reserva negativa. Alterado para 0.")
            cods[k].resv = 0


    out = ""
    for cod in cods.values():
        # 140225,,CHAVEIRO DE METAL,,,PÇ,,427,"0,6"
        cvparts = cod.cv.split(" / ")
        p = cvparts[0]
        p = p[:-2] + "," + p[-2:]
        out += '{},,{},,,PC,,0,"{}"\n'.format(cod.cod, cod.nome, p)
    return out


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python updatestrings.py file1.htm file2.htm")
        exit(0)

    timestamp = date.today().strftime("%d %b %Y")

    if "HTM" not in sys.argv[1] or "HTM" not in sys.argv[2]:
        print("Files do not look like system's HTM. Aborting.")
        exit(1)
        
    produtos = parse(sys.argv[1], sys.argv[2])
    
    out = f"""var lastUpdated = "{timestamp}";
        
var produtosCSV = `

{produtos}

`;
    """

    with open('c:/Users/Heitor/Desktop/code/pedido-verif/data/clientes.js', encoding='utf-8') as clif:
        clientes = clif.read()
        
    with open('c:/Users/Heitor/Desktop/code/pedido-verif/data/strings.js', 'w', encoding='utf-8') as outf:
        print(out, file=outf)
        print(clientes, file=outf)
