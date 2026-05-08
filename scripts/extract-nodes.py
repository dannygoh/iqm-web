#!/usr/bin/env python3
import gzip, re

with gzip.open('/home/dannygoh/iqm-web/db-export.sql.gz', 'rt', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

# ── Parse node_field_data ──────────────────────────────────────────────────
in_nfd = False
nodes = {}
for i, line in enumerate(lines):
    if 'INSERT INTO `node_field_data`' in line:
        in_nfd = True
        continue
    if in_nfd:
        m = re.match(r'\(\s*(\d+),\s*\d+,\'([^\']+)\',\'[^\']+\',(\d+),\'(.*?)\',', line)
        if m:
            nid, ntype, status, title = m.group(1), m.group(2), m.group(3), m.group(4)
            nodes[nid] = {'type': ntype, 'title': title, 'status': status}
        if line.strip().startswith('INSERT ') or (not line.strip() and i > 11500):
            in_nfd = False

# ── Parse node__body ───────────────────────────────────────────────────────
in_body = False
bodies = {}
for i, line in enumerate(lines):
    if 'INSERT INTO `node__body`' in line:
        in_body = True
        continue
    if in_body:
        # (bundle, deleted, entity_id, revision_id, langcode, delta, body_value, body_summary, body_format)
        m = re.match(r'\(\'[^\']+\',\d+,(\d+),\d+,\'[^\']+\',\d+,\'(.*?)\',', line, re.DOTALL)
        if m:
            nid = m.group(1)
            body = m.group(2).replace('\\n', '\n').replace('\\r', '').replace("\\'", "'")
            bodies[nid] = body
        if line.strip().startswith('INSERT ') or (not line.strip() and i > 14000):
            in_body = False

# ── Parse path_alias ───────────────────────────────────────────────────────
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
        if line.strip().startswith('INSERT ') or (not line.strip() and i > 40000):
            in_alias = False

# ── Report ─────────────────────────────────────────────────────────────────
print("=== ALL NODES (pages + content) ===\n")
for nid, n in sorted(nodes.items(), key=lambda x: int(x[0])):
    alias = aliases.get(f'/node/{nid}', f'/node/{nid}')
    body = bodies.get(nid, '')
    print(f"NID {nid:4} | {alias:60} | [{n['type']:20}] {n['title']}")
    if body:
        # Strip HTML tags for preview
        preview = re.sub(r'<[^>]+>', '', body)[:200].strip().replace('\n', ' ')
        print(f"       BODY: {preview!r}")
    print()
