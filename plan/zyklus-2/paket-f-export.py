"""Wiederholbarer Übertragungsexport; verändert weder Git noch Produktdateien."""
import hashlib, json, pathlib, subprocess, zipfile

root = pathlib.Path(__file__).resolve().parents[2]
belege = root / 'plan/zyklus-2/paket-f-belege'
ziel = belege / 'PAKET-F-FORTSETZUNG-2026-10-05.zip'
def git(*args):
    return subprocess.check_output(['git', *args], cwd=root)
files = set(git('diff', '--name-only', '-z', '5af78a0').decode().split('\0'))
files.update(git('ls-files', '--others', '--exclude-standard', '-z').decode().split('\0'))
files.update(str(p.relative_to(root)).replace('\\', '/') for p in belege.rglob('*')
             if p.is_file() and 'sicherungen' not in p.parts and p.suffix != '.zip')
deleted, hashes = [], {}
with zipfile.ZipFile(ziel, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=3) as z:
    for f in sorted(files):
        if not f or '/sicherungen/' in f or f.endswith('.zip'):
            continue
        p = root / f
        if not p.is_file():
            deleted.append(f)
            continue
        data = p.read_bytes()
        hashes[f] = hashlib.sha256(data).hexdigest()
        z.writestr('dateien/' + f, data)
    diff = git('diff', '--binary', '5af78a0')
    z.writestr('aenderungen.diff', diff)
    z.writestr('status.txt', git('status', '--short'))
    manifest = dict(basis=git('rev-parse', '5af78a0').decode().strip(),
                    dateien=hashes, geloescht=deleted,
                    diff_sha256=hashlib.sha256(diff).hexdigest())
    z.writestr('manifest.json', json.dumps(manifest, ensure_ascii=False, indent=2))
with zipfile.ZipFile(ziel) as z:
    assert z.testzip() is None
    for f, h in hashes.items():
        assert hashlib.sha256(z.read('dateien/' + f)).hexdigest() == h
belege.joinpath('export-geprueft.json').write_text(json.dumps(dict(
    zip=str(ziel.relative_to(root)), sha256=hashlib.sha256(ziel.read_bytes()).hexdigest(),
    dateien=len(hashes), geloescht=len(deleted), bytes=ziel.stat().st_size,
    crc_und_sha256='grün'), indent=2), encoding='utf-8')
print(belege.joinpath('export-geprueft.json').read_text(encoding='utf-8'))
