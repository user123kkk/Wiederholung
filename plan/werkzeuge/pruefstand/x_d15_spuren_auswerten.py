"""Gesicherte D15-Bildfolgen und Traces auswerten; keine Quellenänderung."""
import json, os, sys
from pathlib import Path
from PIL import Image

base = Path(os.environ['TEMP']) / 'paket-d-ursachen-messung-1791025838429'
out = Path(sys.argv[1]) if len(sys.argv)>1 else Path(os.environ['TEMP']) / 'paket-d15-auswertung-20261003-1322'
out.mkdir(exist_ok=False)
reports = []
for run in range(3):
    p = base / str(run)
    raf = json.loads((p / 'boot-raf.json').read_text())
    origin = json.loads((p / 'boot-origin.json').read_text())['timeOrigin']
    times = json.loads((p / 'boot-framezeiten.json').read_text())
    trace = json.loads((p / 'boot-trace.json').read_text())['traceEvents']
    metadata = [e for e in trace if e.get('ph') == 'M']
    names = {(e['pid'], e.get('tid')): e.get('args', {}).get('name') for e in metadata if e['name'] == 'thread_name'}
    process = {e['pid']: e.get('args', {}).get('name') for e in metadata if e['name'] == 'process_name'}
    nav = [e for e in trace if e['name'] == 'navigationStart']
    metrics = json.loads((p / 'boot-metrics.json').read_text())['metrics']
    nav_ts = next(e['value'] * 1000000 for e in metrics if e['name'] == 'NavigationStart')
    fade = [e for e in raf if e.get('art') and 'view' in e['art'] and e.get('op') is not None]
    gaps = [{'vor': a, 'nach': b, 'dt': b['t'] - a['t'], 'sprung': float(b['op']) - float(a['op'])}
            for a, b in zip(fade, fade[1:]) if 0 < float(a['op']) < 1 and b['t'] - a['t'] > 50]
    gpu = [{'name': e['name'], 'dur_ms': e['dur'] / 1000, 'ts': e['ts'],
            'ab_navigation_ms': (e['ts'] - nav_ts) / 1000 if nav_ts else None,
            'thread': names.get((e['pid'], e.get('tid'))), 'process': process.get(e['pid'])}
           for e in trace if e.get('ph') == 'X' and e.get('dur', 0) >= 20000
           and ('gpu' in e.get('cat', '') or 'GPU' in (process.get(e['pid']) or '') or 'Gpu' in e['name'])]
    imgs = [Image.open(p / f'boot-{i}.png').convert('RGB') for i in range(len(times))]
    final = imgs[-1]
    points = [(x, y) for y in range(120, 148) for x in range(30, 160)
              if min(final.getpixel((x, y))) > 220]
    vals = [sum(sum(im.getpixel(q)) for q in points) / (3 * len(points)) for im in imgs]
    frames = [{'i': i, 't_ms': t * 1000 - origin, 'abstand_ms': (t - times[i-1]) * 1000 if i else 0,
               'helligkeit': vals[i], 'helligkeit_differenz': vals[i] - vals[i-1] if i else 0}
              for i, t in enumerate(times)]
    # Komposit-Helligkeit ist keine isolierte Elementdeckkraft.
    report = {'lauf': run, 'timeOrigin': origin, 'bilder': len(times), 'raf_fade_luecken': gaps,
              'lange_gpu_aufgaben': gpu, 'navigationStart': nav, 'bildfolge': frames,
              'hinweis': 'Bildhelligkeit enthält Kinderanimationen; keine Deckkraft-Abnahme daraus ableiten.'}
    (out / f'{run}.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    summary = {'lauf': run, 'bilder': len(times), 'fade_luecken': [(round(g['dt'], 1), round(g['sprung'], 4)) for g in gaps],
               'gpu': [g for g in gpu if g['name'] in ['GPUTask','RasterDecoderImpl::DoEndRasterCHROMIUM','SkiaOutputSurfaceImplOnGpu::FinishPaintRenderPass']],
               'bildpausen_ueber_50ms': [(f['i'], round(f['t_ms'], 1), round(f['abstand_ms'], 1), round(f['helligkeit_differenz'], 2)) for f in frames if f['abstand_ms'] > 50],
               'titel_bilder_1100_1550ms': [f for f in frames if 1100<=f['t_ms']<=1550]}
    reports.append(summary)
print(str(out))
print(json.dumps(reports, indent=2))
(out / 'vergleich.json').write_text(json.dumps(reports, indent=2), encoding='utf-8')
