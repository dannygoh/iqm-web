#!/usr/bin/env python3
"""Inspect node types and related field tables to understand member/auditor/consultant structure."""
import gzip, re, collections

with gzip.open('/home/dannygoh/iqm-web/db-export.sql.gz', 'rt', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

# Count nodes by type
type_counts = collections.Counter()
nodes = {}
in_nfd = False
for i, line in enumerate(lines):
    if 'INSERT INTO `node_field_data`' in line:
        in_nfd = True
        continue
    if in_nfd:
        m = re.match(r'\(\s*(\d+),\s*\d+,\'([^\']+)\',', line)
        if m:
            nid, ntype = m.group(1), m.group(2)
            nodes[nid] = ntype
            type_counts[ntype] += 1
        if not line.strip() or (line.strip().startswith('INSERT') and 'node_field_data' not in line):
            in_nfd = False

print("Node types:")
for t, c in type_counts.most_common():
    print(f"  {t:30} {c:5}")

# Sample first 5 of member-like types
SAMPLE_TYPES = ['iqm_member','mrca_auditor','mrca_consultant','member','auditor','consultant',
                'iqm_mrca','mrca','iqm_individual_member']
print("\nNode titles by type (first 5 each):")
type_samples = collections.defaultdict(list)
for nid, ntype in nodes.items():
    type_samples[ntype].append(nid)

# Re-parse for titles
in_nfd2 = False
nid_titles = {}
for line in lines:
    if 'INSERT INTO `node_field_data`' in line:
        in_nfd2 = True
        continue
    if in_nfd2:
        m = re.match(r'\(\s*(\d+),\s*\d+,\'([^\']+)\',\'[^\']+\',\d+,\'(.*?)\',', line)
        if m:
            nid, ntype, title = m.group(1), m.group(2), m.group(3)
            nid_titles[nid] = title
        if not line.strip() or (line.strip().startswith('INSERT') and 'node_field_data' not in line):
            in_nfd2 = False

for ntype, nids in type_samples.items():
    print(f"\n  [{ntype}] ({len(nids)} total)")
    for nid in nids[:5]:
        print(f"    NID {nid}: {nid_titles.get(nid, '?')}")

# Check field tables for member_type and grade_type
print("\n\n=== FIELD TABLE SAMPLES ===")
for field_table in ['node__field_member_type', 'node__field_grade_type', 'node__field_certificate_no',
                    'node__field_active', 'node__field_consultant_type']:
    in_f = False
    samples = []
    for line in lines:
        if f'INSERT INTO `{field_table}`' in line:
            in_f = True
            continue
        if in_f:
            samples.append(line.strip()[:150])
            if len(samples) >= 5:
                break
            if not line.strip() or line.strip().startswith('INSERT'):
                in_f = False
    if samples:
        print(f"\n{field_table}:")
        for s in samples:
            print(f"  {s}")
