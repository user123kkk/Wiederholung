"""ANGLE-Binärpayload offline lesen. Keine Draw-Zuordnung oder GPU-Abnahme.

Offset/Anzahl müssen aus dem zugehörigen Capture-Aufruf stammen. Den Hash
der gesamten unkomprimierten Datei verpflichtend angeben. Originale bleiben
unverändert; Ausgabe nur auf stdout. Float32-Bitmuster bleiben erhalten.
"""
import argparse
import hashlib
import json
from pathlib import Path
import struct


def decode(data, offset, components, count, expected_sha256):
    actual = hashlib.sha256(data).hexdigest()
    if len(expected_sha256) != 64 or actual != expected_sha256.lower():
        raise ValueError('Datei-SHA256 stimmt nicht')
    if components not in (1, 2, 3, 4) or count < 1 or offset < 0 or offset % 4:
        raise ValueError('Ungültiger Float32-Payloadbereich')
    size = components * count * 4
    if offset + size > len(data):
        raise ValueError('Payloadbereich außerhalb der Datei')
    # Einzelne Float32-Wörter lesen, nicht aus C++-Dezimaltext zurückrechnen.
    words = []
    for index in range(components * count):
        raw = data[offset + index * 4:offset + index * 4 + 4]
        value = struct.unpack('<f', raw)[0]
        # NaN/Infinity als Wort erhalten, ohne ungültiges JSON zu erzeugen.
        if not (float('-inf') < value < float('inf')):
            value = str(value)
        words.append({'hex_le': raw.hex(), 'bits': f'{struct.unpack("<I", raw)[0]:08x}',
                      'float32': value})
    return {'ebene': 'GL-Aufrufpayload; keine finalen GPU-Konstanten oder Deckung',
            'sha256': actual, 'offset': offset, 'bytes': size,
            'components': components, 'count': count, 'words': words,
            'draw_zuordnung': 'separat anhand Kontext/Programm/Aufrufreihenfolge belegen'}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--data', type=Path, required=True)
    parser.add_argument('--offset', type=int, required=True)
    parser.add_argument('--components', type=int, choices=(1, 2, 3, 4), required=True)
    parser.add_argument('--count', type=int, default=1)
    parser.add_argument('--sha256', required=True)
    args = parser.parse_args()
    if args.data.suffix == '.gz':
        parser.error('Zuerst in neue Datei entpacken und deren SHA256 bestimmen')
    try:
        result = decode(args.data.read_bytes(), args.offset, args.components,
                        args.count, args.sha256)
    except (ValueError, OSError) as error:
        parser.error(str(error))
    print(json.dumps(result, ensure_ascii=False, indent=2, allow_nan=False))


if __name__ == '__main__':
    main()
