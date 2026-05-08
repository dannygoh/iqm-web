#!/usr/bin/env python3
"""Extract full body HTML for specific page NIDs."""
import gzip, re

with gzip.open('/home/dannygoh/iqm-web/db-export.sql.gz', 'rt', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

TARGET_NIDS = {'5','6','7','8','9','10','11','12','13','14','15','16','17'}

# Parse node__body
in_body = False
bodies = {}
for i, line in enumerate(lines):
    if 'INSERT INTO `node__body`' in line:
        in_body = True
        continue
    if in_body:
        m = re.match(r"\('[^']+',\d+,(\d+),\d+,'[^']+',\d+,'(.*)',", line)
        if m:
            nid = m.group(1)
            if nid in TARGET_NIDS:
                body = m.group(2).replace('\\n', '\n').replace('\\r', '').replace("\\'", "'")
                # Strip HTML
                body_text = re.sub(r'<[^>]+>', ' ', body)
                body_text = re.sub(r'&nbsp;', ' ', body_text)
                body_text = re.sub(r'&amp;', '&', body_text)
                body_text = re.sub(r'&lt;', '<', body_text)
                body_text = re.sub(r'&gt;', '>', body_text)
                body_text = re.sub(r'&[a-z]+;', '', body_text)
                body_text = re.sub(r' +', ' ', body_text)
                body_text = re.sub(r'\n +', '\n', body_text)
                body_text = re.sub(r'\n{3,}', '\n\n', body_text)
                bodies[nid] = body_text.strip()
        if line.strip().startswith('INSERT INTO `node_') and 'body' not in line:
            in_body = False

# Parse path_alias
in_alias = False
aliases = {}
for i, line in enumerate(lines):
    if 'INSERT INTO `path_alias`' in line:
        in_alias = True
        continue
    if in_alias:
        m = re.match(r"\(\d+,\d+,'(/[^']*?)','(/[^']*?)'", line)
        if m:
            source, alias = m.group(1), m.group(2)
            aliases[source] = alias
        if line.strip().startswith('INSERT INTO `') and 'path_alias' not in line:
            in_alias = False

for nid in sorted(TARGET_NIDS, key=int):
    alias = aliases.get(f'/node/{nid}', 'no-alias')
    print(f"\n{'='*70}")
    print(f"NID {nid} | URL: {alias}")
    print('='*70)
    body = bodies.get(nid, '(no body)')
    print(body[:2000])
