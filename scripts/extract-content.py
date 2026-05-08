#!/usr/bin/env python3
"""Extract page content from Drupal SQL dump for reference during migration."""
import gzip, re, sys

dump = gzip.open('/home/dannygoh/iqm-web/db-export.sql.gz', 'rt', encoding='utf-8', errors='replace')
content = dump.read()
dump.close()

# ── path_alias ──────────────────────────────────────────────────────────────
alias_block = re.search(r"INSERT INTO `path_alias` VALUES(.*?);", content, re.DOTALL)
aliases = {}
if alias_block:
    for row in re.finditer(r"\((\d+),\d+,'(/[^']*?)','(/[^']*?)'", alias_block.group(1)):
        aliases[row.group(2)] = row.group(3)  # /node/X → /slug

# ── node_field_data (nid, title, type) ─────────────────────────────────────
nfd_block = re.search(r"INSERT INTO `node_field_data` VALUES(.*?);", content, re.DOTALL)
nodes = {}
if nfd_block:
    for row in re.finditer(r"\((\d+),'([^']+)',(\d+),'([^']+)',", nfd_block.group(1)):
        nid, type_, vid, title = row.group(1), row.group(2), row.group(3), row.group(4)
        nodes[nid] = {'title': title, 'type': type_}

# ── node__body ──────────────────────────────────────────────────────────────
body_block = re.search(r"INSERT INTO `node__body` VALUES(.*?);", content, re.DOTALL)
bodies = {}
if body_block:
    for row in re.finditer(r"\('node',0,'([^']+)',\d+,\d+,'[^']*','([^']*?)'", body_block.group(1)):
        nid = row.group(1)
        body = row.group(2)
        bodies[nid] = body[:800].replace('\\n', '\n').strip()

# ── Print pages ────────────────────────────────────────────────────────────
print("=== DRUPAL PAGES ===\n")
for nid, info in sorted(nodes.items(), key=lambda x: int(x[0])):
    if info['type'] == 'page':
        alias = aliases.get(f'/node/{nid}', f'/node/{nid}')
        body = bodies.get(nid, '(no body)')
        print(f"NID {nid} | {alias}")
        print(f"  Title: {info['title']}")
        print(f"  Body:  {body[:300]!r}")
        print()
