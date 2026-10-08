# Kurzfassung der Rundgang-Daten: python auswerten.py [Filter]
import json,sys,glob,os
flt=sys.argv[1] if len(sys.argv)>1 else ''
for f in sorted(glob.glob(os.path.join(os.path.dirname(os.path.abspath(__file__)),'daten','*.log'))):
    if flt not in f: continue
    print('==',os.path.basename(f))
    for l in open(f,encoding='utf-8'):
        try: o=json.loads(l)
        except Exception: print('RAW',l[:300].rstrip()); continue
        if 'bewegung' not in o: continue  # tour2/austritt haben ein anderes Format
        b=o['bewegung']; k=o.get('knopf')
        print(' ',o['id'],('FEHLER '+o['fehler']) if o['fehler'] else '','|',b['anzahl'],'anim',b['ziele'],'ziele ende',b['endeMs'],'| h',o['hoehe'],'/',o['fenster'],
              ('| knopf %s unten %s scroll %s'%(k['text'],k['unten'],k['scrollY'])) if k else '', 'QUER' if o['quer'] else '','SF' if o['seitenfehler'] else '')
        if '-v' in sys.argv: print('      ',b['namen'],b['laengste'],b['endlos'])
